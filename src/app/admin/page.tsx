'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { Calendar, Edit3, ArrowRight, LogOut, ShieldCheck, Activity } from 'lucide-react'

type Team = {
  id: number
  name: string
  logo_url?: string
}

type Match = {
  id: number
  round: number
  match_date: string
  is_finished: boolean
  home_team?: Team | Team[] | null
  away_team?: Team | Team[] | null
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [dbStatus, setDbStatus] = useState<'checking' | 'online' | 'offline'>('checking')
  const router = useRouter()

  useEffect(() => {
    async function checkAuthAndFetchData() {
      const isLoggedLocal = localStorage.getItem('glo_admin_logged')
      const { data } = await supabase.auth.getSession()

      if (!isLoggedLocal && !data.session) {
        router.push('/admin/login')
        return
      }

      // Sprawdzamy stan połączenia z bazą (health-check Supabase)
      try {
        const { error: pingError } = await supabase.from('matches').select('id').limit(1)
        if (pingError) {
          setDbStatus('offline')
        } else {
          setDbStatus('online')
        }
      } catch {
        setDbStatus('offline')
      }

      // Pobieranie meczów z bazy
      const { data: matchesData, error: matchesError } = await supabase
        .from('matches')
        .select(`
          id,
          round,
          match_date,
          is_finished,
          home_team:teams!home_team_id(id, name, logo_url),
          away_team:teams!away_team_id(id, name, logo_url)
        `)
        .order('round', { ascending: true })

      if (!matchesError && matchesData) {
        setMatches(matchesData)
      }
      setLoading(false)
    }

    checkAuthAndFetchData()
  }, [router])

  const handleLogout = async () => {
    localStorage.removeItem('glo_admin_logged')
    await supabase.auth.signOut()

    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key && (key.startsWith('sb-') || key.includes('auth'))) {
        localStorage.removeItem(key)
      }
    }

    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`)
    })

    router.push('/admin/login')
    router.refresh()
  }

  const getTeamName = (teamObj?: Team | Team[] | null) => {
    if (!teamObj) return 'Drużyna'
    return Array.isArray(teamObj) ? teamObj[0]?.name : teamObj.name
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <main className="max-w-[1000px] mx-auto px-6 py-10 space-y-8 w-full">
        
        {/* Nagłówek panelu */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-2xs shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 border border-sky-100 px-3 py-1 rounded-md">
                  Strefa Administratora
                </span>
                
                {/* Wskaźnik statusu API / Bazy Supabase na żywo */}
                <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-md text-[10px] font-bold text-slate-700">
                  <Activity className="w-3 h-3 text-sky-600" />
                  <span>Supabase:</span>
                  {dbStatus === 'checking' && <span className="text-amber-600">Sprawdzanie...</span>}
                  {dbStatus === 'online' && <span className="text-emerald-600 flex items-center gap-1">● Online</span>}
                  {dbStatus === 'offline' && <span className="text-rose-600 flex items-center gap-1">● Awaria</span>}
                </div>
              </div>

              <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
                Witaj w panelu! 👋
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link 
              href="/"
              className="flex-1 sm:flex-none text-center px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition-colors"
            >
              Przejdź do strony głównej
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100 font-bold rounded-2xl text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Wyloguj
            </button>
          </div>
        </div>

        {/* Lista meczów */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 lg:p-8 shadow-sm space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-100 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-sky-600" /> Wszystkie spotkania w terminarzu
          </h2>

          {loading ? (
            <div className="text-center py-12 text-xs text-slate-400">Ładowanie meczów...</div>
          ) : matches.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">Brak zaplanowanych meczów w bazie.</div>
          ) : (
            <div className="space-y-3">
              {matches.map((match) => (
                <div 
                  key={match.id}
                  className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-4 hover:border-slate-200 transition-colors"
                >
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-900">
                    <span className="bg-white border border-slate-200 px-3 py-1.5 rounded-xl text-sky-700 shadow-2xs">
                      Kol. {match.round}
                    </span>
                    <span className="truncate max-w-[180px] text-right">{getTeamName(match.home_team)}</span>
                    <span className="text-slate-400 font-normal">vs</span>
                    <span className="truncate max-w-[180px] text-left">{getTeamName(match.away_team)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      match.is_finished ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-white'
                    }`}>
                      {match.is_finished ? 'Rozegrany' : 'Nadchodzący'}
                    </span>

                    <Link 
                      href={`/admin/mecze/${match.id}`}
                      className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shadow-2xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edytuj mecz <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}