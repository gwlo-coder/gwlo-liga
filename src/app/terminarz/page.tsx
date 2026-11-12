'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Calendar, Clock, MapPin, Shield } from 'lucide-react'
import Link from 'next/link'

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

export default function TerminarzPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRound, setActiveRound] = useState<number>(1)

  useEffect(() => {
    async function fetchMatches() {
      const { data, error } = await supabase
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
        .order('match_date', { ascending: true })

      if (!error && data) {
        setMatches(data as unknown as Match[])
      } else {
        console.error('Błąd pobierania terminarza:', error)
      }
      setLoading(false)
    }

    fetchMatches()
  }, [])

  const rounds = [1, 2, 3, 4, 5, 6, 7]
  const filteredMatches = matches.filter(m => m.round === activeRound)

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-xs font-bold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" /> Harmonogram Spotkań
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Terminarz i Wyniki GWLO
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-2xl">
              Sprawdź daty, godziny oraz wyniki wszystkich spotkań.
            </p>
          </div>

          {/* Wybór kolejek */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {rounds.map((round) => (
              <button
                key={round}
                onClick={() => setActiveRound(round)}
                className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  activeRound === round
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                    : 'bg-white border border-slate-200/80 text-slate-600 hover:bg-slate-100/80'
                }`}
              >
                Kolejka {round}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Kolejka {activeRound}
              </h2>
            </div>

            {loading ? (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 text-xs">
                Wczytywanie terminarza...
              </div>
            ) : filteredMatches.length === 0 ? (
              <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 text-xs">
                Brak zaplanowanych meczów dla tej kolejki.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMatches.map((match) => {
                  const matchDate = match.match_date ? new Date(match.match_date) : null
                  const isValidDate = matchDate && !isNaN(matchDate.getTime())

                  const dateStr = isValidDate 
                    ? matchDate.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' }) 
                    : 'Data do ustalenia'
                  
                  const timeStr = isValidDate 
                    ? matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }) 
                    : ''

                  return (
                    <Link 
                      key={match.id}
                      href={`/mecz/${match.id}`}
                      className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-sky-300 transition-all space-y-4 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          <span>{dateStr} {timeStr ? `• ${timeStr}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{match.location || 'Boisko SP21'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        {/* Gospodarz */}
                        <div className="flex items-center gap-3 flex-1">
                          {match.home_team?.logo_url ? (
                            <img src={match.home_team.logo_url} alt="" className="w-8 h-8 object-contain shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                              <Shield className="w-4 h-4 text-sky-500" />
                            </div>
                          )}
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                            {match.home_team?.name || 'Gospodarz'}
                          </span>
                        </div>

                        {/* Wynik */}
                        <div className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-center shrink-0">
                          {match.is_finished ? (
                            <span className="font-black text-slate-900 text-sm tracking-wider">
                              {match.home_goals ?? 0} : {match.away_goals ?? 0}
                            </span>
                          ) : (
                            <span className="font-black text-xs text-sky-600 tracking-wider">
                              VS
                            </span>
                          )}
                        </div>

                        {/* Gość */}
                        <div className="flex items-center justify-end gap-3 flex-1 text-right">
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                            {match.away_team?.name || 'Gość'}
                          </span>
                          {match.away_team?.logo_url ? (
                            <img src={match.away_team.logo_url} alt="" className="w-8 h-8 object-contain shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                              <Shield className="w-4 h-4 text-sky-500" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 font-medium">Status spotkania</span>
                        <span className={`px-2.5 py-0.5 rounded-lg font-bold ${
                          match.is_finished 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-sky-50 text-sky-600 border border-sky-100'
                        }`}>
                          {match.is_finished ? 'Zakończony' : 'Zaplanowany'}
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}