import type { Metadata } from 'next'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/server/db'
import { proposals } from '@propfreela/db'
import { count } from 'drizzle-orm'
import { FaqAccordion } from '@/components/landing/FaqAccordion'
import { FeatureCard } from '@/components/landing/FeatureCard'
import { StepCard } from '@/components/landing/StepCard'

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

function formatCount(n: number): string {
  if (n < 10) return String(n)
  if (n < 100) return `${Math.floor(n / 10) * 10}+`
  if (n < 1000) return `${Math.floor(n / 100) * 100}+`
  return `${(n / 1000).toFixed(1).replace('.0', '')}k+`
}

export default async function LandingPage() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  const [{ proposalCount } = { proposalCount: 0 }] = await db.select({ proposalCount: count() }).from(proposals)
  const proposalLabel = formatCount(proposalCount)

  return (
    <div className="min-h-screen bg-bg-base font-sans">

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border bg-bg-base/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="5" fill="#1A472A"/>
              <path d="M7 17V7h5.5a3.5 3.5 0 0 1 0 7H7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17" cy="15" r="1.5" fill="#fff" opacity="0.45"/>
            </svg>
            <span className="text-sm font-semibold tracking-tight text-fg-base">PropFreela</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hidden text-xs text-fg-muted transition-colors hover:text-fg-base sm:inline">
              Blog
            </Link>
            <Link href="/precos" className="text-xs text-fg-muted transition-colors hover:text-fg-base">
              Preços
            </Link>
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="inline-flex h-8 items-center rounded-md border border-border px-4 text-xs font-medium text-fg-base transition-colors hover:bg-bg-subtle"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-8 items-center rounded-md bg-accent px-4 text-xs font-semibold text-accent-fg shadow-sm transition-colors hover:bg-accent-hover"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <section className="relative mx-auto max-w-5xl overflow-hidden px-6 pb-16 pt-20">
          {/* Fundo decorativo */}
          <div aria-hidden="true" className="hero-glow pointer-events-none absolute inset-0" />
          <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* Coluna esquerda: texto */}
            <div>
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3 py-1.5">
                <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-medium text-accent">
                  {proposalCount >= 50
                    ? `${proposalLabel} propostas criadas por freelancers`
                    : 'Gratuito · Sem cartão de crédito'}
                </span>
              </div>

              <h1 className="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-fg-base lg:text-5xl">
                Feche mais projetos com propostas que{' '}
                <span className="relative inline-block text-accent">
                  impressionam.
                  <svg aria-hidden="true" className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 200 6" preserveAspectRatio="none">
                    <path d="M0 5 Q50 1 100 3 Q150 5 200 2" stroke="#1A472A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.35"/>
                  </svg>
                </span>
              </h1>

              <p className="mb-8 max-w-lg text-base leading-relaxed text-fg-muted">
                Crie propostas comerciais profissionais em PDF em menos de 2 minutos.
                Com IA que gera o escopo pra você.{' '}
                <strong className="font-medium text-fg-base">Grátis para começar.</strong>
              </p>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/login"
                  className="btn-shimmer inline-flex h-12 items-center justify-center gap-2 rounded-md bg-accent px-8 text-sm font-semibold text-accent-fg shadow-md transition-all hover:bg-accent-hover hover:shadow-lg"
                >
                  Criar minha primeira proposta
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>

                {/* Mini social proof */}
                <div className="flex items-center gap-2.5">
                  <div aria-hidden="true" className="flex -space-x-2">
                    {(['bg-[#7C9885]', 'bg-[#A08060]', 'bg-[#6B7FA3]'] as const).map((c, i) => (
                      <span
                        key={i}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full border-2 border-bg-base text-[10px] font-bold text-white ${c}`}
                      >
                        {['M', 'A', 'R'][i]}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-fg-muted">Grátis para começar</span>
                </div>
              </div>
            </div>

            {/* Coluna direita: mockup PDF com profundidade */}
            <div className="relative">
              {/* Folhas atrás — efeito de profundidade */}
              <div aria-hidden="true" className="absolute inset-x-6 -bottom-3 top-3 rounded-xl border border-border bg-bg-overlay shadow-[var(--shadow-card)]" />
              <div aria-hidden="true" className="absolute inset-x-3 -bottom-1.5 top-1.5 rounded-xl border border-border bg-bg-subtle shadow-[var(--shadow-card)]" />

              {/* Card principal */}
              <div className="relative space-y-4 rounded-xl border border-border bg-bg-base p-6 shadow-[var(--shadow-card-hover)] sm:p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">
                      Acme Corp
                    </p>
                    <p className="mt-1 text-lg font-light text-fg-base">
                      Website institucional — Proposta Comercial
                    </p>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted">Investimento</p>
                  <p className="font-mono text-2xl font-light text-accent">R$ 4.500,00</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-fg-muted">Escopo</p>
                  <p className="text-sm leading-relaxed text-fg-muted">
                    Desenvolvimento de website institucional responsivo com até 5 páginas, painel
                    administrativo para edição de conteúdo e integração com Google Analytics...
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-medium text-accent">
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    Aprovada
                  </span>
                  <span className="text-xs text-fg-muted">enviada 2 dias atrás</span>
                </div>
              </div>

              {/* Fade bottom */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-bg-base to-transparent" />
            </div>

          </div>
        </section>

        {/* ── Social proof bar ───────────────────────────────────── */}
        <section className="border-y border-border bg-bg-subtle">
          <div className="mx-auto max-w-5xl px-6 py-4">
            <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">

              {proposalCount >= 50 && (
                <>
                  <div className="flex items-center gap-2">
                    <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    <dt className="sr-only">Propostas criadas</dt>
                    <dd className="text-sm text-fg-muted">
                      <span className="font-mono font-semibold text-fg-base">{proposalLabel}</span>{' '}propostas criadas
                    </dd>
                  </div>
                  <span aria-hidden="true" className="h-4 w-px bg-border" />
                </>
              )}

              <div className="flex items-center gap-2">
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                <dt className="sr-only">Templates disponíveis</dt>
                <dd className="text-sm text-fg-muted">
                  <span className="font-mono font-semibold text-fg-base">5</span> templates profissionais
                </dd>
              </div>

              <span aria-hidden="true" className="hidden h-4 w-px bg-border sm:block" />

              <div className="hidden items-center gap-2 sm:flex">
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <dt className="sr-only">Custo de entrada</dt>
                <dd className="text-sm text-fg-muted">
                  <span className="font-mono font-semibold text-fg-base">Grátis</span> para começar
                </dd>
              </div>

            </dl>
          </div>
        </section>

        {/* ── Como funciona ───────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Como funciona
          </p>
          <h2 className="mb-14 text-center text-2xl font-semibold text-fg-base">
            Três passos. Dois minutos.
          </h2>

          <div className="relative grid gap-10 sm:grid-cols-3 sm:gap-8">
            {/* Linha conectora entre steps */}
            <div aria-hidden="true" className="absolute left-[calc(33.333%+24px)] right-[calc(33.333%+24px)] top-5 hidden border-t border-dashed border-accent/20 sm:block" />

            <StepCard
              number="01"
              title="Preencha os dados"
              description="Nome do cliente, valor, prazo e uma breve descrição do projeto. Simples assim."
              icon={
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              }
            />

            <StepCard
              number="02"
              title="IA gera o escopo"
              description="Nossa inteligência artificial cria um escopo profissional completo. Você pode editar o que quiser."
              icon={
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              }
            />

            <StepCard
              number="03"
              title="Baixe o PDF"
              description="Escolha um dos 5 templates, personalize com sua marca e baixe um PDF pronto para enviar."
              icon={
                <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              }
            />
          </div>
        </section>

        {/* ── Features grid ──────────────────────────────────────── */}
        <section className="relative border-t border-border">
          <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 bg-bg-subtle" />
          <div className="relative mx-auto max-w-5xl px-6 py-20">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Tudo que você precisa
            </p>
            <h2 className="mb-14 text-center text-3xl font-semibold text-fg-base">
              Feito para quem vive de freelance
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              <FeatureCard
                title="5 templates profissionais"
                description="Clean, Moderno, Bold, Minimal e Executivo. Todos cabem em uma página A4."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                }
              />

              <FeatureCard
                accent
                title="Escopo gerado por IA"
                description="Descreva o projeto em uma frase. A IA transforma em escopo detalhado e profissional."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                }
              />

              <FeatureCard
                title="PDF perfeito"
                description="Layout limpo, tipografia profissional. Seu cliente recebe algo que transmite confiança."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                  </svg>
                }
              />

              <FeatureCard
                title="Sua marca no PDF"
                description="Adicione sua logo e cor de destaque. Cada proposta sai com a cara do seu negócio."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r="2.5"/><path d="M17 6.5a4.5 4.5 0 0 1-9 0"/><path d="m3 17 2.5-2.5M5.5 14.5l3-3 4 4 3-3 3 3"/>
                  </svg>
                }
              />

              <FeatureCard
                title="Dashboard completo"
                description="Histórico de propostas, status, valores e filtros. Controle total das suas negociações."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                }
              />

              <FeatureCard
                title="Link de aprovação"
                description="Compartilhe um link. Seu cliente visualiza a proposta e aprova com um clique — sem criar conta."
                icon={
                  <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A472A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                }
              />

            </div>
          </div>
        </section>

        {/* ── Pricing ────────────────────────────────────────────── */}
        <section className="mx-auto max-w-5xl px-6 py-24">
          <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Planos
          </p>
          <h2 className="mb-3 text-center text-2xl font-semibold text-fg-base">
            Simples e transparente
          </h2>
          <p className="mb-16 text-center text-sm text-fg-muted">
            Sem contrato. Cancele quando quiser.
          </p>

          <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">

            {/* Free */}
            <div className="rounded-xl border border-border p-8">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-fg-muted">
                Gratuito
              </p>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="font-mono text-3xl font-semibold text-fg-base">R$0</span>
                <span className="text-xs text-fg-muted">para sempre</span>
              </div>
              <ul className="mb-8 space-y-2.5">
                {[
                  '3 propostas por mês',
                  '5 templates de PDF',
                  'Geração de escopo com IA',
                  'Histórico completo',
                  'PDF com watermark PropFreela',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                    <span aria-hidden="true" className="mt-0.5 text-accent">&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className="inline-flex h-10 w-full items-center justify-center rounded-md border border-border text-sm font-medium text-fg-base transition-colors hover:bg-bg-subtle"
              >
                Começar grátis
              </Link>
            </div>

            {/* Pro */}
            <div
              className="relative rounded-xl border border-accent/40 p-8 shadow-[var(--shadow-card-hover)]"
              style={{ background: 'linear-gradient(145deg, #F7F6F3 0%, color-mix(in srgb, #1A472A 5%, #F7F6F3) 100%)' }}
            >
              {/* Badge "Mais popular" no topo */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent px-3 py-1 text-[11px] font-semibold text-accent-fg shadow-md">
                  <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Mais popular
                </span>
              </div>

              <p className="mb-1 text-xs font-bold uppercase tracking-[0.12em] text-accent">Pro</p>
              <div className="mb-2 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-bold text-fg-base">R$29</span>
                <span className="text-xs text-fg-muted">/ mês</span>
              </div>

              {/* Badge de economia */}
              <div className="mb-6 inline-flex items-center gap-1.5 rounded-full bg-[#FEF3C7] px-2.5 py-1 text-[11px] font-semibold text-[#92400E]">
                <svg aria-hidden="true" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Economize 44% — R$197/ano
              </div>

              <ul className="mb-8 space-y-2.5">
                {['5 templates de PDF', 'Geração de escopo com IA', 'Histórico completo'].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                    <span aria-hidden="true" className="mt-0.5 text-accent">&#10003;</span>
                    {f}
                  </li>
                ))}
                {[
                  'Propostas ilimitadas',
                  'PDF sem watermark',
                  'Sua logo no PDF',
                  'Cor de destaque personalizada',
                  'Suporte por email',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm font-medium text-fg-base">
                    <span aria-hidden="true" className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-accent/15 text-[10px] text-accent">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/login"
                className="btn-shimmer inline-flex h-11 w-full items-center justify-center rounded-lg bg-accent text-sm font-semibold text-accent-fg shadow-md transition-all hover:bg-accent-hover hover:shadow-lg"
              >
                Assinar Pro agora
              </Link>
            </div>

          </div>

          {/* Reassurance bullets */}
          <div className="mx-auto mt-8 flex max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { icon: '🔒', text: 'Pagamento seguro via Stripe' },
              { icon: '↩', text: 'Cancele quando quiser' },
              { icon: '⚡', text: 'Acesso imediato após assinar' },
            ].map(({ icon, text }) => (
              <p key={text} className="flex items-center gap-1.5 text-xs text-fg-muted">
                <span aria-hidden="true">{icon}</span>{text}
              </p>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="border-t border-border bg-bg-subtle">
          <div className="mx-auto max-w-2xl px-6 py-20">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-accent">
              FAQ
            </p>
            <h2 className="mb-12 text-center text-3xl font-semibold text-fg-base">
              Dúvidas frequentes
            </h2>
            <FaqAccordion />
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────── */}
        <section
          className="relative overflow-hidden bg-accent"
          style={{
            backgroundImage: [
              'radial-gradient(ellipse 80% 50% at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 60%)',
              'radial-gradient(ellipse 55% 80% at 80% 20%, rgba(255,255,255,0.04) 0%, transparent 50%)',
            ].join(', '),
          }}
        >
          {/* Noise overlay */}
          <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-60" />
          {/* Círculos decorativos */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border border-white/5" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full border border-white/5" />

          <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
            {/* Mini stats */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <span className="text-sm text-accent-fg/70">
                <span className="font-mono font-bold text-accent-fg">2 min</span> para criar
              </span>
              <span aria-hidden="true" className="text-accent-fg/30">·</span>
              <span className="text-sm text-accent-fg/70">
                <span className="font-mono font-bold text-accent-fg">100%</span> grátis para começar
              </span>
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-accent-fg lg:text-4xl">
              Pronto para impressionar seus clientes?
            </h2>
            <p className="mb-10 text-sm leading-relaxed text-accent-fg/70">
              Crie sua primeira proposta em menos de 2 minutos.
              Sem cartão, sem complicação.
            </p>
            <Link
              href="/login"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-bg-base px-10 text-sm font-bold text-accent shadow-lg transition-all hover:-translate-y-0.5 hover:bg-bg-subtle hover:shadow-xl"
            >
              Criar proposta agora — é grátis
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <p className="mt-4 text-xs text-accent-fg/45">Sem cartão de crédito necessário</p>
          </div>
        </section>

        {/* ── SEO links ──────────────────────────────────────────── */}
        <section className="border-t border-border">
          <div className="mx-auto max-w-5xl px-6 py-12">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-fg-muted">
              Recursos
            </p>
            <div className="flex gap-6">
              <Link
                href="/blog/como-fazer-proposta-comercial-freelancer"
                className="text-sm text-fg-muted transition-colors hover:text-fg-base"
              >
                Como fazer uma proposta comercial &rarr;
              </Link>
              <Link
                href="/blog/modelos-proposta-comercial-freelancer"
                className="text-sm text-fg-muted transition-colors hover:text-fg-base"
              >
                Modelos de proposta para freelancer &rarr;
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="5" fill="#1A472A"/>
              <path d="M7 17V7h5.5a3.5 3.5 0 0 1 0 7H7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="17" cy="15" r="1.5" fill="#fff" opacity="0.45"/>
            </svg>
            <p className="text-xs text-fg-muted">
              &copy; {new Date().getFullYear()} PropFreela. Feito para freelancers brasileiros.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/termos-de-uso" className="text-xs text-fg-muted hover:text-fg-base">
              Termos de uso
            </Link>
            <Link href="/privacidade" className="text-xs text-fg-muted hover:text-fg-base">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
