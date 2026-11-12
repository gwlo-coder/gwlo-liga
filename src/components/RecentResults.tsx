'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Activity } from 'lucide-react'

type Team = {
  name: string
}

type Match = {
  id: number
  round: number
  home_goals: number | null
  away_goals: number | null
  is_finished: boolean
  home_team?: Team | Team[] | null
  away_team?: Team | Team[] | null
}

export default function RecentResults() {
  const [results, setResults] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecentResults() {
      const { data, error } = await supabase
        .from('matches')
        .select(`
          id,
          round,
          home_goals,
          away_goals,
          is_finished,
          home_team:teams!home_team_id(name),
          away_team:teams!away_team_id(name)
        `)
        .eq('is_finished', true)
        .order('id', { ascending: false })
        .limit(4)

      if (!error && data) {
        setResults(data)
      }
      setLoading(false)
    }

    fetchRecentResults()
  }, [])

  const getTeamName = (teamRel: Team | Team[] | null | undefined): string => {
    if (!teamRel) return 'Nieznana'
    if (Array.isArray(teamRel)) {
      return teamRel[0]?.name || 'Nieznana'
    }
    return teamRel.name || 'Nieznana'
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
      
      {/* Nagłówek */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Ostatnie Wyniki</h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-400">Na żywo z bazy</span>
      </div>

      {/* Lista meczów */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-4 text-xs text-slate-400 font-medium">Ładowanie wyników...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-400 font-medium">Brak zakończonych meczów.</div>
        ) : (
          results.map((match) => {
            const homeName = getTeamName(match.home_team)
            const awayName = getTeamName(match.away_team)
            const scoreText = `${match.home_goals ?? 0} : ${match.away_goals ?? 0}`

            return (
              <div 
                key={match.id} 
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs font-semibold text-slate-800 hover:border-slate-200 transition-colors"
              >
                <span className="w-2/5 truncate">{homeName}</span>
                <span className="px-2.5 py-0.5 rounded bg-white border border-slate-200 text-sky-600 font-bold font-mono text-[11px] shadow-2xs">
                  {scoreText}
                </span>
                <span className="w-2/5 text-right truncate">{awayName}</span>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}