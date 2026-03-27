import type { Metadata } from 'next'
import Link from 'next/link'
import { signIn } from '@/auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* ── Coluna esquerda — social proof (desktop only) ───────────────────── */}
      <div className="hidden flex-col justify-between bg-accent px-12 py-12 lg:flex">
        {/* Logo mark */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-white/20 text-xs font-bold text-white">
            P
          </div>
          <span className="text-sm font-medium text-white/90">PropFreela</span>
        </div>

        {/* Headline + bullets */}
        <div>
          <h2 className="text-3xl font-normal leading-snug text-white">
            Propostas que<br />fecham projetos.
          </h2>
          <ul className="mt-8 space-y-3.5">
            {[
              'PDF profissional em menos de 2 minutos',
              'Escopo gerado por IA — você só revisa',
              'Cliente aprova com um clique, sem criar conta',
              '5 templates projetados por designers',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-white/75">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-white/60"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <div className="space-y-2">
          <p className="text-sm italic leading-relaxed text-white/60">
            "Fechei 3 projetos no primeiro mês. Meus clientes adoram receber uma proposta tão profissional."
          </p>
          <p className="text-xs text-white/40">— Freelancer de desenvolvimento web</p>
        </div>
      </div>

      {/* ── Coluna direita — formulário ─────────────────────────────────────── */}
      <div className="flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm space-y-10">
          {/* Brand */}
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
              PropFreela
            </p>
            <h1 className="text-3xl font-light tracking-tight text-fg-base">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-fg-muted">
              Crie propostas profissionais em minutos.
            </p>
          </div>

          {/* Sign in form */}
          <form
            action={async () => {
              'use server'
              const params = await searchParams
              await signIn('google', {
                redirectTo: params.callbackUrl ?? '/dashboard',
              })
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-sm border border-border bg-bg-base px-4 py-3 text-sm font-medium text-fg-base transition-colors hover:bg-bg-subtle active:bg-bg-overlay"
            >
              <GoogleIcon />
              Entrar com Google
            </button>
          </form>

          <p className="text-center text-xs text-fg-placeholder">
            Ao entrar você concorda com os{' '}
            <Link href="/termos-de-uso" className="underline hover:text-fg-muted">
              termos de uso
            </Link>{' '}
            e a{' '}
            <Link href="/privacidade" className="underline hover:text-fg-muted">
              política de privacidade
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  )
}
