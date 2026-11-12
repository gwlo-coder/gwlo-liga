'use client'

import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, Shield, Target } from 'lucide-react'
import Footer from '@/components/Footer'

type TeamInfo = {
  id: number
  name: string
  logo_url?: string
}

type MatchData = {
  id: number
  round: number
  match_date: string
  location?: string
  home_team_id: number
  away_team_id: number
  home_goals?: number | null
  away_goals?: number | null
  is_finished?: boolean
  home_team?: TeamInfo | TeamInfo[] | null
  away_team?: TeamInfo | TeamInfo[] | null
}

type PlayerInfo = {
  id: number
  first_name: string
  last_name: string
  team_id: number
}

type PlayerStatItem = {
  id: number | string
  player_id: number
  goals?: number | null
  players?: PlayerInfo | PlayerInfo[] | null
}

type MatchDetailContentProps = {
  match: MatchData
  playerStats: PlayerStatItem[]
}

export default function MatchDetailContent({ match, playerStats }: MatchDetailContentProps) {
  // Bezpieczne wyciąganie danych drużyn
  const homeTeam = Array.isArray(match.home_team) ? match.home_team[0] : match.home_team
  const awayTeam = Array.isArray(match.away_team) ? match.away_team[0] : match.away_team

  // Formatowanie daty
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Termin do ustalenia'
    const date = new Date(dateStr)
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  // Sprawdzenie czy wynik jest wpisany/mecz zakończony
  const hasResult = match.is_finished && match.home_goals !== null && match.home_goals !== undefined && match.away_goals !== null && match.away_goals !== undefined

  // Podział statystyk zawodników na gospodarzy i gości
  const homeStats = playerStats.filter(s => {
    const p = Array.isArray(s.players) ? s.players[0] : s.players
    return p?.team_id === match.home_team_id
  })

  const awayStats = playerStats.filter(s => {
    const p = Array.isArray(s.players) ? s.players[0] : s.players
    return p?.team_id === match.away_team_id
  })

  return (
    <div className="flex flex-col min-h-screen justify-between bg-slate-50">
      <main className="max-w-[1000px] mx-auto px-6 py-8 space-y-6 w-full">
        
        {/* Przycisk powrotu */}
        <Link 
          href={`/zespoly`} 
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót do rozgrywek
        </Link>

        {/* Główna karta meczowa */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
          
          {/* Nagłówek (Kolejka i Status) */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <span className="bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              Kolejka {match.round}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              match.is_finished ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white'
            }`}>
              {match.is_finished ? 'Mecz zakończony' : 'Mecz nadchodzący'}
            </span>
          </div>

          {/* Wynik lub VS / Drużyny */}
          <div className="flex items-center justify-between gap-4 py-2">
            
            {/* Gospodarz */}
            <div className="flex flex-col items-center flex-1 text-center space-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                {homeTeam?.logo_url ? (
                  <img src={homeTeam.logo_url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Shield className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <h2 className="text-xs lg:text-sm font-black text-slate-900 tracking-tight">
                {homeTeam?.name || 'Gospodarz'}
              </h2>
            </div>

            {/* Wynik lub eleganckie czarne VS */}
            {hasResult ? (
              <div className="px-5 py-2.5 bg-slate-50 border border-slate-200/80 rounded-2xl text-slate-900 font-black text-xl lg:text-3xl tracking-tight shrink-0 shadow-2xs">
                <span>{match.home_goals} : {match.away_goals}</span>
              </div>
            ) : (
              <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-white font-black text-xs lg:text-sm tracking-widest shrink-0 shadow-2xs">
                VS
              </div>
            )}

            {/* Gość */}
            <div className="flex flex-col items-center flex-1 text-center space-y-2">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                {awayTeam?.logo_url ? (
                  <img src={awayTeam.logo_url} alt="" className="w-full h-full object-contain" />
                ) : (
                  <Shield className="w-6 h-6 text-slate-300" />
                )}
              </div>
              <h2 className="text-xs lg:text-sm font-black text-slate-900 tracking-tight">
                {awayTeam?.name || 'Gość'}
              </h2>
            </div>

          </div>

          {/* Informacje dodatkowe (Data, Miejsce) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-600">
            <div className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{formatDate(match.match_date)}</span>
            </div>
            <div className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
              <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{match.location || 'Boisko SP21, Gorzów Wielkopolski'}</span>
            </div>
          </div>

        </div>

        {/* Sekcja kadr / strzelców w meczu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Kadra Gospodarza */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-600" /> Kadra: {homeTeam?.name}
            </h3>
            {homeStats.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Brak zawodników przypisanych do tego meczu.</p>
            ) : (
              <div className="space-y-2">
                {homeStats.map((st, i) => {
                  const player = Array.isArray(st.players) ? st.players[0] : st.players
                  const goalsCount = st.goals ?? 0
                  return (
                    <div key={st.id || i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                      <span>{player ? `${player.first_name} ${player.last_name}` : 'Zawodnik'}</span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-black ${
                        goalsCount > 0 ? 'bg-sky-50 text-sky-700 border border-sky-100' : 'bg-slate-200/60 text-slate-600'
                      }`}>
                        ⚽ {goalsCount}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Kadra Gościa */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center gap-2">
              <Target className="w-4 h-4 text-sky-600" /> Kadra: {awayTeam?.name}
            </h3>
            {awayStats.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">Brak zawodników przypisanych do tego meczu.</p>
            ) : (
              <div className="space-y-2">
                {awayStats.map((st, i) => {
                  const player = Array.isArray(st.players) ? st.players[0] : st.players
                  const goalsCount = st.goals ?? 0
                  return (
                    <div key={st.id || i} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800">
                      <span>{player ? `${player.first_name} ${player.last_name}` : 'Zawodnik'}</span>
                      <span className={`px-3 py-1 rounded-xl text-xs font-black ${
                        goalsCount > 0 ? 'bg-sky-50 text-sky-700 border border-sky-100' : 'bg-slate-200/60 text-slate-600'
                      }`}>
                        ⚽ {goalsCount}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}