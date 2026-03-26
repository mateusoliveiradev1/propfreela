import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PropFreela — Propostas comerciais profissionais para freelancers',
  description:
    'Crie propostas comerciais em PDF em minutos. Sem Word, sem complicação. Perfeito para freelancers brasileiros que querem impressionar clientes.',
  openGraph: {
    title: 'PropFreela — Propostas comerciais profissionais para freelancers',
    description:
      'Crie propostas comerciais em PDF em minutos. Plano gratuito disponível.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base font-sans">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-sm font-medium tracking-tight text-fg-base">PropFreela</span>
          <div className="flex items-center gap-6">
            <Link href="/precos" className="text-xs text-fg-muted hover:text-fg-base">
              Preços
            </Link>
            <Link
              href="/login"
              className="inline-flex h-8 items-center rounded-sm bg-accent px-4 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Entrar
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Para freelancers brasileiros
          </p>
          <h1 className="mb-6 text-5xl font-light leading-tight text-fg-base">
            Propostas comerciais profissionais em minutos.
            <br />
            <span className="text-accent">Sem Word. Sem complicação.</span>
          </h1>
          <p className="mb-10 text-base leading-relaxed text-fg-muted">
            Crie, personalize e baixe propostas em PDF com sua marca. Impressione seus clientes
            antes mesmo de começar o projeto. Grátis para começar.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Começar grátis — sem cartão
            </Link>
            <Link href="/precos" className="text-sm text-fg-muted hover:text-fg-base">
              Ver planos →
            </Link>
          </div>
        </div>

        {/* PDF mockup */}
        <div className="mt-16 rounded-sm border border-border bg-bg-subtle p-8">
          <div className="mx-auto max-w-lg space-y-4 rounded-sm border border-border bg-bg-base p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
                  Acme Corp
                </p>
                <p className="mt-1 text-xl font-light text-fg-base">
                  Website institucional — Proposta Comercial
                </p>
              </div>
              <div className="h-8 w-8 rounded-sm bg-accent" />
            </div>
            <div className="h-px bg-border" />
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Investimento
              </p>
              <p className="font-mono text-2xl font-light text-accent">R$ 4.500,00</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Escopo
              </p>
              <p className="text-sm leading-relaxed text-fg-muted">
                Desenvolvimento de website institucional responsivo com até 5 páginas, painel
                administrativo para edição de conteúdo e integração com Google Analytics...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-bg-subtle">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid grid-cols-3 gap-12">
            <Feature
              label="PDF profissional"
              description="Dois templates cuidadosamente desenhados. Sua logo, sua cor de destaque, seu nome. Sem watermark no plano Pro."
            />
            <Feature
              label="Tudo organizado"
              description="Histórico completo de propostas. Status, valores, datas. Saiba exatamente onde cada negociação está."
            />
            <Feature
              label="Rápido de verdade"
              description="Preencha o formulário, baixe o PDF. Sem curva de aprendizado, sem tutorial necessário."
            />
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="grid grid-cols-2 gap-6">
          <PricingCard
            plan="Gratuito"
            price="R$0"
            period="para sempre"
            features={[
              '3 propostas por mês',
              'PDF com watermark PropFreela',
              '2 templates incluídos',
              'Histórico completo',
            ]}
            cta="Começar grátis"
            ctaHref="/login"
            variant="ghost"
          />
          <PricingCard
            plan="Pro"
            price="R$29"
            period="por mês"
            yearlyNote="ou R$197/ano (economize 44%)"
            features={[
              'Propostas ilimitadas',
              'PDF sem watermark',
              'Sua logo no PDF',
              'Cor de destaque personalizada',
              'Suporte por email',
            ]}
            cta="Assinar Pro"
            ctaHref="/login"
            variant="primary"
          />
        </div>
      </section>

      {/* SEO links */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Recursos
          </p>
          <div className="flex gap-6">
            <Link
              href="/blog/como-fazer-proposta-comercial-freelancer"
              className="text-sm text-fg-muted hover:text-fg-base"
            >
              Como fazer uma proposta comercial →
            </Link>
            <Link
              href="/blog/modelos-proposta-comercial-freelancer"
              className="text-sm text-fg-muted hover:text-fg-base"
            >
              Modelos de proposta para freelancer →
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <p className="text-xs text-fg-placeholder">
            © {new Date().getFullYear()} PropFreela. Feito para freelancers brasileiros.
          </p>
        </div>
      </footer>
    </div>
  )
}

function Feature({ label, description }: { label: string; description: string }) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium text-fg-base">{label}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}

function PricingCard({
  plan,
  price,
  period,
  yearlyNote,
  features,
  cta,
  ctaHref,
  variant,
}: {
  plan: string
  price: string
  period: string
  yearlyNote?: string
  features: string[]
  cta: string
  ctaHref: string
  variant: 'primary' | 'ghost'
}) {
  return (
    <div className="rounded-sm border border-border p-8">
      <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
        {plan}
      </p>
      <div className="mb-1 flex items-baseline gap-1">
        <span className="font-mono text-3xl font-light text-fg-base">{price}</span>
        <span className="text-xs text-fg-muted">{period}</span>
      </div>
      {yearlyNote && (
        <p className="mb-6 text-xs text-fg-placeholder">{yearlyNote}</p>
      )}
      <ul className="mb-8 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
            <span className="mt-0.5 text-accent">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href={ctaHref}
        className={
          variant === 'primary'
            ? 'inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover'
            : 'inline-flex h-10 w-full items-center justify-center rounded-sm border border-border text-sm text-fg-base transition-colors hover:bg-bg-subtle'
        }
      >
        {cta}
      </Link>
    </div>
  )
}
