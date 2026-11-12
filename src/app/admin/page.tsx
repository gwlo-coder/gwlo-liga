'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Calendar, Users, ShieldCheck, LogOut, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const isLogged = localStorage.getItem('glo_admin_logged')
    if (!isLogged) {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('glo_admin_logged')
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main className="max-w-[1000px] mx-auto px-6 py-10 space-y-8 w-full">
        
        {/* Nagłówek powitalny */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-2xs shrink-0">
              <LayoutDashboard className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 border border-sky-100 px-3 py-1 rounded-md">
                Panel Administratora
              </span>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Witaj, Janek 👋
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/"
              className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
            >
              Podgląd ligi
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold rounded-2xl text-xs transition-colors"
            >
              <LogOut className="w-4 h-4" /> Wyloguj
            </button>
          </div>
        </div>

        {/* Statusy systemów (Online) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Strona WWW</p>
              <p className="text-sm font-black text-slate-900">Next.js App</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Online
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Baza Danych</p>
              <p className="text-sm font-black text-slate-900">Supabase DB</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Online
            </div>
          </div>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Bot Discord</p>
              <p className="text-sm font-black text-slate-900">GLO Integrator</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Online
            </div>
          </div>

        </div>

        {/* Szybkie akcje / kafelki nawigacyjne */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <Link 
            href="/admin/mecze"
            className="bg-white border border-slate-200/80 hover:border-sky-300 rounded-3xl p-8 shadow-sm space-y-4 transition-all group block"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-105 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                Zarządzanie Meczami i Kadrami <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Wpisuj wyniki spotkań, uzupełniaj składy meczowe i kontroluj gole strzelane przez zawodników na żywo.
              </p>
            </div>
          </Link>

          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-4 opacity-60">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-black text-slate-900 flex items-center justify-between">
                Zarządzanie Drużynami <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-bold">Wkrótce</span>
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Podgląd i edycja składów zespołów, weryfikacja transferów oraz listy zawodników w lidze.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  )
}