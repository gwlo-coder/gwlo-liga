'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { Calendar, Clock, MapPin, Shield } from 'lucide-react'

type Team = {
  id: number
  name: string
  short_name: string
  logo_url?: string
}

type Match = {
  id: number
  round: number
  match_date: string
  location: string
  is_finished: boolean
  home_team: Team | null
  away_team: Team | null
}

export default function UpcomingMatch() {
  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNextMatch() {
      // Pobieramy najbliższy nierozegrany mecz z bazy
      const { data, error } = await supabase
        .from('matches')
        .select(`
          id,
          round,
          match_date,
          location,
          is_finished,
          home_team:teams!home_team_id (id, name, short_name, logo_url),
          away_team:teams!away_team_id (id, name, short_name, logo_url)
        `)
        .eq('is_finished', false)
        .order('match_date', { ascending: true })
        .limit(1)
        .single()

      if (!error && data) {
        setMatch(data as unknown as Match)
      }
      setLoading(false)
    }

    fetchNextMatch()
  }, [])

  if (loading) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 text-center text-xs text-slate-400">
        Wczytywanie najbliższego meczu...
      </div>
    )
  }

  if (!match) {
    return (
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 text-center text-xs text-slate-400">
        Brak zaplanowanych nadchodzących meczów.
      </div>
    )
  }

  const matchDate = new Date(match.match_date)
  const dateStr = matchDate.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
  const timeStr = matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 flex flex-col justify-between">
      
      {/* Nagłówek sekcji */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-sky-600" />
          <h3 className="text-sm font-bold text-slate-900 tracking-tight">Najbliższy mecz</h3>
        </div>
        <span className="text-[10px] font-bold text-sky-600 uppercase bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
          KOLEJKA {match.round}
        </span>
      </div>

      {/* Pojedynek drużyn */}
      <div className="flex items-center justify-between py-2">
        
        {/* Gospodarz */}
        <div className="flex flex-col items-center text-center w-5/12">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 shadow-2xs overflow-hidden p-1">
            {match.home_team?.logo_url ? (
              <img src={match.home_team.logo_url} alt="" className="w-full h-full object-contain" />
            ) : (
              <span className="font-black text-slate-700 text-xs">
                {match.home_team?.short_name || match.home_team?.name?.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-slate-800 truncate w-full">
            {match.home_team?.name || 'Gospodarz'}
          </span>
        </div>

        {/* VS */}
        <div className="shrink-0 text-center px-2">
          <span className="text-xs font-extrabold text-slate-400 bg-slate-50 border border-slate-200/70 px-2.5 py-1 rounded-lg">
            VS
          </span>
        </div>

        {/* Gość */}
        <div className="flex flex-col items-center text-center w-5/12">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center mb-1.5 shadow-2xs overflow-hidden p-1">
            {match.away_team?.logo_url ? (
              <img src={match.away_team.logo_url} alt="" className="w-full h-full object-contain" />
            ) : (
              <span className="font-black text-slate-700 text-xs">
                {match.away_team?.short_name || match.away_team?.name?.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-slate-800 truncate w-full">
            {match.away_team?.name || 'Gość'}
          </span>
        </div>

      </div>

      {/* Czas i Miejsce */}
      <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-500 font-medium">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-sky-600" /> Kiedy:
          </span>
          <span className="font-semibold text-slate-700 capitalize">{dateStr}, {timeStr}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sky-600" /> Boisko:
          </span>
          <span className="font-semibold text-slate-700">{match.location || 'Orlik Parkowa'}</span>
        </div>
      </div>

    </div>
  )
}