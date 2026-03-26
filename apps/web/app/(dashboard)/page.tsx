// Este arquivo existe apenas para evitar conflito de rota com app/page.tsx (landing).
// O dashboard real está em app/(dashboard)/dashboard/page.tsx → /dashboard
import { redirect } from 'next/navigation'

export default function DashboardGroupRoot() {
  redirect('/dashboard')
}
