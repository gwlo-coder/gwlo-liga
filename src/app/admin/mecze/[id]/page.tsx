import { Suspense } from 'react'
import AdminMatchEditClient from './AdminMatchDetailContent'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  return (
    <Suspense fallback={<div className="p-6 text-center text-slate-500">Ładowanie...</div>}>
      <AdminMatchEditClient id={resolvedParams.id} />
    </Suspense>
  )
}