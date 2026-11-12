import Link from 'next/link'
import { Trophy, Mail, MapPin, Whistle, ArrowUp } from 'lucide-react'

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        
        {/* Górna część stopki (Siatka informacyjna) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Kolumna 1: O projekcie */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center font-bold text-white text-base shadow-sm">
                GW
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white leading-none">
                  GWLO <span className="text-sky-500 text-xs">PRO</span>
                </span>
                <span className="text-[10px] tracking-wide text-slate-400 font-medium mt-1">
                  Gorzowska Liga Osiedlowa
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Oficjalne centrum amatorskich rozgrywek piłkarskich w Gorzowie Wielkopolskim. Rywalizacja, emocje i pasja na osiedlowych orlikach.
            </p>
          </div>

          {/* Kolumna 2: Szybkie linki */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Nawigacja</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/" className="hover:text-sky-400 transition-colors">Strona główna</Link>
              </li>
              <li>
                <Link href="/terminarz" className="hover:text-sky-400 transition-colors">Terminarz i Mecze</Link>
              </li>
              <li>
                <Link href="/tabela" className="hover:text-sky-400 transition-colors">Tabela ligowa</Link>
              </li>
              <li>
                <Link href="/zespoly" className="hover:text-sky-400 transition-colors">Zespoły i Składy</Link>
              </li>
              <li>
                <Link href="/statystyki" className="hover:text-sky-400 transition-colors">Statystyki i Strzelci</Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 3: Dokumenty */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Regulamin i Prawo</h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-400">
              <li>
                <Link href="/regulamin" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Whistle className="w-3.5 h-3.5 text-sky-500" />
                  <span>Regulamin rozgrywek</span>
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-sky-400 transition-colors flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  <span>Kontakt z organizatorem</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolumna 4: Lokalizacja */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Lokalizacja</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
              <span>Orlik GWLO, ul. Parkowa / Osiedlowa<br />66-400 Gorzów Wielkopolski</span>
            </div>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-semibold">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Sezon Zima 2026 w toku
              </span>
            </div>
          </div>

        </div>

        {/* Dolna belka (Copyright + powrót do góry) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Gorzowska Liga Osiedlowa (GWLO). Wszelkie prawa zastrzeżone.</p>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/50"
          >
            <span>Do góry</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  )
}