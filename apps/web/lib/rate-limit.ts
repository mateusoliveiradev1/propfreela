/**
 * Simple in-memory rate limiter.
 * For production at scale, replace with Upstash Redis (@upstash/ratelimit).
 */

const store = new Map<string, { count: number; resetAt: number }>()

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, val] of store) {
      if (val.resetAt < now) store.delete(key)
    }
  }, 5 * 60 * 1000)
}

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): { success: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count }
}
