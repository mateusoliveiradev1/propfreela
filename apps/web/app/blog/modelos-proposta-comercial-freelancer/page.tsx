import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Modelos de proposta comercial para freelancer — PropFreela',
  description:
    'Confira modelos prontos de proposta comercial para diferentes áreas: desenvolvimento web, design, marketing e redação. Baixe em PDF grátis.',
  openGraph: {
    title: 'Modelos de proposta comercial para freelancer',
    description:
      'Modelos prontos de proposta para dev web, design, marketing e redação. PDF grátis.',
    locale: 'pt_BR',
    type: 'article',
  },
  alternates: {
    canonical: '/blog/modelos-proposta-comercial-freelancer',
  },
}

export default function ModelosPropostaPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-sm font-medium tracking-tight text-fg-base">
            PropFreela
          </Link>
          <Link
            href="/login"
            className="inline-flex h-8 items-center rounded-sm bg-accent px-4 text-xs font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Criar conta grátis
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Blog · Templates
        </p>
        <h1 className="mb-6 text-4xl font-light leading-tight text-fg-base">
          Modelos de proposta comercial para freelancer
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Exemplos prontos para diferentes áreas. Adapte para o seu negócio e comece a fechar
          mais projetos hoje.
        </p>

        <article className="space-y-12 text-sm leading-relaxed text-fg-muted">
          <Section title="Modelo 1 — Desenvolvimento web">
            <ProposalExample
              title="Website institucional — Acme Corp"
              client="Acme Corp"
              value="R$ 4.500,00"
              deadline="30 dias após aprovação"
              scope={[
                'Website responsivo com até 5 páginas (Home, Sobre, Serviços, Blog, Contato)',
                'Painel administrativo para edição de conteúdo (WordPress ou similar)',
                'Integração com Google Analytics 4',
                'Otimização básica de SEO (meta tags, sitemap, robots.txt)',
                'Hospedagem não inclusa — recomendação de provedor fornecida',
              ]}
              payment="50% na aprovação da proposta · 50% na entrega do projeto"
            />
          </Section>

          <Section title="Modelo 2 — Design de identidade visual">
            <ProposalExample
              title="Identidade visual completa — Startup XYZ"
              client="Startup XYZ"
              value="R$ 2.800,00"
              deadline="21 dias após aprovação"
              scope={[
                'Pesquisa de referências e briefing visual',
                '3 opções de logotipo para escolha',
                'Refinamento da opção escolhida com até 2 rodadas de revisão',
                'Manual de identidade visual (cores, tipografia, usos corretos)',
                'Arquivos entregues em PNG, SVG e PDF',
              ]}
              payment="100% adiantado com aprovação da proposta"
            />
          </Section>

          <Section title="Modelo 3 — Marketing de conteúdo">
            <ProposalExample
              title="Gestão de conteúdo mensal — Blog Empresa ABC"
              client="Empresa ABC"
              value="R$ 1.200,00 / mês"
              deadline="Contrato mensal renovável"
              scope={[
                '4 artigos otimizados para SEO por mês (800-1200 palavras cada)',
                'Pesquisa de palavras-chave mensal',
                'Publicação direta no WordPress',
                'Relatório mensal de desempenho (visualizações, posicionamento)',
              ]}
              payment="Pagamento todo dia 5 via Pix"
            />
          </Section>

          <Section title="Modelo 4 — Redação e copywriting">
            <ProposalExample
              title="Copywriting para landing page — Produto Digital"
              client="João Empreendedor"
              value="R$ 950,00"
              deadline="7 dias após aprovação"
              scope={[
                'Levantamento de informações do produto e público-alvo',
                'Copywriting completo da landing page (headline, benefícios, prova social, CTA)',
                '1 rodada de revisão incluída',
                'Entrega em documento editável (Google Docs)',
              ]}
              payment="50% na aprovação · 50% na entrega"
            />
          </Section>

          <Section title="Como usar esses modelos">
            <p>
              Você pode adaptar qualquer um desses modelos para o seu contexto. O ponto mais
              importante é ser específico no escopo — quanto mais claro você for sobre o que está
              incluso (e o que não está), menos retrabalho e mais confiança do cliente.
            </p>
            <p>
              O <strong className="text-fg-base">PropFreela</strong> permite que você crie propostas
              profissionais em PDF em minutos, usando esses modelos como base. Basta preencher o
              formulário e baixar o arquivo pronto.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar proposta em PDF grátis →
            </Link>
          </Section>
        </article>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-5 text-base font-medium text-fg-base">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function ProposalExample({
  title,
  client,
  value,
  deadline,
  scope,
  payment,
}: {
  title: string
  client: string
  value: string
  deadline: string
  scope: string[]
  payment: string
}) {
  return (
    <div className="rounded-sm border border-border p-6 space-y-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">{client}</p>
        <p className="mt-1 text-base font-light text-fg-base">{title}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-placeholder">
            Investimento
          </p>
          <p className="font-mono text-sm text-accent">{value}</p>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-placeholder">
            Prazo
          </p>
          <p className="text-sm text-fg-base">{deadline}</p>
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-fg-placeholder">
          Escopo
        </p>
        <ul className="space-y-1.5">
          {scope.map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-fg-muted">
              <span className="mt-0.5 shrink-0 text-accent">–</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.1em] text-fg-placeholder">
          Condições de pagamento
        </p>
        <p className="text-xs text-fg-muted">{payment}</p>
      </div>
    </div>
  )
}
