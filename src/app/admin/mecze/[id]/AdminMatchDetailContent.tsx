'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { ArrowLeft, Save, Shield, CheckCircle2, RotateCcw } from 'lucide-react'

type Team = {
  id: number
  name: string
  logo_url?: string | null
}

type Match = {
  id: number
  season_id: number | null
  round: number
  home_team_id: number
  away_team_id: number
  home_goals: number | null
  away_goals: number | null
  is_finished: boolean
  home_team?: Team | Team[] | null
  away_team?: Team | Team[] | null
}

type Player = {
  id: number
  first_name: string
  last_name: string
  team_id: number
}

type PlayerMatchData = {
  in_lineup: boolean
  goals: number
}

export default function AdminMatchEditClient({ matchId }: { matchId: number }) {
  const router = useRouter()

  const [match, setMatch] = useState<Match | null>(null)
  const [homePlayers, setHomePlayers] = useState<Player[]>([])
  const [awayPlayers, setAwayPlayers] = useState<Player[]>([])
  
  const [isFinishedInput, setIsFinishedInput] = useState<boolean>(false)
  const [playerStates, setPlayerStates] = useState<Record<number, PlayerMatchData>>({})

  const [saving, setSaving] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const isLogged = localStorage.getItem('glo_admin_logged')
    if (!isLogged) {
      router.push('/admin/login')
      return
    }

    async function loadData() {
      // 1. Pobierz dane meczu
      const { data: matchData, error: matchErr } = await supabase
        .from('matches')
        .select(`
          id,
          season_id,
          round,
          home_team_id,
          away_team_id,
          home_goals,
          away_goals,
          is_finished,
          home_team:teams!home_team_id(id, name, logo_url),
          away_team:teams!away_team_id(id, name, logo_url)
        `)
        .eq('id', matchId)
        .single()

      if (matchErr || !matchData) {
        console.error('Błąd pobierania meczu:', matchErr)
        return
      }

      setMatch(matchData)
      setIsFinishedInput(matchData.is_finished || false)

      // 2. Pobierz WSZYSTKICH zawodników gospodarzy
      const { data: hPlayers } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', matchData.home_team_id)

      if (hPlayers) setHomePlayers(hPlayers)

      // 3. Pobierz WSZYSTKICH zawodników gości
      const { data: aPlayers } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', matchData.away_team_id)

      if (aPlayers) setAwayPlayers(aPlayers)

      // 4. Pobierz dotychczasowe gole z match_goals
      const { data: existingGoals } = await supabase
        .from('match_goals')
        .select('*')
        .eq('match_id', matchId)

      // 5. Pobierz dotychczasowe statystyki sezonowe, żeby sprawdzić kto był w składzie
      const allPlayers = [...(hPlayers || []), ...(aPlayers || [])]
      const initialMap: Record<number, PlayerMatchData> = {}

      if (matchData.season_id) {
        const { data: seasonStats } = await supabase
          .from('player_seasons')
          .select('*')
          .eq('season_id', matchData.season_id)
          .in('player_id', allPlayers.map(p => p.id))

        allPlayers.forEach(p => {
          const playerGoals = existingGoals?.filter(g => g.scorer_id === p.id).length || 0
          const sStat = seasonStats?.find(s => s.player_id === p.id)

          initialMap[p.id] = {
            in_lineup: playerGoals > 0 || (sStat ? Boolean(sStat.matches_played) : false),
            goals: playerGoals
          }
        })
      } else {
        allPlayers.forEach(p => {
          const playerGoals = existingGoals?.filter(g => g.scorer_id === p.id).length || 0
          initialMap[p.id] = {
            in_lineup: playerGoals > 0,
            goals: playerGoals
          }
        })
      }

      setPlayerStates(initialMap)
    }

    loadData()
  }, [matchId, router])

  const handleToggleLineup = (playerId: number) => {
    setPlayerStates(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        in_lineup: !prev[playerId]?.in_lineup
      }
    }))
  }

  const handleGoalsChange = (playerId: number, val: string) => {
    const num = Math.max(0, parseInt(val) || 0)
    setPlayerStates(prev => ({
      ...prev,
      [playerId]: {
        ...prev[playerId],
        goals: num,
        in_lineup: num > 0 ? true : (prev[playerId]?.in_lineup || false)
      }
    }))
  }

  // Automatyczne liczenie wyniku z goli zawodników
  const calculateTotalGoals = () => {
    let homeTotal = 0
    let awayTotal = 0

    homePlayers.forEach(p => {
      homeTotal += playerStates[p.id]?.goals || 0
    })

    awayPlayers.forEach(p => {
      awayTotal += playerStates[p.id]?.goals || 0
    })

    return { homeTotal, awayTotal }
  }

  const { homeTotal, awayTotal } = calculateTotalGoals()

  const handleResetMatch = async () => {
    if (!confirm('Czy na pewno chcesz wyczyścić wynik, skład i gole dla tego meczu?')) return

    setSaving(true)
    try {
      await supabase.from('matches').update({
        home_goals: 0,
        away_goals: 0,
        is_finished: false
      }).eq('id', matchId)

      await supabase.from('match_goals').delete().eq('match_id', matchId)
      setIsFinishedInput(false)

      const resetMap: Record<number, PlayerMatchData> = {}
      ;[...homePlayers, ...awayPlayers].forEach(p => {
        resetMap[p.id] = { in_lineup: false, goals: 0 }
      })
      setPlayerStates(resetMap)

      setSuccessMsg('Mecz został pomyślnie zresetowany!')
    } catch (err) {
      console.error(err)
      alert('Wystąpił błąd podczas resetowania.')
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    if (saving) return // Blokada przed wielokrotnym kliknięciem
    setSaving(true)
    setSuccessMsg('')

    try {
      const { homeTotal: calcHome, awayTotal: calcAway } = calculateTotalGoals()

      // 1. Zaktualizuj główny wynik meczu
      const { error: matchErr } = await supabase
        .from('matches')
        .update({
          home_goals: calcHome,
          away_goals: calcAway,
          is_finished: isFinishedInput
        })
        .eq('id', matchId)

      if (matchErr) throw matchErr

      // 2. Wyczyszczenie i ponowne wstawienie bramek do match_goals (brak duplikatów)
      await supabase.from('match_goals').delete().eq('match_id', matchId)

      const goalsToInsert: any[] = []
      const allPlayers = [...homePlayers, ...awayPlayers]
      
      allPlayers.forEach(p => {
        const pData = playerStates[p.id]
        if (pData && pData.goals > 0) {
          for (let i = 0; i < pData.goals; i++) {
            goalsToInsert.push({
              match_id: matchId,
              team_id: p.team_id,
              scorer_id: p.id
            })
          }
        }
      })

      if (goalsToInsert.length > 0) {
        const { error: goalsErr } = await supabase.from('match_goals').insert(goalsToInsert)
        if (goalsErr) throw goalsErr
      }

      // 3. Bezpieczna aktualizacja tabeli player_seasons
      if (match?.season_id) {
        for (const p of allPlayers) {
          const pData = playerStates[p.id]
          const isInLineup = pData?.in_lineup || false
          const pGoals = pData?.goals || 0

          const { data: existingSeason } = await supabase
            .from('player_seasons')
            .select('*')
            .eq('player_id', p.id)
            .eq('season_id', match.season_id)
            .single()

          if (existingSeason) {
            await supabase
              .from('player_seasons')
              .update({
                matches_played: isInLineup ? 1 : 0,
                goals: pGoals
              })
              .eq('id', existingSeason.id)
          } else if (isInLineup || pGoals > 0) {
            await supabase
              .from('player_seasons')
              .insert({
                player_id: p.id,
                team_id: p.team_id,
                season_id: match.season_id,
                matches_played: isInLineup ? 1 : 0,
                goals: pGoals,
                assists: 0,
                yellow_cards: 0,
                red_cards: 0
              })
          }
        }
      }

      // 4. PRZELICZENIE TABELI DRUŻYN NA CZYSTO (zapobiega podwójnemu naliczaniu punktów)
      const { data: finishedMatches } = await supabase
        .from('matches')
        .select('*')
        .eq('season_id', match?.season_id)
        .eq('is_finished', true)

      const { data: allTeams } = await supabase.from('teams').select('id')

      if (allTeams) {
        for (const t of allTeams) {
          await supabase.from('teams').update({
            points: 0,
            matches_played: 0,
            goals_scored: 0,
            goals_conceded: 0
          }).eq('id', t.id)
        }

        const teamStatsMap: Record<number, { points: number, played: number, scored: number, conceded: number }> = {}

        finishedMatches?.forEach(m => {
          const hId = m.home_team_id
          const aId = m.away_team_id
          const hGoals = m.home_goals || 0
          const aGoals = m.away_goals || 0

          if (!teamStatsMap[hId]) teamStatsMap[hId] = { points: 0, played: 0, scored: 0, conceded: 0 }
          if (!teamStatsMap[aId]) teamStatsMap[aId] = { points: 0, played: 0, scored: 0, conceded: 0 }

          teamStatsMap[hId].played += 1
          teamStatsMap[aId].played += 1

          teamStatsMap[hId].scored += hGoals
          teamStatsMap[hId].conceded += aGoals
          teamStatsMap[aId].scored += aGoals
          teamStatsMap[aId].conceded += hGoals

          if (hGoals > aGoals) {
            teamStatsMap[hId].points += 3
          } else if (hGoals < aGoals) {
            teamStatsMap[aId].points += 3
          } else {
            teamStatsMap[hId].points += 1
            teamStatsMap[aId].points += 1
          }
        })

        for (const [teamIdStr, stats] of Object.entries(teamStatsMap)) {
          const teamId = Number(teamIdStr)
          await supabase.from('teams').update({
            points: stats.points,
            matches_played: stats.played,
            goals_scored: stats.scored,
            goals_conceded: stats.conceded
          }).eq('id', teamId)
        }
      }

      setSuccessMsg('Mecz, skład, gole i tabela drużyn zostały zaktualizowane pomyślnie!')
    } catch (err: any) {
      console.error('Błąd zapisu:', err)
      alert(`Wystąpił błąd podczas zapisu: ${err.message || 'Nieznany błąd'}`)
    } finally {
      setSaving(false)
    }
  }

  const getTeamObj = (teamObj?: Team | Team[] | null): Team => {
    if (!teamObj) return { id: 0, name: 'Drużyna', logo_url: '' }
    return Array.isArray(teamObj) ? (teamObj[0] || { id: 0, name: 'Drużyna', logo_url: '' }) : teamObj
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">
        Ładowanie danych meczu...
      </div>
    )
  }

  const homeTeam = getTeamObj(match.home_team)
  const awayTeam = getTeamObj(match.away_team)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main className="max-w-[1000px] mx-auto px-6 py-10 space-y-8 w-full">
        
        <div className="flex items-center justify-between">
          <Link 
            href="/admin/mecze" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wróć do listy meczów
          </Link>

          <button 
            onClick={handleResetMatch}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Wyczyść wynik meczu
          </button>
        </div>

        {/* Panel wyniku */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="bg-sky-50 text-sky-700 border border-sky-100 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
              Kolejka {match.round}
            </span>
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={isFinishedInput} 
                onChange={(e) => setIsFinishedInput(e.target.checked)}
                className="w-4 h-4 accent-sky-600 rounded"
              />
              Mecz zakończony
            </label>
          </div>

          <div className="flex items-center justify-between w-full py-4 px-2 lg:px-8">
            <div className="flex items-center gap-4 flex-1 justify-end text-right">
              <span className="text-sm lg:text-base font-black text-slate-900 truncate max-w-[200px]">
                {homeTeam.name}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                {homeTeam.logo_url ? (
                  <img src={homeTeam.logo_url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Shield className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 mx-6 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-2xl shadow-2xs">
              <span className="font-black text-2xl text-sky-600">{homeTotal}</span>
              <span className="font-black text-slate-300 text-xl">:</span>
              <span className="font-black text-2xl text-sky-600">{awayTotal}</span>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-start text-left">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0 shadow-2xs">
                {awayTeam.logo_url ? (
                  <img src={awayTeam.logo_url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Shield className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <span className="text-sm lg:text-base font-black text-slate-900 truncate max-w-[200px]">
                {awayTeam.name}
              </span>
            </div>
          </div>
        </div>

        {/* Kadry i gole */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-sky-600" /> Skład i Gole: {homeTeam.name}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">{homePlayers.length} graczy</span>
            </h3>

            {homePlayers.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Brak zawodników w tej drużynie.</p>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {homePlayers.map(player => {
                  const state = playerStates[player.id] || { in_lineup: false, goals: 0 }
                  return (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-colors ${state.in_lineup ? 'bg-sky-50/50 border-sky-200' : 'bg-slate-50 border-slate-100'}`}>
                      <label className="flex items-center gap-2.5 font-bold text-slate-800 cursor-pointer flex-1 truncate mr-2">
                        <input 
                          type="checkbox" 
                          checked={state.in_lineup} 
                          onChange={() => handleToggleLineup(player.id)} 
                          className="w-4 h-4 accent-sky-600 rounded shrink-0" 
                        />
                        <span className="truncate">{player.first_name} {player.last_name}</span>
                      </label>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">⚽ Gole:</span>
                        <input 
                          type="number" 
                          min="0" 
                          value={state.goals} 
                          onChange={(e) => handleGoalsChange(player.id, e.target.value)} 
                          className="w-14 text-center py-1.5 bg-white border border-slate-200 rounded-xl font-black text-xs text-sky-600 shadow-2xs" 
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-sky-600" /> Skład i Gole: {awayTeam.name}</span>
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-md text-slate-600">{awayPlayers.length} graczy</span>
            </h3>

            {awayPlayers.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Brak zawodników w tej drużynie.</p>
            ) : (
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {awayPlayers.map(player => {
                  const state = playerStates[player.id] || { in_lineup: false, goals: 0 }
                  return (
                    <div key={player.id} className={`flex items-center justify-between p-3 rounded-2xl border text-xs transition-colors ${state.in_lineup ? 'bg-sky-50/50 border-sky-200' : 'bg-slate-50 border-slate-100'}`}>
                      <label className="flex items-center gap-2.5 font-bold text-slate-800 cursor-pointer flex-1 truncate mr-2">
                        <input 
                          type="checkbox" 
                          checked={state.in_lineup} 
                          onChange={() => handleToggleLineup(player.id)} 
                          className="w-4 h-4 accent-sky-600 rounded shrink-0" 
                        />
                        <span className="truncate">{player.first_name} {player.last_name}</span>
                      </label>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">⚽ Gole:</span>
                        <input 
                          type="number" 
                          min="0" 
                          value={state.goals} 
                          onChange={(e) => handleGoalsChange(player.id, e.target.value)} 
                          className="w-14 text-center py-1.5 bg-white border border-slate-200 rounded-xl font-black text-xs text-sky-600 shadow-2xs" 
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm gap-4">
          {successMsg ? (
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-2xl">
              <CheckCircle2 className="w-4 h-4" /> {successMsg}
            </div>
          ) : (
            <div className="text-xs text-slate-400 font-medium">Zaznacz skład oraz wpisz gole. Wynik meczu na górze zaktualizuje się automatycznie.</div>
          )}

          <button onClick={handleSave} disabled={saving} className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3 rounded-2xl text-xs transition-colors shadow-sm disabled:opacity-50">
            <Save className="w-4 h-4" /> {saving ? 'Zapisywanie...' : 'Zapisz wynik, skład i gole'}
          </button>
        </div>

      </main>
    </div>
  )
}