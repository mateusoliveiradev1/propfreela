import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PREFIXES = ['/dashboard', '/nova-proposta', '/propostas', '/configuracoes', '/admin']

export default auth((req: NextRequest & { auth: unknown }) => {
  const { pathname } = req.nextUrl
  const session = (req as { auth: { user?: { id: string } } | null }).auth

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))

  if (isProtected && !session?.user?.id) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if ((pathname === '/login' || pathname === '/cadastro') && session?.user?.id) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth|api/webhooks).*)',
  ],
}
