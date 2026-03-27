import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proposta comercial para desenvolvedor web freelancer: modelo completo — PropFreela',
  description:
    'Modelo de proposta comercial para desenvolvedor web freelancer. Aprenda o que incluir, como apresentar o valor do seu trabalho e feche mais contratos.',
  openGraph: {
    title: 'Proposta comercial para desenvolvedor web freelancer: modelo completo',
    description:
      'Modelo de proposta comercial para desenvolvedor web freelancer. Aprenda o que incluir, como apresentar o valor do seu trabalho e feche mais contratos.',
    type: 'article',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/blog/proposta-comercial-desenvolvedor-web',
  },
}

export default function PropostaDesenvolvimentoWebPage() {
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
        <h1 className="mb-4 text-4xl font-light leading-tight text-fg-base">
          Proposta comercial para desenvolvedor web freelancer: modelo completo
        </h1>
        <p className="mb-12 text-base leading-relaxed text-fg-muted">
          Você domina React, sabe configurar um servidor e entrega projetos no prazo — mas continua
          perdendo contratos para desenvolvedores menos experientes. Na maioria dos casos, o problema
          não é técnico: é a proposta. Um documento mal estruturado transmite insegurança e faz o
          cliente escolher outro profissional. Veja como mudar isso.
        </p>

        <article className="prose-custom space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="Por que desenvolvedores freelancers perdem projetos?">
            <p>
              O mercado de desenvolvimento web freelancer é altamente competitivo. Quando um cliente
              solicita orçamentos, normalmente recebe respostas de três a cinco profissionais. A
              decisão raramente é tomada com base apenas no preço — o cliente avalia quem parece
              mais confiável, organizado e capaz de entregar o que promete.
            </p>
            <p>
              Propostas enviadas por e-mail em texto corrido, orçamentos informais no WhatsApp ou
              documentos Word mal formatados passam uma mensagem errada: se o desenvolvedor não
              capricha no próprio material de venda, como vai caprichar no projeto do cliente?
            </p>
            <p>
              Outros erros frequentes incluem: não especificar o escopo claramente (gerando
              desentendimentos sobre o que está incluso), não informar o prazo de entrega, omitir
              as condições de pagamento e não apresentar o valor que o projeto vai gerar para o
              negócio do cliente. Uma proposta profissional resolve todos esses pontos antes mesmo
              de o cliente perguntar.
            </p>
          </Section>

          <Section title="O que incluir na proposta de desenvolvimento web">
            <p>
              Uma proposta eficaz para projetos de desenvolvimento web deve cobrir quatro pilares
              fundamentais: escopo, tecnologias, prazo e valor. Cada um deles responde a uma dúvida
              que o cliente tem antes de assinar.
            </p>
            <ol className="list-none space-y-6">
              {[
                {
                  n: '1',
                  title: 'Escopo detalhado do projeto',
                  text: 'Liste todas as funcionalidades que serão desenvolvidas. "Website institucional com 5 páginas, formulário de contato, painel administrativo para edição de conteúdo e integração com Google Analytics." Quanto mais específico, menos margem para retrabalho não remunerado.',
                },
                {
                  n: '2',
                  title: 'Tecnologias utilizadas',
                  text: 'Clientes de médio e grande porte querem saber com o que estão pagando. Mencione a stack: "Desenvolvido em Next.js com TypeScript, banco de dados PostgreSQL, hospedagem na Vercel." Isso demonstra competência técnica e facilita a manutenção futura.',
                },
                {
                  n: '3',
                  title: 'Prazo de entrega',
                  text: 'Apresente um cronograma claro, mesmo que simplificado. Exemplo: "Primeira versão em 3 semanas, revisões em até 5 dias úteis, entrega final na semana 5." Datas concretas transmitem comprometimento e ajudam o cliente a planejar o lançamento.',
                },
                {
                  n: '4',
                  title: 'Investimento e condições de pagamento',
                  text: 'Apresente o valor total de forma clara, não por hora. Defina as condições: "50% na aprovação da proposta, 50% na entrega". Inclua também o que acontece em caso de solicitações fora do escopo original — isso protege você e o cliente.',
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

          <Section title="Como apresentar o valor (não o preço)">
            <p>
              Desenvolvedores tendem a falar de horas trabalhadas e tecnologias utilizadas. Clientes
              pensam em resultado de negócio. Essa diferença de perspectiva é onde muitas propostas
              fracassam.
            </p>
            <p>
              Em vez de escrever "desenvolvimento de e-commerce por R$8.000", tente: "Sistema de
              vendas online que vai permitir sua loja receber pedidos 24 horas por dia, sem
              comissão de marketplace. Investimento: R$8.000." A segunda versão conecta o preço a
              um benefício concreto e recorrente para o cliente.
            </p>
            <p>
              Sempre que possível, contextualize o ROI. Se o cliente fatura R$50.000/mês na loja
              física e o e-commerce pode adicionar 20% a mais, o investimento de R$8.000 se paga
              em menos de um mês. Explicitar esse raciocínio na proposta transforma o preço em
              investimento com retorno evidente — e remove a principal objeção do cliente.
            </p>
            <ul className="space-y-3">
              {[
                'Mostre o problema que você está resolvendo, não só a solução técnica.',
                'Use números concretos sempre que o cliente os tiver compartilhado com você.',
                'Compare o investimento com alternativas (agência, plataforma SaaS, funcionário CLT).',
                'Destaque o que o cliente ganha com a entrega, não o que você vai fazer.',
                'Se o projeto gera economia de tempo, calcule essa economia em reais por mês.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Modelo de proposta para desenvolvedor web">
            <p>
              Uma boa proposta de desenvolvimento web tem entre uma e três páginas. Mais do que isso
              e o cliente não lê. Menos do que isso e falta informação para tomar a decisão.
              Veja a estrutura recomendada:
            </p>
            <ol className="list-none space-y-6">
              {[
                {
                  n: '1',
                  title: 'Cabeçalho e identificação',
                  text: 'Seus dados (nome, e-mail, telefone) e os dados do cliente. Data de emissão e validade da proposta (recomendado: 15 dias). Um título claro: "Proposta de Desenvolvimento de E-commerce — Loja XYZ".',
                },
                {
                  n: '2',
                  title: 'Contexto e objetivo',
                  text: 'Dois parágrafos resumindo o que o cliente precisa e como você vai resolver. Isso mostra que você entendeu o problema — não está enviando uma proposta genérica para todo mundo.',
                },
                {
                  n: '3',
                  title: 'Escopo do projeto',
                  text: 'Lista com tudo que está incluído. Seja específico: "Cadastro de produtos com variantes", "integração com Pix e cartão de crédito via Stripe", "painel admin com controle de estoque". Opcional: inclua também o que está fora do escopo para evitar mal-entendidos.',
                },
                {
                  n: '4',
                  title: 'Stack técnico',
                  text: 'Mencione as principais tecnologias. Não precisa ser uma lista exaustiva — destaque o que o cliente vai se beneficiar: "Site com carregamento ultrarrápido (Next.js)", "infraestrutura escalável", "código com testes automatizados".',
                },
                {
                  n: '5',
                  title: 'Cronograma',
                  text: 'Entrega em etapas com datas. Fase 1: layout aprovado em X dias. Fase 2: desenvolvimento em Y semanas. Fase 3: testes e ajustes em Z dias. Fase 4: entrega e deploy na data D.',
                },
                {
                  n: '6',
                  title: 'Investimento e pagamento',
                  text: 'Valor total em destaque. Condições de parcelamento. Forma de pagamento aceita (Pix, transferência). Política para solicitações adicionais fora do escopo.',
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
            <p>
              O formato ideal é PDF. Nunca envie um arquivo editável — isso sinaliza que os valores
              são negociáveis e tira a seriedade do documento. Um PDF bem formatado, com tipografia
              limpa e seu logo, transmite profissionalismo antes mesmo de o cliente ler uma linha.
            </p>
          </Section>

          <Section title="Erros comuns na proposta de desenvolvimento">
            <p>
              Mesmo desenvolvedores experientes cometem erros que comprometem a aprovação da
              proposta. Os mais frequentes são:
            </p>
            <ul className="space-y-3">
              {[
                'Colocar preço por hora: clientes preferem valor fixo. Por hora gera ansiedade sobre o total final.',
                'Escopo vago: "desenvolvimento de website" sem detalhar páginas, funcionalidades e integrações.',
                'Não definir o que está fora do escopo: sem essa cláusula, qualquer pedido extra vira obrigação.',
                'Proposta genérica: copiar e colar sem personalizar para o negócio do cliente específico.',
                'Sem validade: propostas sem prazo de validade podem ser retomadas meses depois, quando seus custos já mudaram.',
                'Sem condições de pagamento claras: omitir quando e como você quer receber gera atritos depois.',
                'Erros de português: revise sempre. Um erro de digitação num documento formal destrói credibilidade.',
                'Demorar mais de 48 horas para enviar: o cliente perde o interesse ou fecha com outro profissional.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>
        </article>

        <div className="mt-16 rounded-sm border border-border bg-bg-subtle p-8">
          <h2 className="mb-2 text-xl font-light text-fg-base">
            Gere sua proposta em minutos
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-fg-muted">
            PropFreela gera propostas profissionais em PDF com IA. Você preenche os dados do
            projeto, a IA escreve o escopo técnico, e o PDF fica pronto para enviar ao cliente —
            com sua logo, cores da sua marca e sem watermark no plano Pro.
          </p>
          <Link
            href="/login"
            className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Experimentar grátis
          </Link>
        </div>
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
