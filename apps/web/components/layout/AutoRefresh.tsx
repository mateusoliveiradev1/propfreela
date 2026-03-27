'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

// Silently re-fetches all Server Components in the current route
// without a full page reload. Default: every 30 seconds.
export function AutoRefresh({ intervalMs = 30_000 }: { intervalMs?: number }) {
  const router = useRouter()

  useEffect(() => {
    const id = setInterval(() => router.refresh(), intervalMs)
    return () => clearInterval(id)
  }, [router, intervalMs])

  return null
}
