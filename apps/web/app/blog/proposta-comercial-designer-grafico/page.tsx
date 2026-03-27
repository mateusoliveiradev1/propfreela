import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Proposta comercial para designer gráfico freelancer: guia completo — PropFreela',
  description:
    'Como criar uma proposta comercial para designer gráfico freelancer. Estrutura, o que incluir, como precificar e modelo pronto para usar.',
  openGraph: {
    title: 'Proposta comercial para designer gráfico freelancer: guia completo',
    description:
      'Como criar uma proposta comercial para designer gráfico freelancer. Estrutura, o que incluir, como precificar e modelo pronto para usar.',
    type: 'article',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/blog/proposta-comercial-designer-grafico',
  },
}

export default function PropostaDesignerGraficoPage() {
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
          Proposta comercial para designer gráfico freelancer: guia completo
        </h1>
        <p className="mb-10 text-sm leading-relaxed text-fg-muted">
          Como designer freelancer, você concorre não só pela qualidade do portfólio — mas também
          pela forma como apresenta seus serviços. Uma proposta comercial bem estruturada diferencia
          você de dezenas de outros profissionais e transmite confiança antes de o cliente ver uma
          única peça do seu trabalho.
        </p>

        <article className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="A proposta é sua primeira entrega criativa">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Muitos designers subestimam o poder da proposta. Tratam ela como uma formalidade —
              um número em um e-mail, um PDF genérico copiado do projeto anterior. Mas para o
              cliente, a proposta é a primeira amostra do seu cuidado com os detalhes.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Uma proposta visualmente organizada, com linguagem clara e estrutura lógica, comunica
              que você é um profissional que entrega. Um e-mail informal com "fica em torno de R$X"
              comunica o oposto — mesmo que seu portfólio seja excepcional.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Pense assim: o cliente está comprando uma experiência de trabalho junto com o
              resultado final. A proposta é o trailer dessa experiência. Ela define o tom de toda
              a relação profissional.
            </p>
          </Section>

          <Section title="O que incluir na proposta de design">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              A proposta de um designer gráfico precisa responder quatro perguntas antes que o
              cliente precise formulá-las: o que você vai entregar, quando, como e por quanto.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-fg-muted mb-4">
              <li>
                <strong className="text-fg-base">Briefing compreendido:</strong> abra a proposta
                mostrando que você entendeu o problema. Resumindo o contexto do cliente em 2-3
                linhas — o segmento, o objetivo do projeto e o público-alvo — você demonstra
                escuta ativa e elimina a principal dúvida do cliente: "esse designer realmente
                entendeu o que eu preciso?"
              </li>
              <li>
                <strong className="text-fg-base">Escopo de entrega:</strong> liste exatamente o
                que será produzido. Seja específico: "identidade visual completa com logo em 3
                versões (principal, horizontal e ícone), paleta de cores, tipografia e guia de
                aplicação em PDF". Generalizações como "criação de logo" geram expectativas
                diferentes entre você e o cliente.
              </li>
              <li>
                <strong className="text-fg-base">Formatos de entrega:</strong> especifique os
                arquivos que o cliente receberá — AI, PDF, PNG, SVG. Clientes sem conhecimento
                técnico não sabem pedir isso; quando você já informa, demonstra expertise e evita
                pedidos extras depois da entrega.
              </li>
              <li>
                <strong className="text-fg-base">Número de revisões incluídas:</strong> defina
                quantas rodadas de ajuste estão no escopo. Esse é um dos pontos que mais geram
                conflito em projetos de design — detalhe mais abaixo.
              </li>
              <li>
                <strong className="text-fg-base">Prazo:</strong> informe a data estimada de
                entrega da primeira versão e o prazo total do projeto. Se depender de aprovações
                intermediárias, explique como funciona o fluxo.
              </li>
              <li>
                <strong className="text-fg-base">Investimento e condições de pagamento:</strong>{' '}
                valor total do projeto e como será dividido — por exemplo, 50% na aprovação da
                proposta e 50% na entrega dos arquivos finais.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Inclua também uma validade para a proposta — geralmente 10 a 15 dias. Isso cria
              urgência genuína e protege você de clientes que aprovam semanas depois com o
              argumento de que "combinamos aquele valor".
            </p>
          </Section>

          <Section title="Como definir o valor do projeto de design">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Precificar design é um desafio porque o valor percebido varia muito entre clientes.
              Uma logo pode valer R$300 para uma barraquinha de feira ou R$15.000 para uma startup
              em fase de captação. O preço certo depende de três variáveis:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-fg-muted mb-4">
              <li>
                <strong className="text-fg-base">Horas estimadas:</strong> calcule com honestidade
                o tempo real que o projeto vai demandar — briefing, pesquisa de referências,
                conceituação, execução, ajustes e organização dos arquivos finais. Multiplique
                pelo seu valor-hora mínimo e use isso como piso.
              </li>
              <li>
                <strong className="text-fg-base">Complexidade e uso:</strong> um projeto simples
                de cartão de visita é diferente de uma identidade visual completa que o cliente
                vai usar por anos em embalagens, painéis e comunicação digital. Quanto maior o
                alcance e a longevidade do material, maior o valor.
              </li>
              <li>
                <strong className="text-fg-base">Licenciamento:</strong> se o cliente vai usar o
                material para fins comerciais — especialmente em publicidade paga, licenciamento
                para terceiros ou produtos à venda — o valor deve refletir isso. Licença de uso
                comercial ampla justifica uma precificação maior do que uso interno ou pessoal.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Uma boa prática é apresentar o valor como "investimento" em vez de "custo", e
              contextualizá-lo: "o investimento para esta identidade visual é de R$2.800, incluindo
              todos os arquivos editáveis e guia de marca". Isso reforça o que o cliente está
              recebendo em troca.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Evite cobrar por hora em propostas — clientes ficam ansiosos tentando calcular quanto
              cada e-mail está custando. Prefira valor fechado por projeto ou por entregável.
            </p>
          </Section>

          <Section title="Revisões: como definir limites claros">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O maior vilão da rentabilidade do designer freelancer não é o preço baixo — é o
              escopo crescente, o chamado <em>scope creep</em>. E ele quase sempre começa na
              falta de clareza sobre revisões.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Defina na proposta o número exato de rodadas de revisão incluídas. Uma rodada de
              revisão significa: o cliente revisa a entrega, consolida todos os feedbacks em uma
              lista e você faz os ajustes de uma vez. Não é "pode mandar ajustes conforme for
              pensando".
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-fg-muted mb-4">
              <li>
                Para projetos menores (cartão de visita, post avulso): 1 rodada de revisão.
              </li>
              <li>
                Para identidade visual ou projetos médios: 2 rodadas de revisão.
              </li>
              <li>
                Para projetos grandes ou com múltiplos aprovadores: negocie explicitamente.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Deixe claro o que acontece quando as revisões se esgotam: "ajustes adicionais além
              das rodadas inclusas serão cobrados separadamente a R$X/hora". Escrever isso na
              proposta não afasta clientes sérios — pelo contrário, transmite organização e
              profissionalismo.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Outra boa prática: especifique o que conta como revisão. Mudança de cor, ajuste de
              fonte ou reposicionamento de elementos é revisão. Mudança completa de conceito,
              adição de novos elementos ao escopo ou troca do briefing original é um novo projeto
              — ou pelo menos uma renegociação de escopo e valor.
            </p>
          </Section>

          <Section title="Modelo de estrutura para proposta de design gráfico">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Abaixo está uma estrutura que você pode adaptar para qualquer projeto de design.
              Cada bloco deve ter no máximo uma página no PDF final — quanto mais direto, melhor.
            </p>
            <ol className="list-none space-y-6">
              {[
                {
                  n: '1',
                  title: 'Capa com identificação',
                  text: 'Nome do projeto, nome do cliente, sua marca/nome profissional e data. Simples, limpo, sem excesso de informação.',
                },
                {
                  n: '2',
                  title: 'Contexto do projeto',
                  text: 'Duas ou três linhas mostrando que você entendeu o briefing: quem é o cliente, qual o objetivo do material e para quem ele se comunica.',
                },
                {
                  n: '3',
                  title: 'Escopo de entrega',
                  text: 'Lista objetiva do que será produzido: peças, versões, formatos de arquivo. Use bullet points — evite parágrafos longos aqui.',
                },
                {
                  n: '4',
                  title: 'Revisões e processo',
                  text: 'Número de rodadas de revisão incluídas, como funciona o fluxo de aprovação e o que acontece em caso de pedidos além do escopo.',
                },
                {
                  n: '5',
                  title: 'Prazo de entrega',
                  text: 'Data estimada para a primeira versão e prazo total, com a ressalva de que o prazo começa a contar após o pagamento do sinal.',
                },
                {
                  n: '6',
                  title: 'Investimento',
                  text: 'Valor total, forma de pagamento e condições (ex: 50% antecipado via Pix, 50% na entrega). Inclua a validade da proposta.',
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium text-accent-fg">
                    {item.n}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-fg-base">{item.title}</p>
                    <p className="mt-1 text-sm text-fg-muted">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm leading-relaxed text-fg-muted mb-4 mt-6">
              Envie sempre em PDF, nunca em arquivo editável. Isso evita que o cliente altere
              valores ou condições e reforça o caráter formal do documento. Assegure-se de que o
              PDF reflita sua identidade visual — tipografia, cores e organização condizentes com
              o padrão de qualidade que você entrega nos projetos.
            </p>
          </Section>

          {/* CTA */}
          <div className="mt-16 rounded-sm border border-border bg-bg-subtle p-8">
            <h2 className="mb-3 text-xl font-light text-fg-base">
              Gere propostas de design em PDF
            </h2>
            <p className="text-sm leading-relaxed text-fg-muted mb-6">
              O PropFreela foi feito para designers e freelancers brasileiros que querem criar
              propostas profissionais sem perder tempo com formatação. Preencha as informações do
              projeto, escolha o template e baixe o PDF em segundos — pronto para enviar ao
              cliente.
            </p>
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar proposta grátis →
            </Link>
          </div>
        </article>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-xl font-medium text-fg-base">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
