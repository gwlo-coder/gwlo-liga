'use client'

import { Award } from 'lucide-react'

export default function PatronBanner() {
  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12">
        
       
        <div className="text-center md:text-left space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-[11px] font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" /> Patronat Rozgrywek
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-slate-900 tracking-tight uppercase leading-[1.15]">
            Gorzowska Liga Osiedlowa gra pod patronatem
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed">
            Budujemy największą lige osiedlową w regionie współpracując z Młodzieżową Radą Miasta .
          </p>
        </div>

        
        <div className="w-full md:w-auto shrink-0 flex flex-col items-center justify-center md:border-l md:border-slate-100 md:pl-10 lg:pl-12 pt-4 md:pt-0 border-t md:border-t-0">
          <div className="bg-white rounded-2xl p-3 sm:p-4 flex items-center justify-center transition-transform duration-300 hover:scale-105">
            <img
              src="/teams/mrm.png"
              alt="Młodzieżowa Rada Miasta Gorzowa Wielkopolskiego"
              className="h-28 sm:h-32 lg:h-36 w-auto max-w-[260px] sm:max-w-[320px] object-contain select-none"
            />
          </div>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Oficjalny Patronat
          </span>
        </div>

      </div>
    </div>
  )
}