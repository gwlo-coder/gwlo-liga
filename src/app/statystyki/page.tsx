'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Flame, Award, Shield } from 'lucide-react'
import Link from 'next/link'

type Scorer = {
  id: number
  goals: number
  players: {
    id: number
    first_name: string
    last_name: string
  } | {
    id: number
    first_name: string
    last_name: string
  }[] | null
  teams: {
    id: number
    name: string
  } | {
    id: number
    name: string
  }[] | null
}

export default function StatystykiPage() {
  const [scorers, setScorers] = useState<Scorer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchScorers() {
      const { data, error } = await supabase
        .from('player_seasons')
        .select(`
          id,
          goals,
          players:player_id (
            id,
            first_name,
            last_name
          ),
          teams:team_id (
            id,
            name
          )
        `)
        .order('goals', { ascending: false })

      if (!error && data) {
        setScorers(data as unknown as Scorer[])
      }
      setLoading(false)
    }

    fetchScorers()
  }, [])

  const getPlayerInfo = (playersRel: Scorer['players']) => {
    if (!playersRel) return { id: 0, name: 'Nieznany zawodnik' }
    const p = Array.isArray(playersRel) ? playersRel[0] : playersRel
    if (!p) return { id: 0, name: 'Nieznany zawodnik' }
    return {
      id: p.id,
      name: `${p.first_name || ''} ${p.last_name || ''}`.trim()
    }
  }

  const getTeamInfo = (teamsRel: Scorer['teams']) => {
    if (!teamsRel) return null
    const t = Array.isArray(teamsRel) ? teamsRel[0] : teamsRel
    return t || null
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          {/* Nagłówek strony */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" /> Klasyfikacja Indywidualna
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Złoty But GWLO – Najlepsi Strzelcy
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-2xl">
              Sprawdź klasyfikację snajperów Gorzowskiej Ligi Osiedlowej. Statystyki aktualizują się automatycznie po wpisaniu wyników meczów.
            </p>
          </div>

          {/* Główna tabela statystyk */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Ranking Snajperów</h2>
                  <p className="text-xs text-slate-400 font-medium">Sezon Zima 2026</p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-3 text-center w-14">#</th>
                    <th className="py-3 px-4">Zawodnik</th>
                    <th className="py-3 px-4">Klub</th>
                    <th className="py-3 px-6 text-center font-bold text-sky-600">Bramki</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium text-slate-700">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400 font-normal">
                        Wczytywanie statystyk...
                      </td>
                    </tr>
                  ) : scorers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400 font-normal">
                        Brak zarejestrowanych bramek w bazie danych.
                      </td>
                    </tr>
                  ) : (
                    scorers.map((item, index) => {
                      const rank = index + 1
                      const playerInfo = getPlayerInfo(item.players)
                      const teamInfo = getTeamInfo(item.teams)

                      return (
                        <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                          
                          {/* Pozycja */}
                          <td className="py-4 px-3 text-center">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-bold ${
                              rank === 1 ? 'bg-amber-100 text-amber-800 font-black' : 'text-slate-500 bg-slate-100/70'
                            }`}>
                              {rank}
                            </span>
                          </td>

                          {/* Zawodnik */}
                          <td className="py-4 px-4 font-bold text-slate-900">
                            <Link href={`/zawodnik/${playerInfo.id}`} className="hover:text-sky-600 transition-colors">
                              {playerInfo.name}
                            </Link>
                          </td>

                          {/* Klub */}
                          <td className="py-4 px-4 text-slate-600">
                            {teamInfo ? (
                              <Link href={`/zespoly/${teamInfo.id}`} className="hover:text-sky-600 transition-colors inline-flex items-center gap-1.5 font-semibold text-xs">
                                <Shield className="w-3.5 h-3.5 text-sky-500" />
                                <span>{teamInfo.name}</span>
                              </Link>
                            ) : (
                              <span className="text-slate-400">Brak klubu</span>
                            )}
                          </td>

                          {/* Liczba bramek */}
                          <td className="py-4 px-6 text-center font-black text-sky-600 text-base font-mono">
                            <span className="bg-sky-50 px-3.5 py-1 rounded-xl border border-sky-100">
                              {item.goals}
                            </span>
                          </td>

                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}