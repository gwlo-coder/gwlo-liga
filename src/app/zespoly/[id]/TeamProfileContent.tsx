'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, ArrowLeft, Swords, Users, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  short_name: string
  logo_url?: string
  points: number
  goals_scored: number
  goals_conceded: number
  matches_played: number
}

type Match = {
  id: number
  round: number
  match_date: string
  location: string
  home_goals: number | null
  away_goals: number | null
  is_finished: boolean
  home_team: { id: number; name: string; logo_url?: string } | null
  away_team: { id: number; name: string; logo_url?: string } | null
}

type Player = {
  id: number
  first_name: string
  last_name: string
  number: number | null
  position: string | null
}

export default function TeamProfileContent({ teamId }: { teamId: number }) {
  const [team, setTeam] = useState<Team | null>(null)
  const [leaguePosition, setLeaguePosition] = useState<number | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!teamId) return

    async function fetchTeamData() {
      // 1. Pobieranie danych zespołu
      const { data: teamData } = await supabase
        .from('teams')
        .select('*')
        .eq('id', teamId)
        .single()

      if (teamData) {
        setTeam(teamData as Team)
      }

      // 2. Wyznaczanie aktualnej pozycji w tabeli
      const { data: allTeams } = await supabase
        .from('teams')
        .select('id, points, goals_scored, goals_conceded')
        .order('points', { ascending: false })

      if (allTeams) {
        const sorted = allTeams.sort((a, b) => {
          if (b.points !== a.points) return b.points - a.points
          const diffA = a.goals_scored - a.goals_conceded
          const diffB = b.goals_scored - b.goals_conceded
          return diffB - diffA
        })
        const pos = sorted.findIndex(t => t.id === teamId)
        if (pos !== -1) setLeaguePosition(pos + 1)
      }

      // 3. Pobieranie meczów drużyny
      const { data: matchesData } = await supabase
        .from('matches')
        .select(`
          id,
          round,
          match_date,
          location,
          home_goals,
          away_goals,
          is_finished,
          home_team:teams!home_team_id (id, name, logo_url),
          away_team:teams!away_team_id (id, name, logo_url)
        `)
        .or(`home_team_id.eq.${teamId},away_team_id.eq.${teamId}`)
        .order('match_date', { ascending: true })

      if (matchesData) {
        setMatches(matchesData as unknown as Match[])
      }

      // 4. Pobieranie kadry zawodników
      const { data: playersData } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', teamId)

      if (playersData) {
        setPlayers(playersData as Player[])
      }

      setLoading(false)
    }

    fetchTeamData()
  }, [teamId])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-6 py-20 text-center text-slate-400 text-xs">
          Wczytywanie profilu drużyny...
        </div>
        <Footer />
      </div>
    )
  }

  if (!team) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
        <Navbar />
        <div className="max-w-[1400px] mx-auto px-6 py-20 text-center space-y-4">
          <p className="text-slate-500 font-medium">Nie znaleziono podanej drużyny.</p>
          <Link href="/zespoly" className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-4 py-2.5 rounded-xl">
            <ArrowLeft className="w-4 h-4" /> Powrót do listy zespołów
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const goalDiff = team.goals_scored - team.goals_conceded

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          <Link 
            href="/zespoly" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wróć do listy zespołów
          </Link>

          {/* Karta nagłówkowa */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 p-3 shadow-2xs">
                {team.logo_url ? (
                  <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" />
                ) : (
                  <Shield className="w-10 h-10 text-sky-500" />
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-md">
                  Skrót: {team.short_name || 'GWLO'}
                </span>
                <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight mt-2">
                  {team.name}
                </h1>
                <p className="text-xs text-slate-400 font-medium mt-1">Gorzowska Liga Osiedlowa – Sezon Zima 2026</p>
              </div>
            </div>

            {/* Statystyki + Pozycja w tabeli */}
            <div className="grid grid-cols-5 gap-3 text-center w-full md:w-auto">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-sky-600 font-bold block uppercase">Pozycja</span>
                <span className="text-lg font-black text-sky-700">#{leaguePosition || '-'}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Punkty</span>
                <span className="text-lg font-black text-slate-900">{team.points}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Mecze</span>
                <span className="text-lg font-black text-slate-900">{team.matches_played}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Bramki</span>
                <span className="text-xs font-black text-slate-900 mt-1 block">{team.goals_scored}:{team.goals_conceded}</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">Bilans</span>
                <span className={`text-lg font-black ${goalDiff > 0 ? 'text-emerald-600' : goalDiff < 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                  {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Kadra Zespołu (Lewa kolumna) */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col lg:col-span-1 h-[540px]">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100 shrink-0">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Kadra Zespołu</h2>
                  <p className="text-xs text-slate-400 font-medium">Zarejestrowani zawodnicy ({players.length})</p>
                </div>
              </div>

              {players.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  Brak zawodników w bazie dla tego zespołu.
                </div>
              ) : (
                <div className="mt-4 flex-1 overflow-y-auto pr-2 space-y-2.5">
                  {players.map((player) => (
                    <div key={player.id} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white border border-slate-200 font-black text-slate-700 flex items-center justify-center shrink-0">
                          {player.number || '•'}
                        </span>
                        <span className="font-bold text-slate-900">{player.first_name} {player.last_name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md uppercase">
                        {player.position || 'Zawodnik'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Terminarz i Wyniki Drużyny (Prawa kolumna) */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 lg:col-span-2">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Terminarz i Wyniki</h2>
                  <p className="text-xs text-slate-400 font-medium">Spotkania w Sezonie Zima 2026</p>
                </div>
              </div>

              {matches.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-8">Brak meczów przypisanych do tego zespołu.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matches.map((m) => {
                    const isHome = m.home_team?.id === teamId
                    const isTBD = m.round === 7
                    const matchDate = new Date(m.match_date)
                    const dateStr = isTBD ? 'Data do ustalenia' : matchDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long' })
                    const timeStr = isTBD ? '' : matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })

                    return (
                      <div key={m.id} className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 space-y-3 flex flex-col justify-between">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-100 pb-2">
                            <span className="text-sky-600 font-bold">Kolejka {m.round}</span>
                            <span>{dateStr} {timeStr ? `• ${timeStr}` : ''}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Gospodarz */}
                            <div className="flex items-center gap-2 flex-1">
                              {m.home_team?.logo_url && <img src={m.home_team.logo_url} alt="" className="w-5 h-5 object-contain" />}
                              <span className={`text-xs font-bold ${isHome ? 'text-sky-600' : 'text-slate-800'}`}>
                                {m.home_team?.name}
                              </span>
                            </div>

                            {/* Wynik */}
                            <div className="px-3 py-1 bg-white border border-slate-200/60 rounded-xl text-center shrink-0">
                              {m.is_finished ? (
                                <span className="font-black text-xs text-slate-900">{m.home_goals} : {m.away_goals}</span>
                              ) : (
                                <span className="font-bold text-[10px] text-slate-400">VS</span>
                              )}
                            </div>

                            {/* Gość */}
                            <div className="flex items-center justify-end gap-2 flex-1 text-right">
                              <span className={`text-xs font-bold ${!isHome ? 'text-sky-600' : 'text-slate-800'}`}>
                                {m.away_team?.name}
                              </span>
                              {m.away_team?.logo_url && <img src={m.away_team.logo_url} alt="" className="w-5 h-5 object-contain" />}
                            </div>
                          </div>
                        </div>

                        {/* Przycisk przejścia do szczegółów meczu */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-end">
                          <Link 
                            href={`/mecz/${m.id}`} 
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/60 px-3 py-1.5 rounded-xl transition-colors"
                          >
                            <span>Szczegóły meczu</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}