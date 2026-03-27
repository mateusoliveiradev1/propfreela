import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { CheckoutButton } from '@/components/billing/CheckoutButton'

export const metadata: Metadata = {
  title: 'Preços — PropFreela',
  description:
    'Plano gratuito com 3 propostas por mês ou Pro com propostas ilimitadas por R$29/mês. Sem compromisso, cancele quando quiser.',
  openGraph: {
    title: 'Preços — PropFreela',
    description: 'Gratuito para começar. Pro por R$29/mês.',
    locale: 'pt_BR',
  },
}

export default async function PrecosPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-bg-base">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-medium tracking-tight text-fg-base">
            PropFreela
          </Link>
          <Link
            href="/login"
            className="inline-flex h-8 items-center rounded-sm bg-accent px-4 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Entrar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Planos
          </p>
          <h1 className="text-4xl font-light text-fg-base">
            Simples e transparente
          </h1>
          <p className="mt-4 text-sm text-fg-muted">
            Sem contrato. Cancele quando quiser.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-2 gap-6">
          {/* Free */}
          <div className="rounded-sm border border-border p-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
              Gratuito
            </p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-light text-fg-base">R$0</span>
              <span className="text-xs text-fg-muted">para sempre</span>
            </div>
            <ul className="mb-8 space-y-3">
              {[
                '3 propostas por mês',
                '5 templates de PDF',
                'Geração de escopo com IA',
                'Histórico completo',
                'Editar e duplicar propostas',
                'PDF com watermark PropFreela',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-0.5 text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center rounded-sm border border-border text-sm text-fg-base transition-colors hover:bg-bg-subtle"
            >
              Começar grátis
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-sm border border-accent bg-bg-subtle p-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-accent">
              Pro
            </p>
            <div className="mb-1 flex items-baseline gap-1">
              <span className="font-mono text-4xl font-light text-fg-base">R$29</span>
              <span className="text-xs text-fg-muted">por mês</span>
            </div>
            <p className="mb-6 text-xs text-fg-placeholder">ou R$197/ano — economize 44%</p>
            <ul className="mb-8 space-y-3">
              {[
                'Propostas ilimitadas',
                '5 templates de PDF',
                'Geração de escopo com IA',
                'Histórico completo',
                'Editar e duplicar propostas',
                'PDF sem watermark',
                'Sua logo no PDF',
                'Cor de destaque personalizada',
                'Suporte por email',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-0.5 text-accent">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            {isLoggedIn ? (
              <CheckoutButton />
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
              >
                Assinar Pro
              </Link>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-fg-placeholder">
            Pagamento seguro via Stripe. Cancele a qualquer momento direto nas configurações.
          </p>
        </div>
      </main>
    </div>
  )
}
