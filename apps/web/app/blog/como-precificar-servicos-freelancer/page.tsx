import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como precificar seus serviços como freelancer — PropFreela',
  description:
    'Aprenda a calcular quanto cobrar pelos seus serviços como freelancer: custo-hora, valor percebido e como apresentar o preço ao cliente.',
  openGraph: {
    title: 'Como precificar seus serviços como freelancer',
    description: 'Guia completo para freelancers brasileiros definirem preços justos e competitivos.',
    type: 'article',
    locale: 'pt_BR',
  },
}

export default function PrecificarServicosPage() {
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

      <main className="mx-auto max-w-2xl px-6 py-16">
        <Link
          href="/blog"
          className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.15em] text-fg-muted hover:text-fg-base"
        >
          ← Blog
        </Link>
        <h1 className="mb-4 text-4xl font-light leading-tight text-fg-base">
          Como precificar seus servicos como freelancer
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Definir o preco certo e um dos maiores desafios de quem trabalha por conta propria.
          Cobrar pouco desvaloriza seu trabalho; cobrar muito afasta clientes. Este guia vai te
          ajudar a encontrar o ponto ideal.
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              1. Por que a maioria dos freelancers cobra errado
            </h2>
            <p>
              O erro mais comum e usar o preco de amigos ou de vagas de emprego como referencia.
              Freelancer nao e CLT: voce paga seus proprios impostos, ferramentas, plano de saude,
              ferias e previdencia. Se nao contar tudo isso, voce pode estar trabalhando por menos
              do que um salario minimo de fato.
            </p>
            <p>
              O segundo erro e cobrar pelo tempo que voce leva hoje, nao pelo valor que entrega.
              Um desenvolvedor com 5 anos de experiencia que resolve um problema em 2 horas entrega
              mais valor do que um junior que leva 20 horas no mesmo problema. Tempo e apenas um
              dos fatores.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">2. Calculando seu custo-hora</h2>
            <p>
              O custo-hora e o piso, nao o teto. Para calcular, some todos os seus custos mensais:
            </p>
            <ul className="space-y-2">
              {[
                'Despesas pessoais (aluguel, alimentacao, transporte)',
                'Ferramentas e softwares (Adobe, Figma, hospedagem)',
                'Impostos (MEI: R$70/mes + DAS; Autonomo: 20% INSS + ISS)',
                'Reserva de emergencia (recomendado: 20% da receita)',
                'Investimento em aprendizado (cursos, livros)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium text-accent-fg">
                    {i + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p>
              Divida esse total pelas horas que voce realmente trabalha por mes (descontando
              tempo de prospecao, reunioes e admin — geralmente 60-70% das horas sao faturadas).
              Esse e seu custo-hora minimo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              3. Precificacao por valor percebido
            </h2>
            <p>
              Alem do custo-hora, o preco deve refletir o valor que voce gera para o cliente.
              Um site que gera R$50 mil por mes para um cliente vale muito mais do que o tempo
              que voce gastou para construi-lo.
            </p>
            <p>
              Perguntas para calibrar o valor percebido: Qual o retorno financeiro esperado pelo
              cliente com esse projeto? Qual a dor que voce esta resolvendo? Qual seria o custo
              de contratar uma agencia para o mesmo servico?
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              4. Referencias de preco por area (Brasil, 2025)
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 text-left font-medium text-fg-base">Servico</th>
                    <th className="py-2 text-right font-medium text-fg-base">Faixa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Site institucional (5 paginas)', 'R$ 2.500 — R$ 8.000'],
                    ['Identidade visual completa', 'R$ 1.800 — R$ 6.000'],
                    ['Landing page com copy', 'R$ 1.200 — R$ 4.000'],
                    ['Social media (pacote mensal)', 'R$ 800 — R$ 2.500/mes'],
                    ['Redacao de artigo SEO', 'R$ 150 — R$ 600/artigo'],
                    ['App mobile (MVP)', 'R$ 15.000 — R$ 50.000'],
                  ].map(([servico, faixa]) => (
                    <tr key={servico}>
                      <td className="py-2 text-fg-muted">{servico}</td>
                      <td className="py-2 text-right font-mono text-accent">{faixa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Essas faixas sao referencias. Profissionais com portfolio forte, especialidade de
              nicho ou reputacao consolidada cobram acima da faixa superior.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              5. Como apresentar o preco ao cliente
            </h2>
            <p>
              Nunca apresente o preco verbalmente ou de forma improvisada. Coloque tudo em uma
              proposta comercial escrita antes de qualquer conversa sobre desconto. Uma proposta
              profissional aumenta a percepcao de valor e reduz objecoes.
            </p>
            <ul className="space-y-2">
              {[
                'Justifique o investimento: mostre o que esta incluso, prazo e entregaveis',
                'Quebre em etapas se o valor for alto (ex: 50% entrada + 50% entrega)',
                'Inclua condicoes de pagamento claras (PIX, boleto, prazo)',
                'Estabeleca uma validade para a proposta (ex: 10 dias)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="border-t border-border pt-8">
            <p className="mb-4 text-sm text-fg-muted">
              Depois de definir seu preco, o proximo passo e apresenta-lo de forma profissional.
              A PropFreela gera propostas em PDF em menos de 2 minutos, com layout que transmite
              confianca ao cliente.
            </p>
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar proposta gratis →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
