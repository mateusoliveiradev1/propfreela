import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como fazer uma proposta comercial para freelancer — PropFreela',
  description:
    'Aprenda como criar uma proposta comercial profissional como freelancer. Estrutura, dicas e modelo pronto para impressionar seu cliente e fechar mais contratos.',
  openGraph: {
    title: 'Como fazer uma proposta comercial para freelancer',
    description:
      'Estrutura completa, dicas práticas e modelo para criar propostas que vendem.',
    locale: 'pt_BR',
    type: 'article',
  },
  alternates: {
    canonical: '/blog/como-fazer-proposta-comercial-freelancer',
  },
}

export default function ComoFazerPropostaPage() {
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
        <Link
          href="/blog"
          className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.15em] text-fg-muted hover:text-fg-base"
        >
          ← Blog
        </Link>
        <h1 className="mb-6 text-4xl font-light leading-tight text-fg-base">
          Como fazer uma proposta comercial para freelancer
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Uma proposta bem feita pode ser a diferença entre perder e fechar um projeto. Veja a estrutura
          completa e como criar a sua em minutos.
        </p>

        <article className="prose-custom space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="O que é uma proposta comercial?">
            <p>
              Uma proposta comercial é um documento formal que você envia ao cliente para apresentar
              o escopo do projeto, o investimento necessário e as condições de pagamento. Ela demonstra
              profissionalismo e evita mal-entendidos no futuro.
            </p>
            <p>
              Para freelancers, a proposta é muitas vezes o primeiro documento oficial que o cliente
              recebe. Uma proposta bem formatada aumenta a percepção de valor do seu trabalho —
              mesmo antes de você entregar qualquer coisa.
            </p>
          </Section>

          <Section title="Por que a maioria dos freelancers perde contratos por causa da proposta?">
            <p>
              Propostas feitas no Word ou no Google Docs costumam ter problemas: formatação
              inconsistente, falta de clareza no escopo, ausência de prazo e condições de pagamento
              mal definidas. O cliente sente insegurança e muitas vezes escolhe outro profissional
              que parece mais organizado — mesmo que tecnicamente inferior.
            </p>
          </Section>

          <Section title="Estrutura de uma proposta comercial eficaz">
            <ol className="list-none space-y-6">
              {[
                {
                  n: '1',
                  title: 'Cabeçalho com seus dados e do cliente',
                  text: 'Nome, empresa (se tiver), contato e data. Mostre que aquele documento foi feito especificamente para aquele cliente.',
                },
                {
                  n: '2',
                  title: 'Título e contexto',
                  text: 'Um título claro: "Proposta de desenvolvimento de website — Acme Corp". Em seguida, 1-2 linhas resumindo o contexto: o que o cliente precisa e como você vai resolver.',
                },
                {
                  n: '3',
                  title: 'Escopo detalhado',
                  text: 'Liste o que está incluído. Seja específico: "Website com até 5 páginas", "painel para editar conteúdo", "otimização básica de SEO". Quanto mais claro o escopo, menos retrabalho depois.',
                },
                {
                  n: '4',
                  title: 'Investimento',
                  text: 'Apresente o valor de forma clara. Se possível, contextualize: "Investimento total: R$4.500" — não "cobro R$X por hora". Clientes preferem valor fixo.',
                },
                {
                  n: '5',
                  title: 'Prazo de entrega',
                  text: 'Informe a data estimada de conclusão. Isso demonstra comprometimento e ajuda o cliente a planejar.',
                },
                {
                  n: '6',
                  title: 'Condições de pagamento',
                  text: 'Seja claro: "50% na aprovação da proposta, 50% na entrega". Ou "100% adiantado com desconto". Defina também como receberá (Pix, boleto).',
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium text-accent-fg">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-medium text-fg-base">{item.title}</p>
                    <p className="mt-1 text-fg-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Dicas para aumentar a taxa de aprovação">
            <ul className="space-y-3">
              {[
                'Envie a proposta em PDF, nunca como arquivo editável. Isso evita que o cliente altere os valores.',
                'Personalize o documento com a logo do cliente se tiver e com o seu nome/empresa.',
                'Responda dentro de 24 horas após a reunião — o cliente ainda está empolgado.',
                'Defina uma validade para a proposta (ex: "válida por 15 dias").',
                'Use linguagem clara e evite jargões técnicos se o cliente não for da área.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Ferramenta para criar propostas em PDF">
            <p>
              O <strong className="text-fg-base">PropFreela</strong> foi criado especificamente para
              freelancers brasileiros que precisam criar propostas profissionais sem perder tempo com
              formatação. Preencha o formulário, escolha o template e baixe o PDF em segundos.
            </p>
            <p>
              O plano gratuito permite 3 propostas por mês — suficiente para começar. No plano Pro
              você cria propostas ilimitadas, inclui sua logo e remove o watermark.
            </p>
            <Link
              href="/login"
              className="mt-4 inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar sua primeira proposta grátis →
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
      <h2 className="mb-4 text-base font-medium text-fg-base">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
