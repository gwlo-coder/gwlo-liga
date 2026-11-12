import { Suspense } from 'react'
import AdminMatchEditClient from './AdminMatchDetailContent'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const matchIdNum = parseInt(resolvedParams.id, 10);
  
  return (
    <Suspense fallback={<div className="p-6 text-center text-slate-500">Ładowanie...</div>}>
      <AdminMatchEditClient matchId={matchIdNum} />
    </Suspense>
  )
}