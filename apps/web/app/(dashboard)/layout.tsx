import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/layout/DashboardNav'
import { AutoRefresh } from '@/components/layout/AutoRefresh'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen">
      <DashboardNav
        user={{
          id: session.user.id,
          name: session.user.name ?? '',
          email: session.user.email ?? '',
          image: session.user.image ?? null,
          role: session.user.role ?? 'user',
        }}
      />
      {/* pt-14 compensates for the fixed mobile top bar (h-14) */}
      <main className="min-w-0 flex-1 pt-14 md:pt-0">
        {children}
      </main>
      <AutoRefresh />
    </div>
  )
}
