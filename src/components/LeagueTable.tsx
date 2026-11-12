'use client'

import { Trophy, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  logo_url?: string
  points: number
  goals_scored: number
  goals_conceded: number
}

type LeagueTableProps = {
  teams: Team[]
  loading: boolean
}

export default function LeagueTable({ teams, loading }: LeagueTableProps) {
  const topTeams = teams.slice(0, 5)

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-6">
        
        {/* Nagłówek sekcji (bez przycisku u góry) */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Tabela TOP 5</h2>
            <p className="text-xs text-slate-400 font-medium">Sezon Zima 2026</p>
          </div>
        </div>

        {/* Tabela */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/60 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-2.5 px-2 text-center w-12">#</th>
                <th className="py-2.5 px-3">Drużyna</th>
                <th className="py-2.5 px-2 text-center">Bramki</th>
                <th className="py-2.5 px-3 text-center font-bold text-slate-900">Pkt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Wczytywanie tabeli...
                  </td>
                </tr>
              ) : topTeams.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-400">
                    Brak danych drużyn.
                  </td>
                </tr>
              ) : (
                topTeams.map((team, index) => {
                  const rank = index + 1
                  return (
                    <tr key={team.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-2 text-center">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-lg text-xs font-bold ${
                          rank === 1 ? 'bg-amber-100 text-amber-800 font-black' : 'text-slate-500 bg-slate-100/70'
                        }`}>
                          {rank}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">
                        <Link href={`/zespoly/${team.id}`} className="hover:text-sky-600 transition-colors flex items-center gap-2.5">
                          {team.logo_url ? (
                            <img src={team.logo_url} alt={team.name} className="w-5 h-5 object-contain shrink-0" />
                          ) : (
                            <div className="w-5 h-5 rounded bg-slate-100 flex items-center justify-center text-[9px] font-black text-slate-500 shrink-0">
                              {team.name.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span className="truncate max-w-[140px] sm:max-w-[180px]">{team.name}</span>
                        </Link>
                      </td>
                      <td className="py-3 px-2 text-center text-slate-500 font-mono text-[11px]">
                        {team.goals_scored}:{team.goals_conceded}
                      </td>
                      <td className="py-3 px-3 text-center font-black text-slate-900 text-sm">
                        <span className="bg-slate-100 px-2.5 py-0.5 rounded-lg">
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

      </div>

      {/* Stopka z przyciskiem "Pełna tabela" na dole */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
        <span className="text-slate-400">Top 3 awansuje do strefy medalowej</span>
        <Link 
          href="/tabela" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/60 px-3.5 py-2 rounded-xl transition-colors"
        >
          <span>Pełna tabela</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  )
}