import Link from 'next/link'
import { Calendar, ArrowRight, BarChart3 } from 'lucide-react'

export default function HeroBanner() {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden shadow-sm min-h-[380px] lg:min-h-[440px] flex items-center p-8 lg:p-16 bg-slate-900">
      
      {/* Zdjęcie w tle z mocnym przyciemnieniem, żeby pasowało do jasnego motywu */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105 opacity-60"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518091043644-c1d4457512c6?q=80&w=1931&auto=format&fit=crop')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40 z-10" />

      {/* Treść */}
      <div className="relative z-20 max-w-3xl space-y-6">
        
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-semibold tracking-wide backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          <span>Sezon "ZIMA" 2026 • Gorzów Wielkopolski</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            Gorzowska Liga <br />
            Osiedlowa <span className="text-sky-400">GWLO</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
            Oficjalne centrum amatorskich rozgrywek piłkarskich. Śledź statystyki, aktualną tabelę oraz mecze na żywo.
          </p>
        </div>

        {/* Liczniki */}
        <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/15 max-w-md text-white">
          <div>
            <div className="text-xl font-bold text-sky-400">8</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Zespołów</div>
          </div>
          <div>
            <div className="text-xl font-bold text-sky-400">120+</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Zawodników</div>
          </div>
          <div>
            <div className="text-xl font-bold text-sky-400">LIVE</div>
            <div className="text-xs text-slate-300 font-medium mt-0.5">Wyniki na żywo</div>
          </div>
        </div>

      </div>

    </section>
  )
}