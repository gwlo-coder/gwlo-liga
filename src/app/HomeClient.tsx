'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import HeroBanner from '@/components/HeroBanner'
import LeagueTable from '@/components/LeagueTable'
import TopScorers from '@/components/TopScorers'
import UpcomingMatch from '@/components/UpcomingMatch'
import RecentResults from '@/components/RecentResults'
import NewsSection from '@/components/NewsSection'
import Footer from '@/components/Footer'
import { Calendar, Trophy, Newspaper } from 'lucide-react'

type Team = {
  id: number
  name: string
  points: number
  goals_scored: number
  goals_conceded: number
}

export default function HomeClient() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeams() {
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('points', { ascending: false })
      
      if (!error && data) {
        setTeams(data)
      }
      setLoading(false)
    }

    fetchTeams()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 space-y-12">
        <section>
          <HeroBanner />
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Calendar className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Centrum Meczowe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <UpcomingMatch />
            <RecentResults />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Trophy className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Klasyfikacje i Statystyki</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <LeagueTable teams={teams} loading={loading} />
            <TopScorers />
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center gap-2.5 pb-2">
            <Newspaper className="w-5 h-5 text-sky-600" />
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Aktualności Ligowe</h2>
          </div>
          <NewsSection />
        </section>
      </main>

      <Footer />
    </div>
  )
}