'use client'

import { Flame, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function TopScorers() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between h-full">
      <div className="space-y-6">
        
        {/* Nagłówek sekcji (bez badga "TOP 4") */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-100">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Najlepsi Strzelcy</h2>
            <p className="text-xs text-slate-400 font-medium">Klasyfikacja o Złoty But GWLO</p>
          </div>
        </div>

        {/* Lista strzelców (np. przykładowi zawodnicy lub pobierani z bazy) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs font-black flex items-center justify-center">1</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Jan Kowalski</p>
                <p className="text-[10px] text-slate-400 font-medium">FC Osiedle</p>
              </div>
            </div>
            <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200/60">
              8 bramek
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Michał Nowak</p>
                <p className="text-[10px] text-slate-400 font-medium">Milkersi</p>
              </div>
            </div>
            <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200/60">
              6 bramek
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-lg bg-amber-700/10 text-amber-900 text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Piotr Wiśniewski</p>
                <p className="text-[10px] text-slate-400 font-medium">FC Bogdanka</p>
              </div>
            </div>
            <span className="text-xs font-black text-slate-900 bg-white px-2.5 py-1 rounded-xl border border-slate-200/60">
              5 bramek
            </span>
          </div>
        </div>

      </div>

      {/* Stopka z przyciskiem na dole */}
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