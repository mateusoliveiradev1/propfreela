import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como conseguir mais clientes como freelancer em 2025 — PropFreela',
  description:
    'Estrategias praticas para freelancers brasileiros conseguirem mais clientes: portfolio, LinkedIn, indicacao e como fechar com propostas profissionais.',
  openGraph: {
    title: 'Como conseguir mais clientes como freelancer em 2025',
    description: 'Guia pratico com estrategias reais para aumentar sua carteira de clientes.',
    type: 'article',
    locale: 'pt_BR',
  },
}

export default function ConseguirClientesPage() {
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
          Como conseguir mais clientes como freelancer em 2025
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Encontrar clientes e uma habilidade que se aprende. Nao e sorte, nao e network
          privilegiado. E processo, consistencia e saber se posicionar. Aqui estao as estrategias
          que funcionam de verdade para freelancers brasileiros.
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">1. Onde encontrar os primeiros clientes</h2>
            <p>
              Para quem esta comecando, a melhor fonte de clientes e o seu proprio circulo. Familia,
              amigos, ex-colegas de trabalho, professores. Nao tenha vergonha de avisar que voce
              esta disponivel — a maioria das pessoas nao sabe o que voce faz ate voce contar.
            </p>
            <ul className="space-y-2">
              {[
                'LinkedIn: atualize seu perfil, poste sobre seu trabalho, conecte com decisores',
                'Grupos do Facebook e WhatsApp de empreendedores locais',
                'Workana e 99Freelas (competitivo, mas bom para portfolio inicial)',
                'Instagram/Behance/Dribbble (para design, fotografia, video)',
                'Comunidades do Slack e Discord da sua area',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">2. Portfolio que converte</h2>
            <p>
              Portfolio nao e colecao de tudo que voce fez. E selecao dos projetos que voce quer
              repetir, para os clientes que voce quer atender. Mostre 3 a 5 projetos muito bons,
              nao 20 mediocres.
            </p>
            <p>
              Para cada projeto, mostre: o problema do cliente, o que voce fez e o resultado
              (numeros quando possivel). &quot;Redesenhei o site e as conversoes subiram 40%&quot;
              vale mais do que uma captura de tela bonita.
            </p>
            <p>
              Sem projetos reais? Faca projetos conceituais para marcas que voce admira. Recria
              o site de uma empresa local gratuitamente em troca de depoimento. Os primeiros 3
              projetos sao investimento.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              3. Indicacao: seu melhor canal de vendas
            </h2>
            <p>
              Um cliente satisfeito vale por 10 anuncios. Cultive essa relacao: entregue antes
              do prazo, comunique proativamente, supere as expectativas no primeiro projeto.
            </p>
            <ul className="space-y-2">
              {[
                'Ao final de cada projeto, peca um depoimento por escrito (ou video)',
                'Pergunte diretamente: "voce conhece alguem que poderia se beneficiar do meu trabalho?"',
                'Crie um programa de indicacao simples: 10% de comissao para quem indicar um cliente fechado',
                'Mantenha contato com clientes antigos: um email trimestral com dicas uteis',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-0.5 text-accent">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">4. LinkedIn e redes sociais</h2>
            <p>
              LinkedIn e onde decisores de empresa estao. Nao use so para procurar emprego.
              Poste sobre seu trabalho, insights da sua area, bastidores de projetos (com permissao
              do cliente). Consistencia de 2-3 posts por semana por 3 meses gera resultados
              mensuraveis.
            </p>
            <p>
              Instagram funciona bem para areas visuais (design, fotografia, arquitetura).
              TikTok e YouTube crescem bem para quem ensina — nao vende diretamente, mas gera
              autoridade e inbound de qualidade.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              5. Como abordar clientes potenciais
            </h2>
            <div className="space-y-4">
              {[
                {
                  titulo: 'Faca sua pesquisa primeiro',
                  desc: 'Antes de qualquer contato, entenda o negocio do potencial cliente. Qual o problema que voce pode resolver? Nao mande mensagem generica.',
                },
                {
                  titulo: 'Seja direto e especifico',
                  desc: 'Em vez de "posso ajudar seu negocio", diga "vi que seu site nao tem versao mobile — isso afeta sua taxa de conversao. Posso resolver em X semanas."',
                },
                {
                  titulo: 'Ofereca valor antes de vender',
                  desc: 'Um pequeno diagnostico gratuito, uma auditoria rapida ou um conteudo util cria reciprocidade e abre portas.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium text-accent-fg">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-fg-base">{item.titulo}</p>
                    <p className="mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              6. Feche com uma proposta profissional
            </h2>
            <p>
              Depois de todo o esforco para chegar a conversa com o cliente certo, nao perca
              o negocio por uma proposta amadora enviada no Word ou no corpo do email. A proposta
              e o ultimo passo antes do fechamento — e a primeira impressao concreta do seu trabalho.
            </p>
            <p>
              Uma proposta profissional em PDF, com escopo claro, valor detalhado e prazo definido,
              aumenta significativamente a taxa de aprovacao. Transmite organizacao, seriedade
              e justifica o valor cobrado.
            </p>
          </section>

          <div className="border-t border-border pt-8">
            <p className="mb-4 text-sm text-fg-muted">
              Crie propostas comerciais profissionais em minutos com a PropFreela. Com IA que
              gera o escopo, 5 templates bonitos e link de aprovacao para o cliente.
              Gratis para comecar.
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
