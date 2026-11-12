'use client'

import { Activity } from 'lucide-react'

const results = [
  { id: 1, home: 'Podwórko SC', away: 'Blokersi', score: '1 : 3', status: 'Zakończony' },
  { id: 2, home: 'Słowianka Team', away: 'Zatoka', score: '0 : 2', status: 'Zakończony' },
  { id: 3, home: 'FC Osiedle', away: 'Podwórko SC', score: '4 : 1', status: 'Zakończony' },
]

export default function RecentResults() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4">
      
      {/* Nagłówek */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Ostatnie Wyniki</h3>
        </div>
        <span className="text-[10px] font-semibold text-slate-400">2. Kolejka</span>
      </div>

      {/* Lista meczów */}
      <div className="space-y-3">
        {results.map((match) => (
          <div 
            key={match.id} 
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-xs font-semibold text-slate-800 hover:border-slate-200 transition-colors"
          >
            <span className="w-2/5 truncate">{match.home}</span>
            <span className="px-2.5 py-0.5 rounded bg-white border border-slate-200 text-sky-600 font-bold font-mono text-[11px] shadow-2xs">
              {match.score}
            </span>
            <span className="w-2/5 text-right truncate">{match.away}</span>
          </div>
        ))}
      </div>

    </div>
  )
}