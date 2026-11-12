'use client'

import { ArrowRight } from 'lucide-react'

const newsList = [
  {
    id: 1,
    date: '14 Lut 2026',
    title: 'Zmiana godzin meczów w najbliższej kolejce',
    excerpt: 'W związku z rezerwacją Orlika przez miasto, spotkania 3. kolejki zostają przesunięte o godzinę do przodu.',
    tag: 'Komunikat'
  },
  {
    id: 2,
    date: '10 Lut 2026',
    title: 'Podsumowanie hitu kolejek: FC Osiedle w gazie!',
    excerpt: 'Sprawdź, jak wyglądała rywalizacja w miniony weekend i kto zasłużył na miano MVP meczu.',
    tag: 'Podsumowanie'
  }
]

export default function NewsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {newsList.map((item) => (
        <div key={item.id} className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm space-y-4 hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                {item.tag}
              </span>
              <span className="text-slate-400 font-medium">{item.date}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-base leading-snug">
              {item.title}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {item.excerpt}
            </p>
          </div>

          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 transition-colors cursor-pointer">
              <span>Czytaj więcej</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}