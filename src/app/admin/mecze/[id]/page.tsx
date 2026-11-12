import { Suspense } from 'react'
import AdminMatchEditClient from './AdminMatchDetailContent'

export async function generateStaticParams() {
  return []
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const matchIdNum = parseInt(resolvedParams.id, 10);

  return (
    <Suspense fallback={<div className="p-6 text-center text-slate-500 font-medium">Ładowanie edycji meczu...</div>}>
      <AdminMatchEditClient matchId={matchIdNum} />
    </Suspense>
  )
}