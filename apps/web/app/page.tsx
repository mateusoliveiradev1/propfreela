import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/server/db'
import { proposals } from '@propfreela/db'
import { count } from 'drizzle-orm'
import { FaqAccordion } from '@/components/landing/FaqAccordion'

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
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-accent text-[10px] font-bold text-accent-fg">
              P
            </div>
            <span className="text-sm font-medium tracking-tight text-fg-base">PropFreela</span>
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
                className="inline-flex h-8 items-center rounded-sm border border-border px-4 text-xs font-medium text-fg-base transition-colors hover:bg-bg-subtle"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex h-8 items-center rounded-sm bg-accent px-4 text-xs font-medium text-accent-fg shadow-sm transition-colors hover:bg-accent-hover"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-24 pt-24">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs text-fg-muted">
              {proposalCount >= 50 ? `${proposalLabel} propostas criadas por freelancers` : 'Para freelancers brasileiros'}
            </span>
          </div>
          <h1 className="mb-6 text-5xl font-normal leading-[1.1] text-fg-base">
            Feche mais projetos com propostas que{' '}
            <span className="text-accent">impressionam.</span>
          </h1>
          <p className="mb-10 max-w-lg text-base leading-relaxed text-fg-muted">
            Crie propostas comerciais profissionais em PDF em menos de 2 minutos.
            Com IA que gera o escopo pra você. Grátis para começar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-accent px-8 text-sm font-medium text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-md"
            >
              Criar minha primeira proposta
            </Link>
            <span className="text-xs text-fg-muted">Grátis, sem cartão de crédito</span>
          </div>
        </div>

        {/* PDF mockup */}
        <div className="relative mt-16 overflow-hidden rounded-sm border border-border bg-bg-subtle p-6 sm:p-8">
          <div className="mx-auto max-w-lg space-y-4 rounded-sm border border-border bg-bg-base p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
                  Acme Corp
                </p>
                <p className="mt-1 text-xl font-light text-fg-base">
                  Website institucional — Proposta Comercial
                </p>
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-accent text-xs font-bold text-accent-fg">
                P
              </div>
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
                Desenvolvimento de website institucional responsivo com ate 5 paginas, painel
                administrativo para edicao de conteudo e integracao com Google Analytics...
              </p>
            </div>
          </div>
          {/* Fade bottom */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg-subtle to-transparent" />
        </div>
      </section>

      {/* ── Social proof bar ───────────────────────────────────── */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-6 px-6 py-5 text-sm text-fg-muted">
          <span>
            {proposalCount >= 50
              ? <><span className="font-mono font-medium text-accent">{proposalLabel}</span> propostas criadas</>
              : <span>Grátis para começar</span>
            }
          </span>
          <span aria-hidden="true" className="text-border">·</span>
          <span>
            <span className="font-mono font-medium text-fg-base">5</span> templates profissionais
          </span>
          <span aria-hidden="true" className="hidden text-border sm:inline">·</span>
          <span className="hidden sm:inline">Gratis para comecar</span>
        </div>
      </section>

      {/* ── Como funciona (3 steps) ────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Como funciona
        </p>
        <h2 className="mb-14 text-center text-2xl font-medium text-fg-base">
          Tres passos. Dois minutos.
        </h2>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          <Step number="01" title="Preencha os dados" description="Nome do cliente, valor, prazo e uma breve descricao do projeto. Simples assim." />
          <Step number="02" title="IA gera o escopo" description="Nossa inteligencia artificial cria um escopo profissional completo. Voce pode editar o que quiser." />
          <Step number="03" title="Baixe o PDF" description="Escolha um dos 5 templates, personalize com sua marca e baixe um PDF pronto para enviar." />
        </div>
      </section>

      {/* ── Features grid (6) ──────────────────────────────────── */}
      <section className="border-t border-border bg-bg-subtle">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Tudo que voce precisa
          </p>
          <h2 className="mb-14 text-center text-3xl font-normal text-fg-base">
            Feito para quem vive de freelance
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              image="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&q=80&auto=format"
              title="5 templates profissionais"
              description="Clean, Moderno, Bold, Minimal e Executivo. Todos cabem em uma pagina A4."
            />
            <Feature
              image="https://images.unsplash.com/photo-1745674684468-b9fc392fda3f?w=600&q=80&auto=format"
              title="Escopo gerado por IA"
              description="Descreva o projeto em uma frase. A IA transforma em escopo detalhado e profissional."
            />
            <Feature
              image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80&auto=format"
              title="PDF perfeito"
              description="Layout limpo, tipografia profissional. Seu cliente recebe algo que transmite confianca."
            />
            <Feature
              image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80&auto=format"
              title="Sua marca no PDF"
              description="Adicione sua logo e cor de destaque. Cada proposta sai com a cara do seu negocio."
            />
            <Feature
              image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80&auto=format"
              title="Dashboard completo"
              description="Historico de propostas, status, valores e filtros. Tenha controle total das suas negociacoes."
            />
            <Feature
              image="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&q=80&auto=format"
              title="Link de aprovacao"
              description="Compartilhe um link. Seu cliente visualiza a proposta e aprova com um clique — sem criar conta."
            />
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Planos
        </p>
        <h2 className="mb-4 text-center text-2xl font-medium text-fg-base">
          Simples e transparente
        </h2>
        <p className="mb-14 text-center text-sm text-fg-muted">
          Sem contrato. Cancele quando quiser.
        </p>

        <div className="mx-auto grid max-w-2xl gap-6 sm:grid-cols-2">
          {/* Free */}
          <div className="rounded-sm border border-border p-8">
            <p className="mb-1 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
              Gratuito
            </p>
            <div className="mb-6 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-light text-fg-base">R$0</span>
              <span className="text-xs text-fg-muted">para sempre</span>
            </div>
            <ul className="mb-8 space-y-2">
              {[
                '3 propostas por mes',
                '5 templates de PDF',
                'Geracao de escopo com IA',
                'Historico completo',
                'PDF com watermark PropFreela',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center rounded-sm border border-border text-sm text-fg-base transition-colors hover:bg-bg-subtle"
            >
              Comecar gratis
            </Link>
          </div>

          {/* Pro */}
          <div className="rounded-sm border-2 border-accent p-8 shadow-[var(--shadow-card)]">
            <div className="mb-1 flex items-center gap-2">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-accent">Pro</p>
              <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-fg">
                Popular
              </span>
            </div>
            <div className="mb-1 flex items-baseline gap-1">
              <span className="font-mono text-3xl font-light text-fg-base">R$29</span>
              <span className="text-xs text-fg-muted">por mes</span>
            </div>
            <p className="mb-6 text-xs text-fg-muted">ou R$197/ano — economize 44%</p>
            <ul className="mb-8 space-y-2">
              {[
                'Propostas ilimitadas',
                '5 templates de PDF',
                'Geracao de escopo com IA',
                'PDF sem watermark',
                'Sua logo no PDF',
                'Cor de destaque personalizada',
                'Suporte por email',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-fg-muted">
                  <span className="mt-0.5 text-accent">&#10003;</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/login"
              className="inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg shadow-sm transition-all hover:bg-accent-hover hover:shadow-md"
            >
              Assinar Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-16">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Perguntas frequentes
          </p>
          <h2 className="mb-10 text-center text-2xl font-normal text-fg-base">
            Tire suas duvidas
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section
        className="bg-accent"
        style={{ backgroundImage: 'radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)' }}
      >
        <div className="mx-auto max-w-5xl px-6 py-20 text-center">
          <h2 className="mb-4 text-3xl font-medium text-accent-fg">
            Pronto para impressionar seus clientes?
          </h2>
          <p className="mb-8 text-sm text-accent-fg/70">
            Crie sua primeira proposta em menos de 2 minutos. Gratis, sem cartao.
          </p>
          <Link
            href="/login"
            className="inline-flex h-12 items-center rounded-sm bg-bg-base px-8 text-sm font-medium text-accent shadow-sm transition-all hover:bg-bg-subtle hover:shadow-md"
          >
            Comecar agora — e gratis
          </Link>
        </div>
      </section>

      {/* ── SEO links ──────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
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

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-muted">
            &copy; {new Date().getFullYear()} PropFreela. Feito para freelancers brasileiros.
          </p>
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

/* ── Sub-components ─────────────────────────────────────────────── */

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div>
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full border border-accent/30 bg-accent/5 font-mono text-sm text-accent">
        {number}
      </div>
      <p className="mb-2 text-sm font-medium text-fg-base">{title}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}

function Feature({ image, title, description }: { image: string; title: string; description: string }) {
  return (
    <div className="group relative h-52 overflow-hidden rounded-sm shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
      <Image
        src={image}
        alt=""
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0B]/85 via-[#0D0D0B]/40 to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <p className="mb-1 text-sm font-medium text-white">{title}</p>
        <p className="text-xs leading-relaxed text-white/70">{description}</p>
      </div>
    </div>
  )
}
