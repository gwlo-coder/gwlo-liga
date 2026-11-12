'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Trophy, ArrowUp, ArrowDown, Minus, Info } from 'lucide-react'
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
  trend?: 'up' | 'down' | 'same'
}

export default function TabelaPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('points', { ascending: false })
        .order('goals_scored', { ascending: false })

      if (!error && data) {
        setTeams(data as Team[])
      }
      setLoading(false)
    }

    fetchTeams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          {/* Nagłówek strony */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5" /> Klasyfikacja Zespołów
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Tabela Ligowa GWLO
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-2xl">
              Oficjalna klasyfikacja Gorzowskiej Ligi Osiedlowej.
            </p>
          </div>

          {/* Główna karta z pełną tabelą */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3 text-center w-14">Pozycja</th>
                    <th className="py-3 px-4">Klub / Drużyna</th>
                    <th className="py-3 px-3 text-center">Mecze</th>
                    <th className="py-3 px-3 text-center">Bramki</th>
                    <th className="py-3 px-3 text-center">Bilans</th>
                    <th className="py-3 px-4 text-center font-bold text-slate-900">Punkty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-normal">
                        Wczytywanie pełnej tabeli ligowej...
                      </td>
                    </tr>
                  ) : teams.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400 font-normal">
                        Brak zarejestrowanych zespołów w bazie danych.
                      </td>
                    </tr>
                  ) : (
                    teams.map((team, index) => {
                      const rank = index + 1
                      const goalDifference = team.goals_scored - team.goals_conceded
                      const trend = team.trend || 'same'

                      return (
                        <tr key={team.id} className="hover:bg-slate-50/80 transition-colors group">
                          
                          {/* Pozycja + Wskaźnik Trendu */}
                          <td className="py-4 px-3 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold ${
                                rank === 1 
                                  ? 'bg-amber-100 text-amber-800 font-black' 
                                  : rank <= 3 
                                  ? 'bg-sky-50 text-sky-700 font-bold' 
                                  : 'text-slate-500'
                              }`}>
                                {rank}
                              </span>
                              {trend === 'up' && <ArrowUp className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />}
                              {trend === 'down' && <ArrowDown className="w-3.5 h-3.5 text-rose-500 stroke-[3]" />}
                              {trend === 'same' && <Minus className="w-3 h-3 text-slate-300 stroke-[3]" />}
                            </div>
                          </td>

                          {/* Nazwa Drużyny z logiem */}
                          <td className="py-4 px-4 font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                            <Link href={`/zespoly/${team.id}`} className="flex items-center gap-3">
                              {team.logo_url ? (
                                <img src={team.logo_url} alt={team.name} className="w-6 h-6 object-contain shrink-0" />
                              ) : (
                                <div className="w-6 h-6 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-[10px] font-black text-slate-600 shrink-0">
                                  {team.short_name || team.name.slice(0, 3).toUpperCase()}
                                </div>
                              )}
                              <span>{team.name}</span>
                            </Link>
                          </td>

                          {/* Rozegrane mecze */}
                          <td className="py-4 px-3 text-center text-slate-600 font-semibold">
                            {team.matches_played}
                          </td>

                          {/* Bramki zdobyte:stracone */}
                          <td className="py-4 px-3 text-center text-slate-500 font-mono text-xs">
                            {team.goals_scored} : {team.goals_conceded}
                          </td>

                          {/* Bilans bramek (+/-) */}
                          <td className="py-4 px-3 text-center font-mono text-xs font-bold">
                            <span className={goalDifference > 0 ? 'text-emerald-600' : goalDifference < 0 ? 'text-rose-500' : 'text-slate-400'}>
                              {goalDifference > 0 ? `+${goalDifference}` : goalDifference}
                            </span>
                          </td>

                          {/* Punkty */}
                          <td className="py-4 px-4 text-center font-black text-slate-900 text-base">
                            <span className="bg-slate-100/80 px-3 py-1 rounded-xl">
                              {team.points}
                            </span>
                          </td>

                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Legenda stref w tabeli */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> 1. Miejsce - Mistrz GWLO
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" /> 2-3. Miejsce - Podium
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-400">
                <Info className="w-3.5 h-3.5" />
                <span>O kolejności decydują: Punkty → Bilans bramek → Mecz bezpośredni.</span>
              </div>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}