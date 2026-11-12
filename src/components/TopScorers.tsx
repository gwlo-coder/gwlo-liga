'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Flame, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Team = {
  name: string
}

type PlayerSeason = {
  id: number
  goals: number
  players: {
    first_name: string
    last_name: string
  } | {
    first_name: string
    last_name: string
  }[] | null
  teams: Team | Team[] | null
}

export default function TopScorers() {
  const [scorers, setScorers] = useState<PlayerSeason[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTopScorers() {
      // Odpytujemy tabelę player_seasons, z której biorą się gole
      const { data, error } = await supabase
        .from('player_seasons')
        .select(`
          id,
          goals,
          players:player_id (
            first_name,
            last_name
          ),
          teams:team_id (
            name
          )
        `)
        .order('goals', { ascending: false })
        .limit(3)

      if (!error && data) {
        setScorers(data)
      }
      setLoading(false)
    }

    fetchTopScorers()
  }, [])

  const getPlayerName = (playerRel: PlayerSeason['players']): string => {
    if (!playerRel) return 'Nieznany'
    if (Array.isArray(playerRel)) {
      const p = playerRel[0]
      return p ? `${p.first_name || ''} ${p.last_name || ''}`.trim() : 'Nieznany'
    }
    return `${playerRel.first_name || ''} ${playerRel.last_name || ''}`.trim()
  }

  const getTeamName = (teamRel: Team | Team[] | null | undefined): string => {
    if (!teamRel) return 'Wolny zawodnik'
    if (Array.isArray(teamRel)) {
      return teamRel[0]?.name || 'Wolny zawodnik'
    }
    return teamRel.name || 'Wolny zawodnik'
  }

  const getBadgeStyle = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-amber-100 text-amber-800'
      case 1:
        return 'bg-slate-200 text-slate-700'
      case 2:
        return 'bg-amber-700/10 text-amber-900'
      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-6">
        
        {/* Nagłówek sekcji */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Najlepsi Strzelcy</h2>
            <p className="text-xs text-slate-400 font-medium">Klasyfikacja o Złoty But GWLO</p>
          </div>
        </div>

        {/* Lista strzelców z bazy */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-6 text-xs text-slate-400 font-medium">Ładowanie strzelców...</div>
          ) : scorers.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400 font-medium">Brak danych o strzelcach.</div>
          ) : (
            scorers.map((item, index) => {
              const playerName = getPlayerName(item.players)
              const teamName = getTeamName(item.teams)
              
              return (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${getBadgeStyle(index)}`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">{playerName}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{teamName}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200/60">
                    {item.goals} bramek
                  </span>
                </div>
              )
            })
          )}
        </div>

      </div>

      {/* Stopka z przyciskiem */}
      <div className="pt-4 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
        <span className="text-slate-400">Klasyfikacja aktualizowana po meczach</span>
        <Link 
          href="/statystyki" 
          className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/60 px-3.5 py-2 rounded-xl transition-colors"
        >
          <span>Pełne statystyki</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  )
}