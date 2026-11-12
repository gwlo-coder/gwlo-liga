export const instant = false

import { Suspense } from 'react'
import TeamProfileContent from './TeamProfileContent'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params
  const teamId = Number(resolvedParams.id)

  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-400">Wczytywanie profilu...</div>}>
      <TeamProfileContent teamId={teamId} />
    </Suspense>
  )
}