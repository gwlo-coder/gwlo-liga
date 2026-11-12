import { Suspense } from 'react'
import AdminMatchEditClient from './AdminMatchDetailContent'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="p-6 text-center text-slate-500 font-medium">Ładowanie edycji meczu...</div>}>
      <MatchWrapper params={params} />
    </Suspense>
  )
}

async function MatchWrapper({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const matchIdNum = parseInt(resolvedParams.id, 10)

  return <AdminMatchEditClient matchId={matchIdNum} />
}