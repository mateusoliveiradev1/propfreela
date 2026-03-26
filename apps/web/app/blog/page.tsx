import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Blog — Guias para freelancers brasileiros | PropFreela',
  description:
    'Guias praticos sobre propostas comerciais, precificacao, contratos e como conseguir mais clientes como freelancer no Brasil.',
  openGraph: {
    title: 'Blog PropFreela — Guias para freelancers',
    description: 'Artigos praticos para freelancers brasileiros fecharem mais projetos.',
    type: 'website',
    locale: 'pt_BR',
  },
}

const articles = [
  {
    href: '/blog/como-precificar-servicos-freelancer',
    title: 'Como precificar seus servicos como freelancer',
    description:
      'Aprenda a calcular seu custo-hora, usar precificacao por valor e apresentar precos que o cliente aceita.',
    label: 'Negocios',
  },
  {
    href: '/blog/como-fazer-proposta-comercial-freelancer',
    title: 'Como fazer uma proposta comercial para freelancer',
    description:
      'Estrutura completa de uma proposta que convence: o que incluir, como organizar e dicas para aumentar a taxa de aprovacao.',
    label: 'Propostas',
  },
  {
    href: '/blog/modelos-proposta-comercial-freelancer',
    title: 'Modelos de proposta comercial para freelancer',
    description:
      'Quatro modelos prontos para web, design, marketing de conteudo e copywriting — com escopo, valor e prazo.',
    label: 'Propostas',
  },
  {
    href: '/blog/contrato-freelancer-modelo',
    title: 'Contrato de prestacao de servicos para freelancer',
    description:
      'Clausulas essenciais, modelo comentado e dicas praticas para proteger seu trabalho e se profissionalizar.',
    label: 'Juridico',
  },
  {
    href: '/blog/como-conseguir-clientes-freelancer',
    title: 'Como conseguir mais clientes como freelancer em 2025',
    description:
      'Estrategias reais para encontrar clientes: portfolio, LinkedIn, indicacao e como fechar com propostas profissionais.',
    label: 'Clientes',
  },
]

export default function BlogPage() {
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
            Criar conta gratis
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Blog
        </p>
        <h1 className="mb-4 text-4xl font-light leading-tight text-fg-base">
          Guias para freelancers brasileiros
        </h1>
        <p className="mb-14 text-sm text-fg-muted">
          Artigos praticos sobre propostas, precificacao, contratos e como fechar mais projetos.
        </p>

        <div className="space-y-2">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex flex-col gap-2 rounded-sm border border-border bg-bg-base p-6 transition-colors hover:border-accent/30 hover:bg-bg-subtle sm:flex-row sm:items-start sm:justify-between sm:gap-6"
            >
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-bg-subtle px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-fg-muted group-hover:bg-bg-overlay">
                    {article.label}
                  </span>
                </div>
                <p className="mb-1 text-sm font-medium text-fg-base">{article.title}</p>
                <p className="text-xs leading-relaxed text-fg-muted">{article.description}</p>
              </div>
              <span className="shrink-0 text-sm text-fg-placeholder transition-colors group-hover:text-accent">
                Ler →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-16 rounded-sm border border-border bg-bg-subtle p-8 text-center">
          <p className="mb-2 text-sm font-medium text-fg-base">
            Pronto para criar sua primeira proposta?
          </p>
          <p className="mb-6 text-xs text-fg-muted">
            Gere propostas em PDF profissionais em menos de 2 minutos. Gratis.
          </p>
          <Link
            href="/login"
            className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Criar proposta gratis →
          </Link>
        </div>
      </main>
    </div>
  )
}
