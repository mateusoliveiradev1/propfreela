import type { Metadata } from 'next'
import Link from 'next/link'
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

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-base font-sans">
      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <span className="text-sm font-medium tracking-tight text-fg-base">PropFreela</span>
          <div className="flex items-center gap-6">
            <Link href="/blog" className="hidden text-xs text-fg-muted hover:text-fg-base sm:inline">
              Blog
            </Link>
            <Link href="/precos" className="text-xs text-fg-muted hover:text-fg-base">
              Precos
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

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 pb-20 pt-20">
        <div className="max-w-2xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="text-xs text-fg-muted">+500 propostas criadas por freelancers</span>
          </div>
          <h1 className="mb-6 text-5xl font-light leading-[1.1] text-fg-base">
            Feche mais projetos com propostas que{' '}
            <span className="text-accent">impressionam.</span>
          </h1>
          <p className="mb-10 max-w-lg text-base leading-relaxed text-fg-muted">
            Crie propostas comerciais profissionais em PDF em menos de 2 minutos.
            Com IA que gera o escopo pra voce. Gratis para comecar.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/login"
              className="inline-flex h-12 items-center justify-center rounded-sm bg-accent px-8 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar minha primeira proposta
            </Link>
            <span className="text-xs text-fg-placeholder">Gratis, sem cartao de credito</span>
          </div>
        </div>

        {/* PDF mockup */}
        <div className="mt-16 rounded-sm border border-border bg-bg-subtle p-6 sm:p-8">
          <div className="mx-auto max-w-lg space-y-4 rounded-sm border border-border bg-bg-base p-6 sm:p-8">
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
                Desenvolvimento de website institucional responsivo com ate 5 paginas, painel
                administrativo para edicao de conteudo e integracao com Google Analytics...
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Social proof bar ───────────────────────────────────── */}
      <section className="border-y border-border bg-bg-subtle">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 px-6 py-6 sm:justify-between">
          <Stat value="500+" label="propostas criadas" />
          <Stat value="5" label="templates profissionais" />
          <Stat value="< 2 min" label="para gerar um PDF" />
          <Stat value="R$0" label="para comecar" />
        </div>
      </section>

      {/* ── Como funciona (3 steps) ────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Como funciona
        </p>
        <h2 className="mb-14 text-center text-3xl font-light text-fg-base">
          Tres passos. Dois minutos.
        </h2>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          <Step
            number="01"
            title="Preencha os dados"
            description="Nome do cliente, valor, prazo e uma breve descricao do projeto. Simples assim."
          />
          <Step
            number="02"
            title="IA gera o escopo"
            description="Nossa inteligencia artificial cria um escopo profissional completo. Voce pode editar o que quiser."
          />
          <Step
            number="03"
            title="Baixe o PDF"
            description="Escolha um dos 5 templates, personalize com sua marca e baixe um PDF pronto para enviar."
          />
        </div>
      </section>

      {/* ── Features grid (6) ──────────────────────────────────── */}
      <section className="border-t border-border bg-bg-subtle">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Tudo que voce precisa
          </p>
          <h2 className="mb-14 text-center text-3xl font-light text-fg-base">
            Feito para quem vive de freelance
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Feature
              icon="&#9998;"
              title="5 templates profissionais"
              description="Clean, Moderno, Bold, Minimal e Executivo. Todos cabem em uma pagina A4."
            />
            <Feature
              icon="&#9889;"
              title="Escopo gerado por IA"
              description="Descreva o projeto em uma frase. A IA transforma em escopo detalhado e profissional."
            />
            <Feature
              icon="&#128196;"
              title="PDF perfeito"
              description="Layout limpo, tipografia profissional. Seu cliente recebe algo que transmite confianca."
            />
            <Feature
              icon="&#127912;"
              title="Sua marca no PDF"
              description="Adicione sua logo e cor de destaque. Cada proposta sai com a cara do seu negocio."
            />
            <Feature
              icon="&#128202;"
              title="Dashboard completo"
              description="Historico de propostas, status, valores e filtros. Tenha controle total das suas negociacoes."
            />
            <Feature
              icon="&#128279;"
              title="Link de aprovacao"
              description="Compartilhe um link. Seu cliente visualiza a proposta e aprova com um clique — sem criar conta."
            />
          </div>
        </div>
      </section>

      {/* ── Pricing ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Planos
        </p>
        <h2 className="mb-4 text-center text-3xl font-light text-fg-base">
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
          <div className="rounded-sm border-2 border-accent p-8">
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
            <p className="mb-6 text-xs text-fg-placeholder">ou R$197/ano — economize 44%</p>
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
              className="inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Assinar Pro
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Perguntas frequentes
          </p>
          <h2 className="mb-10 text-center text-3xl font-light text-fg-base">
            Tire suas duvidas
          </h2>
          <FaqAccordion />
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section className="bg-accent">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <h2 className="mb-4 text-3xl font-light text-accent-fg">
            Pronto para impressionar seus clientes?
          </h2>
          <p className="mb-8 text-sm text-accent-fg/70">
            Crie sua primeira proposta em menos de 2 minutos. Gratis, sem cartao.
          </p>
          <Link
            href="/login"
            className="inline-flex h-12 items-center rounded-sm bg-bg-base px-8 text-sm font-medium text-accent transition-colors hover:bg-bg-subtle"
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
              className="text-sm text-fg-muted hover:text-fg-base"
            >
              Como fazer uma proposta comercial &rarr;
            </Link>
            <Link
              href="/blog/modelos-proposta-comercial-freelancer"
              className="text-sm text-fg-muted hover:text-fg-base"
            >
              Modelos de proposta para freelancer &rarr;
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-fg-placeholder">
            &copy; {new Date().getFullYear()} PropFreela. Feito para freelancers brasileiros.
          </p>
          <div className="flex gap-4">
            <Link href="/termos-de-uso" className="text-xs text-fg-placeholder hover:text-fg-muted">
              Termos de uso
            </Link>
            <Link href="/privacidade" className="text-xs text-fg-placeholder hover:text-fg-muted">
              Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="font-mono text-lg font-light text-fg-base">{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  )
}

function Step({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div>
      <span className="mb-3 inline-block font-mono text-2xl font-light text-accent">{number}</span>
      <p className="mb-2 text-sm font-medium text-fg-base">{title}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}

function Feature({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-sm border border-border bg-bg-base p-6">
      <span className="mb-3 inline-block text-xl" dangerouslySetInnerHTML={{ __html: icon }} />
      <p className="mb-2 text-sm font-medium text-fg-base">{title}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}
