import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import PlayerProfileContent from './PlayerProfileContent'

type PlayerProfilePageProps = {
  params: Promise<{
    id: string
  }>
}

async function PlayerDataLoader({ params }: PlayerProfilePageProps) {
  const resolvedParams = await params
  const playerId = parseInt(resolvedParams.id)

  if (isNaN(playerId)) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <p className="text-slate-500 text-xs">Nieprawidłowy identyfikator zawodnika.</p>
      </div>
    )
  }

  // 1. Pobieranie danych zawodnika wraz z zespołem
  const { data: player, error: playerError } = await supabase
    .from('players')
    .select(`
      id,
      first_name,
      last_name,
      team_id,
      teams:teams(id, name, short_name, logo_url)
    `)
    .eq('id', playerId)
    .single()

  if (playerError || !player) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center space-y-4">
        <p className="text-slate-500 font-medium text-xs">Nie znaleziono zawodnika w bazie.</p>
        <Link href="/zespoly" className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-4 py-2.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Powrót do zespołów
        </Link>
      </div>
    )
  }

  // 2. Pobieranie statystyk zawodnika z tabeli player_seasons
  const { data: statsData } = await supabase
    .from('player_seasons')
    .select('*')
    .eq('player_id', playerId)

  // 3. Pobieranie meczów drużyny zawodnika
  const { data: teamMatchesData } = await supabase
    .from('matches')
    .select(`
      id,
      round,
      match_date,
      location,
      home_team_id,
      away_team_id,
      home_goals,
      away_goals,
      is_finished,
      home_team:teams!home_team_id(name, logo_url),
      away_team:teams!away_team_id(name, logo_url)
    `)
    .or(`home_team_id.eq.${player.team_id},away_team_id.eq.${player.team_id}`)
    .order('match_date', { ascending: true })

  return (
    <PlayerProfileContent 
      player={player} 
      stats={statsData || []} 
      teamMatches={teamMatchesData || []} 
    />
  )
}

export default function PlayerProfilePage({ params }: PlayerProfilePageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      <Suspense fallback={<div className="h-20 bg-white border-b border-slate-100" />}>
        <Navbar />
      </Suspense>
      
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center py-32">
          <div className="w-8 h-8 border-4 border-sky-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <PlayerDataLoader params={params} />
      </Suspense>
    </div>
  )
}