'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

type Team = {
  id: number
  name: string
  short_name: string
  logo_url?: string
  points: number
  matches_played: number
}

export default function ZespolyPage() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('name', { ascending: true })

      if (!error && data) {
        setTeams(data as Team[])
      }
      setLoading(false)
    }

    fetchTeams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-8">
          
          {/* Nagłówek strony */}
          <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 border border-sky-100 text-xs font-bold uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" /> Kluby GWLO
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Zespoły Sezonu "ZIMA" 2026
            </h1>
            <p className="text-xs text-slate-500 font-medium max-w-2xl">
              Lista wszystkich oficjalnych drużyn biorących udział w rozgrywkach.
            </p>
          </div>

          {/* Siatka zespołów */}
          {loading ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 text-xs">
              Wczytywanie zespołów...
            </div>
          ) : teams.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center text-slate-400 text-xs">
              Brak zarejestrowanych zespołów w bazie danych.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teams.map((team) => (
                <div 
                  key={team.id}
                  className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0 p-2 shadow-2xs group-hover:scale-105 transition-transform">
                      {team.logo_url ? (
                        <img src={team.logo_url} alt={team.name} className="w-full h-full object-contain" />
                      ) : (
                        <Shield className="w-7 h-7 text-sky-500" />
                      )}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-extrabold text-slate-900 text-sm truncate group-hover:text-sky-600 transition-colors">
                        {team.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                        Skrót: {team.short_name || 'GWLO'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Punkty</span>
                        <span className="text-slate-900 font-black">{team.points}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Mecze</span>
                        <span className="text-slate-900 font-black">{team.matches_played}</span>
                      </div>
                    </div>

                    <Link 
                      href={`/zespoly/${team.id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 bg-sky-50 hover:bg-sky-100/60 px-3 py-2 rounded-xl transition-colors"
                    >
                      <span>Profil</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>

      <Footer />
    </div>
  )
}