export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import AdminMatchEditClient from './AdminMatchDetailContent'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-500">Ładowanie panelu edycji...</div>}>
      <AdminMatchEditClient matchId={parseInt(resolvedParams.id)} />
    </Suspense>
  )
}