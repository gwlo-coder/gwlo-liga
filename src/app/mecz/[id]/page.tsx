import { Suspense } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import MatchDetailContent from './MatchDetailContent'

type MatchPageProps = {
  params: Promise<{
    id: string
  }>
}

async function MatchDataLoader({ params }: MatchPageProps) {
  const resolvedParams = await params
  const matchId = parseInt(resolvedParams.id)

  if (isNaN(matchId)) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center">
        <p className="text-slate-500 text-xs">Nieprawidłowy identyfikator meczu.</p>
      </div>
    )
  }

  // 1. Pobieranie danych meczu wraz z gospodarzem, gościem i season_id
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select(`
      id,
      season_id,
      round,
      match_date,
      location,
      home_team_id,
      away_team_id,
      home_goals,
      away_goals,
      is_finished,
      home_team:teams!home_team_id(id, name, logo_url),
      away_team:teams!away_team_id(id, name, logo_url)
    `)
    .eq('id', matchId)
    .single()

  if (matchError || !match) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-20 text-center space-y-4">
        <p className="text-slate-500 font-medium text-xs">Nie znaleziono meczu w bazie.</p>
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-sky-600 bg-sky-50 px-4 py-2.5 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Powrót do strony głównej
        </Link>
      </div>
    )
  }

  // 2. Pobieramy bramki dla tego meczu oraz statystyki zawodników w sezonie, żeby odfiltrować skład
  const [matchGoalsRes, seasonStatsRes] = await Promise.all([
    supabase.from('match_goals').select('id, scorer_id, team_id').eq('match_id', matchId),
    match.season_id 
      ? supabase.from('player_seasons').select('player_id, matches_played, goals').eq('season_id', match.season_id).gt('matches_played', 0)
      : Promise.resolve({ data: [] })
  ])

  const goalsList = matchGoalsRes.data || []
  const seasonStats = seasonStatsRes.data || []

  // Wyciągamy ID graczy, którzy albo strzelili bramkę w tym meczu, albo mają odnotowany występ w sezonie
  // (Możesz też ścisłe dopasować, jeśli w player_seasons zapisujesz stan pojedynczego meczu)
  const activePlayerIds = Array.from(new Set([
    ...goalsList.map(g => g.scorer_id),
    ...seasonStats.filter(s => s.matches_played > 0).map(s => s.player_id)
  ]))

  if (activePlayerIds.length === 0) {
    return <MatchDetailContent match={match} playerStats={[]} />
  }

  // 3. Pobieramy dane tylko tych zawodników, którzy brali udział w meczu
  const { data: activePlayers } = await supabase
    .from('players')
    .select('id, first_name, last_name, team_id')
    .in('id', activePlayerIds)

  const playersList = activePlayers || []

  const formatPlayerStats = (teamId: number) => {
    return playersList
      .filter(p => p.team_id === teamId)
      .map(player => {
        const playerGoals = goalsList.filter(g => g.scorer_id === player.id).length
        return {
          id: player.id,
          player_id: player.id,
          goals: playerGoals,
          players: player
        }
      })
  }

  const playerStatsCombined = [
    ...formatPlayerStats(match.home_team_id),
    ...formatPlayerStats(match.away_team_id)
  ]

  return (
    <MatchDetailContent 
      match={match} 
      playerStats={playerStatsCombined} 
    />
  )
}

export default function MatchDetailPage({ params }: MatchPageProps) {
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
        <MatchDataLoader params={params} />
      </Suspense>
    </div>
  )
}