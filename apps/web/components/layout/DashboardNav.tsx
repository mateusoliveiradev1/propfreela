'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { cn } from '@propfreela/ui'

export type NavUser = {
  id: string
  name: string
  email: string
  image?: string | null
  role: 'user' | 'admin'
}

// ─── Inline SVG Icons ────────────────────────────────────────────────────────

function HomeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

function FileTextIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function LogOutIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

// ─── Nav Links ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { href: '/dashboard', label: 'Início', Icon: HomeIcon },
  { href: '/nova-proposta', label: 'Nova proposta', Icon: PlusIcon },
  { href: '/propostas', label: 'Propostas', Icon: FileTextIcon },
  { href: '/configuracoes', label: 'Configurações', Icon: SettingsIcon },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function DashboardNav({ user }: { user: NavUser }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (href: string) =>
    pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`))

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────────────────────── */}
      <div className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-bg-base px-4 md:hidden">
        <Image src="/logo.svg" alt="PropFreela" width={120} height={28} priority />
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-sm p-1.5 text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg-base"
          aria-label="Abrir menu"
        >
          <MenuIcon />
        </button>
      </div>

      {/* ── Mobile overlay ─────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-bg-base px-4 py-8 transition-transform duration-200 ease-in-out',
          'md:relative md:z-auto md:w-56 md:translate-x-0 md:transition-none',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Close button — mobile only */}
        <button
          className="absolute right-3 top-3 rounded-sm p-1.5 text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg-base md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
        >
          <XIcon />
        </button>

        {/* Brand */}
        <div className="mb-10 px-2">
          <Image src="/logo.svg" alt="PropFreela" width={120} height={28} priority />
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-0.5">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors',
                isActive(href)
                  ? 'bg-bg-overlay font-medium text-fg-base'
                  : 'text-fg-muted hover:bg-bg-subtle hover:text-fg-base',
              )}
            >
              <Icon />
              {label}
            </Link>
          ))}

          {user.role === 'admin' && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className={cn(
                'mt-1 flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors',
                pathname.startsWith('/admin')
                  ? 'bg-bg-overlay font-medium text-fg-base'
                  : 'text-fg-muted hover:bg-bg-subtle hover:text-fg-base',
              )}
            >
              <ShieldIcon />
              Admin
            </Link>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center gap-3 px-2 py-2">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="h-7 w-7 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-bg-overlay text-xs font-medium text-fg-muted">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-fg-base">{user.name}</p>
              {user.role === 'admin' && (
                <p className="text-[10px] text-accent">Admin</p>
              )}
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-xs text-fg-muted transition-colors hover:bg-bg-subtle hover:text-fg-base"
          >
            <LogOutIcon />
            Sair da conta
          </button>
        </div>
      </aside>
    </>
  )
}
