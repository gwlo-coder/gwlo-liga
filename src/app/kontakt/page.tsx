'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, Phone, MapPin, Send, MessageSquare, Trophy } from 'lucide-react'

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          {/* Nagłówek strony */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-xs font-bold uppercase tracking-wider">
              <Mail className="w-3.5 h-3.5" /> Skontaktuj się z nami
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Kontakt i Organizacja GWLO
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-2xl">
              Masz pytania dotyczące rozgrywek, zapisów drużyny lub terminarza? Skontaktuj się z zarządem Gorzowskiej Ligi Osiedlowej.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Kafelki informacyjne (Lewa kolumna - wyrównana idealnie do dołu) */}
            <div className="lg:col-span-1 flex flex-col justify-between space-y-4 lg:space-y-0">
              
              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-sky-50 text-sky-600 border border-sky-100 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Miejsce Rozgrywek</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Boisko SP21, Gorzów Wlkp.</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Infolinia / Kapitanowie</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">+48 000 000 000</p>
                </div>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Adres E-mail</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">kontakt@gwlo-pro.pl</p>
                </div>
              </div>

              {/* Karta z pełną nazwą stowarzyszenia */}
              <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-md space-y-2.5">
                <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                  <Trophy className="w-4 h-4 shrink-0" />
                  <span>Stowarzyszenie Amatorskich Aktywności Sportowych</span>
                </div>
                <p className="text-xs text-slate-300 font-normal leading-relaxed">
                  Oficjalny organizator rozgrywek Gorzowskiej Ligi Osiedlowej. Działamy na rzecz aktywizacji sportowej osiedli.
                </p>
              </div>

            </div>

            {/* Formularz kontaktowy (Prawa kolumna) */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm lg:col-span-2 space-y-6 flex flex-col justify-between">
              
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 border border-sky-100">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-slate-900">Napisz do nas</h2>
                  <p className="text-xs text-slate-400 font-medium">Odpowiadamy najszybciej jak to możliwe</p>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert('Wiadomość została wysłana!'); }} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Twoje Imię / Drużyna</label>
                    <input 
                      type="text" 
                      placeholder="np. Jan Kowalski (FC Bogdanka)" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Adres E-mail</label>
                    <input 
                      type="email" 
                      placeholder="adres@email.com" 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Temat wiadomości</label>
                  <input 
                    type="text" 
                    placeholder="np. Zgłoszenie nowego zawodnika / Pytanie o terminarz" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-medium"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Treść wiadomości</label>
                  <textarea 
                    rows={5}
                    placeholder="Wpisz treść swojej wiadomości..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white transition-all font-medium resize-none"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs uppercase tracking-wider py-4 rounded-xl transition-colors shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Wyślij wiadomość
                </button>
              </form>

            </div>

          </div>

        </main>
      </div>

      <Footer />
    </div>
  )
}