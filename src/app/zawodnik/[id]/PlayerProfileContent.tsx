'use client'

import Link from 'next/link'
import { ArrowLeft, User, Target, Calendar, Clock, MapPin } from 'lucide-react'
import Footer from '@/components/Footer'

type TeamInfo = {
  id: number
  name: string
  short_name: string
  logo_url?: string
}

type PlayerData = {
  id: number
  first_name: string
  last_name: string
  team_id: number
  teams?: TeamInfo | TeamInfo[] | null
}

type PlayerStat = {
  id: number | string
  season_name?: string
  season?: string
  matches_played?: number
  goals?: number
}

type TeamRelation = {
  name: string
  logo_url?: string
}

type TeamMatch = {
  id: number
  round: number
  match_date: string
  location?: string
  home_team_id: number
  away_team_id: number
  home_goals?: number | null
  away_goals?: number | null
  is_finished?: boolean
  home_team?: TeamRelation | TeamRelation[] | null
  away_team?: TeamRelation | TeamRelation[] | null
}

type PlayerProfileContentProps = {
  player: PlayerData
  stats?: PlayerStat[]
  teamMatches?: TeamMatch[]
}

export default function PlayerProfileContent({ 
  player, 
  stats = [], 
  teamMatches = [] 
}: PlayerProfileContentProps) {
  // Podsumowanie łączne bramek i meczów z tabeli player_seasons
  const totalGoals = stats.reduce((acc, curr) => acc + (curr.goals || 0), 0)
  const totalMatchesPlayed = stats.reduce((acc, curr) => acc + (curr.matches_played || 0), 0)

  // Bezpieczne wyciągnięcie obiektu drużyny zawodnika
  const teamInfo = Array.isArray(player.teams) ? player.teams[0] : player.teams

  // Filtrowanie meczów na podstawie kolumny is_finished
  const finishedMatches = teamMatches.filter(m => m.is_finished === true)
  const upcomingMatches = teamMatches.filter(m => !m.is_finished)

  const lastMatch = finishedMatches.length > 0 ? finishedMatches[finishedMatches.length - 1] : null
  const nextMatch = upcomingMatches.length > 0 ? upcomingMatches[0] : null

  // Pomocnik do wyciągania nazwy drużyny
  const getTeamName = (teamObj?: TeamRelation | TeamRelation[] | null, fallback = 'Drużyna') => {
    if (!teamObj) return fallback
    return Array.isArray(teamObj) ? (teamObj[0]?.name || fallback) : (teamObj.name || fallback)
  }

  // Pomocnik do wyciągania logo drużyny
  const getTeamLogo = (teamObj?: TeamRelation | TeamRelation[] | null) => {
    if (!teamObj) return null
    return Array.isArray(teamObj) ? teamObj[0]?.logo_url : teamObj.logo_url
  }

  // Formatowanie daty na czytelny polski zapis
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Termin do ustalenia'
    const date = new Date(dateStr)
    return date.toLocaleDateString('pl-PL', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] justify-between">
      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8 w-full">
        
        {teamInfo && (
          <Link 
            href={`/zespoly/${teamInfo.id}`} 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Wróć do drużyny: {teamInfo.name}
          </Link>
        )}

        {/* Karta nagłówkowa zawodnika */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0 text-sky-600 shadow-2xs">
              <User className="w-10 h-10" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 border border-sky-100 px-2.5 py-1 rounded-md">
                Zawodnik GWLO
              </span>
              <h1 className="text-2xl lg:text-4xl font-black text-slate-900 tracking-tight mt-2">
                {player.first_name} {player.last_name}
              </h1>
              {teamInfo && (
                <p className="text-xs text-slate-500 font-semibold mt-1 flex items-center gap-2">
                  {teamInfo.logo_url && <img src={teamInfo.logo_url} alt="" className="w-4 h-4 object-contain" />}
                  <span>{teamInfo.name}</span>
                </p>
              )}
            </div>
          </div>

          {/* Szybkie statystyki zbiorcze */}
          <div className="grid grid-cols-2 gap-3 text-center w-full md:w-auto">
            <div className="bg-sky-50 border border-sky-100 rounded-2xl p-4 px-6">
              <span className="text-[10px] text-sky-600 font-bold block uppercase">Bramki w sezonie</span>
              <span className="text-2xl font-black text-sky-700">{totalGoals}</span>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 px-6">
              <span className="text-[10px] text-slate-400 font-bold block uppercase">Występy w meczach</span>
              <span className="text-2xl font-black text-slate-900">{totalMatchesPlayed}</span>
            </div>
          </div>
        </div>

        {/* Sekcja główna: Tabela statystyk + Ostatni / Następny mecz drużyny */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Tabela dorobku zawodnika (2 kolumny) */}
          <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900">Dorobek w rozgrywkach</h2>
                <p className="text-xs text-slate-400 font-medium">Zestawienie występów i bramek zawodnika</p>
              </div>
            </div>

            {stats.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400">
                Brak zapisanych bramek lub występów w tym sezonie.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <th className="pb-3 px-4">Sezon</th>
                      <th className="pb-3 px-4 text-center">Rozegrane mecze</th>
                      <th className="pb-3 px-4 text-right">Zdobyte bramki</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {stats.map((stat, index) => (
                      <tr key={stat.id || index} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {stat.season_name || stat.season || 'Zima 2026'}
                        </td>
                        <td className="py-3.5 px-4 text-center text-slate-600">
                          {stat.matches_played || 0}
                        </td>
                        <td className="py-3.5 px-4 text-right font-black text-sky-600 text-sm">
                          {stat.goals || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Kafelki meczowe w stylu logiki z designu */}
          <div className="space-y-6 flex flex-col justify-between">
            
            {/* Ostatni mecz */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-800 font-extrabold text-xs">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  <span>Ostatni mecz</span>
                </div>
                {lastMatch && (
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Kolejka {lastMatch.round}
                  </span>
                )}
              </div>

              {!lastMatch ? (
                <p className="text-xs text-slate-400 py-6 text-center font-medium">Brak rozegranych meczów.</p>
              ) : (
                <div className="space-y-6">
                  {/* Drużyny i wynik */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Gospodarz */}
                    <div className="flex flex-col items-center flex-1 text-center space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                        {getTeamLogo(lastMatch.home_team) ? (
                          <img src={getTeamLogo(lastMatch.home_team) ?? ""} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs font-black text-slate-400">GOS</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                        {getTeamName(lastMatch.home_team, 'Gospodarz')}
                      </span>
                    </div>

                    {/* Wynik */}
                    <div className="px-4 py-2 bg-slate-50 border border-slate-200/80 rounded-2xl text-sky-700 font-black text-base tracking-tight shrink-0 shadow-2xs">
                      {lastMatch.home_goals ?? 0} : {lastMatch.away_goals ?? 0}
                    </div>

                    {/* Gość */}
                    <div className="flex flex-col items-center flex-1 text-center space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                        {getTeamLogo(lastMatch.away_team) ? (
                          <img src={getTeamLogo(lastMatch.away_team) ?? ""} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs font-black text-slate-400">GOS</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                        {getTeamName(lastMatch.away_team, 'Gość')}
                      </span>
                    </div>
                  </div>

                  {/* Informacje o dacie i boisku s*/}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-700">{formatDate(lastMatch.match_date)}</span>
                    </div>
                    {lastMatch.location && (
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-700">{lastMatch.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Następny mecz */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5 text-slate-800 font-extrabold text-xs">
                  <Calendar className="w-4 h-4 text-amber-500" />
                  <span>Najbliższy mecz</span>
                </div>
                {nextMatch && (
                  <span className="bg-sky-50 text-sky-700 border border-sky-100 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Kolejka {nextMatch.round}
                  </span>
                )}
              </div>

              {!nextMatch ? (
                <p className="text-xs text-slate-400 py-6 text-center font-medium">Brak zaplanowanych kolejnych spotkań.</p>
              ) : (
                <div className="space-y-6">
                  {/* Drużyny i VS */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Gospodarz */}
                    <div className="flex flex-col items-center flex-1 text-center space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                        {getTeamLogo(nextMatch.home_team) ? (
                          <img src={getTeamLogo(nextMatch.home_team) ?? ""} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs font-black text-slate-400">GOS</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                        {getTeamName(nextMatch.home_team, 'Gospodarz')}
                      </span>
                    </div>

                    {/* VS Badge */}
                    <div className="px-3 py-1.5 bg-amber-50 border border-amber-200/60 rounded-2xl text-amber-700 font-black text-xs tracking-wider shrink-0 shadow-2xs">
                      VS
                    </div>

                    {/* Gość */}
                    <div className="flex flex-col items-center flex-1 text-center space-y-2">
                      <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-2xs">
                        {getTeamLogo(nextMatch.away_team) ? (
                          <img src={getTeamLogo(nextMatch.away_team) || ""} alt="" className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-xs font-black text-slate-400">GOS</span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-800 truncate max-w-[110px]">
                        {getTeamName(nextMatch.away_team, 'Gość')}
                      </span>
                    </div>
                  </div>

                  {/* Informacje o dacie i boisku */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="font-semibold text-slate-700">{formatDate(nextMatch.match_date)}</span>
                    </div>
                    {nextMatch.location ? (
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-700">{nextMatch.location}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-semibold text-slate-700">Boisko SP21</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  )
}