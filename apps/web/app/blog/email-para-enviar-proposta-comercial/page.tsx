import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como enviar uma proposta comercial por email: modelo e dicas — PropFreela',
  description:
    'Modelo de email para enviar proposta comercial para clientes. Aprenda o que escrever, o assunto certo e como aumentar a taxa de resposta.',
  openGraph: {
    title: 'Como enviar uma proposta comercial por email: modelo e dicas',
    description:
      'Modelo de email para enviar proposta comercial para clientes. Aprenda o que escrever, o assunto certo e como aumentar a taxa de resposta.',
    type: 'article',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/blog/email-para-enviar-proposta-comercial',
  },
}

export default function EmailPropostaComercialPage() {
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
          Como enviar uma proposta comercial por email: modelo e dicas
        </h1>

        <p className="mb-10 text-sm leading-relaxed text-fg-muted">
          Você passou horas montando a proposta, ajustou o escopo, definiu o preço com cuidado —
          e na hora de enviar jogou tudo dentro de um email genérico. É aí que muita venda se perde.
          O email que acompanha a proposta é tão importante quanto o PDF em si.
        </p>

        <article className="space-y-10 text-sm leading-relaxed text-fg-muted">

          <Section title="Por que o email importa tanto quanto a proposta">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O cliente recebe a proposta como anexo, mas lê o email primeiro. É o email que vai
              determinar se ele abre o PDF com atenção ou deixa para depois (e acaba esquecendo).
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Um email bem escrito faz três coisas ao mesmo tempo: relembra o contexto da conversa,
              apresenta a proposta com confiança e convida o cliente a dar o próximo passo. Um email
              mal escrito — ou pior, vazio com o PDF apenas anexado — transmite pressa, descuido e
              falta de profissionalismo.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              A boa notícia: escrever um email eficaz não exige talento redatorial. Exige uma
              estrutura clara e algumas escolhas simples que você vai aprender aqui.
            </p>
          </Section>

          <Section title="O assunto do email: a primeira decisão do cliente">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Antes de ler uma única linha do corpo do email, o cliente vai olhar o assunto. É a
              primeira decisão: abrir agora, abrir depois ou ignorar. Por isso, o assunto precisa
              ser claro, específico e profissional.
            </p>

            <p className="text-sm leading-relaxed text-fg-muted mb-3">
              <strong className="text-fg-base">Assuntos que funcionam:</strong>
            </p>
            <ul className="mb-5 space-y-2">
              {[
                'Proposta comercial — Desenvolvimento do site da Acme Corp',
                'Proposta: identidade visual para o lançamento do Projeto X',
                'Proposta de consultoria em marketing digital — [nome do cliente]',
                'Proposta de criação de conteúdo — Março/2026',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <span className="text-fg-muted text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm leading-relaxed text-fg-muted mb-3">
              <strong className="text-fg-base">Assuntos que afastam clientes:</strong>
            </p>
            <ul className="mb-5 space-y-2">
              {[
                '"Proposta" — vago demais, o cliente nem sabe de qual serviço se trata',
                '"Segue a proposta conforme solicitado" — tom burocrático e impessoal',
                '"Proposta URGENTE!!!" — desperta desconfiança, não urgência',
                '"Orçamento" — soa barato e informal para projetos maiores',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-fg-subtle">✕</span>
                  <span className="text-fg-muted text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm leading-relaxed text-fg-muted">
              A regra é simples: o assunto deve deixar claro de imediato que é uma proposta
              comercial e para qual projeto ou cliente. Se o cliente gerencia vários fornecedores,
              ele vai agradecer a clareza.
            </p>
          </Section>

          <Section title="Modelo de email para enviar proposta comercial">
            <p className="text-sm leading-relaxed text-fg-muted mb-5">
              Abaixo está um modelo que você pode adaptar para qualquer tipo de projeto. A
              estrutura é simples: contextualiza, apresenta, orienta e convida ao próximo passo.
            </p>

            <div className="rounded-sm border border-border bg-bg-subtle p-6 font-mono text-xs leading-relaxed text-fg-base">
              <p className="mb-4">
                <span className="text-fg-muted">Para:</span> cliente@empresa.com.br
              </p>
              <p className="mb-4">
                <span className="text-fg-muted">Assunto:</span> Proposta comercial — [descrição
                breve do projeto]
              </p>
              <hr className="mb-4 border-border" />
              <p className="mb-4">Olá, [Nome do cliente],</p>
              <p className="mb-4">
                Obrigado pela conversa [ontem / na última semana / em [data]]. Foi muito útil
                entender melhor o que vocês precisam para [objetivo do projeto: ex. "o lançamento
                do novo site" / "a campanha de março" / "a identidade visual da marca"].
              </p>
              <p className="mb-4">
                Segue em anexo a proposta comercial com o escopo completo, o investimento e as
                condições de pagamento. Preparei o documento com base em tudo que conversamos,
                então está bastante personalizado para a realidade de vocês.
              </p>
              <p className="mb-4">
                Alguns pontos que destaco na proposta:
              </p>
              <p className="mb-1">
                — [Ponto de valor 1: ex. "Prazo de entrega de 3 semanas com dois rounds de
                revisão incluídos"]
              </p>
              <p className="mb-1">
                — [Ponto de valor 2: ex. "Pagamento dividido em duas etapas para facilitar o
                fluxo de caixa"]
              </p>
              <p className="mb-4">
                — [Ponto de valor 3: ex. "Inclui treinamento para a equipe usar o painel do
                site"]
              </p>
              <p className="mb-4">
                A proposta tem validade até [data, ex: 10 de abril]. Se tiver qualquer dúvida
                ou quiser conversar sobre algum ajuste, é só responder este email ou me chamar
                pelo WhatsApp.
              </p>
              <p className="mb-4">Fico à disposição,</p>
              <p>[Seu nome]</p>
              <p>[Seu WhatsApp ou telefone]</p>
              <p>[Seu site ou portfólio — opcional]</p>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-fg-muted">
              Personalize os três pontos de destaque com as partes mais relevantes da sua
              proposta específica. Esses itens funcionam como um "resumo executivo" para o
              cliente que vai ler o email antes de abrir o PDF — ou para o cliente que precisa
              repassar a proposta para outra pessoa dentro da empresa.
            </p>
          </Section>

          <Section title="O que não escrever no email de proposta">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Alguns erros aparecem com frequência em emails de proposta e minam a credibilidade
              do freelancer antes mesmo do cliente abrir o anexo.
            </p>
            <ul className="space-y-4">
              {[
                {
                  erro: 'Email vazio com apenas o PDF anexado',
                  explicacao:
                    'Parece preguiça. O cliente não sabe se deve abrir, se é spam ou se foi enviado por engano. Sempre escreva ao menos um parágrafo de contexto.',
                },
                {
                  erro: '"Conforme combinado, segue em anexo."',
                  explicacao:
                    'É a frase mais genérica possível. Não contextualiza nada, não gera confiança e não convida ao próximo passo.',
                },
                {
                  erro: 'Pedir desculpas pelo preço antes mesmo de apresentá-lo',
                  explicacao:
                    'Frases como "sei que o valor pode parecer alto, mas..." destroem sua posição de autoridade. Apresente o valor com confiança — o PDF já explica o que está incluído.',
                },
                {
                  erro: 'Email longo demais com toda a proposta no corpo',
                  explicacao:
                    'O PDF existe justamente para apresentar os detalhes de forma organizada. O corpo do email deve ser curto e direto: máximo quatro parágrafos.',
                },
                {
                  erro: 'Não definir o próximo passo',
                  explicacao:
                    'Termine sempre com uma ação clara: "responda este email", "podemos agendar uma ligação rápida", "me avise até sexta se tiver dúvidas".',
                },
              ].map((item) => (
                <li key={item.erro} className="flex items-start gap-2 list-none">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <div>
                    <p className="font-medium text-fg-base">{item.erro}</p>
                    <p className="mt-1 text-fg-muted">{item.explicacao}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Quando enviar a proposta?">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O timing do envio afeta diretamente a taxa de resposta. Algumas diretrizes práticas:
            </p>
            <ul className="space-y-3">
              {[
                {
                  dica: 'Envie nas primeiras 24 horas após a reunião',
                  detalhe:
                    'O cliente ainda tem o contexto fresco na cabeça. Depois de 48 horas, o entusiasmo cai e surgem outras prioridades.',
                },
                {
                  dica: 'Prefira terça, quarta ou quinta-feira',
                  detalhe:
                    'Segunda o cliente está sobrecarregado com a semana. Sexta ele já está no modo fim de semana. O meio da semana tem as melhores taxas de abertura e resposta.',
                },
                {
                  dica: 'Horário comercial: entre 9h e 11h ou entre 14h e 16h',
                  detalhe:
                    'Evite enviar no início da manhã (a caixa de entrada está cheia de outros emails) e depois das 17h (fora do horário de decisão).',
                },
                {
                  dica: 'Não envie na sexta de tarde ou véspera de feriado',
                  detalhe:
                    'Proposta que chega na sexta às 17h corre o risco de ser esquecida no fim de semana e sumir no volume de emails da segunda-feira.',
                },
              ].map((item) => (
                <li key={item.dica} className="flex items-start gap-2 list-none">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <div>
                    <p className="font-medium text-fg-base">{item.dica}</p>
                    <p className="mt-1 text-fg-muted">{item.detalhe}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-fg-muted">
              Se você perdeu a janela ideal, não espere mais. Envie assim que possível. Um email
              fora do horário perfeito é infinitamente melhor do que uma proposta atrasada.
            </p>
          </Section>

          <Section title="Follow-up: o que fazer se não responderem">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O silêncio depois de enviar uma proposta é desconcertante — mas raramente significa
              "não". Na maioria dos casos o cliente ficou ocupado, esqueceu de responder ou está
              aguardando aprovação interna.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              A regra básica: aguarde de três a cinco dias úteis e então envie um follow-up
              curto, sem pressão. Algo como:
            </p>
            <div className="rounded-sm border border-border bg-bg-subtle p-4 font-mono text-xs leading-relaxed text-fg-base mb-4">
              <p className="mb-2">
                <span className="text-fg-muted">Assunto:</span> Re: Proposta comercial — [projeto]
              </p>
              <hr className="mb-3 border-border" />
              <p className="mb-3">Olá, [Nome],</p>
              <p className="mb-3">
                Passando para verificar se você teve a oportunidade de analisar a proposta. Se
                tiver alguma dúvida ou quiser conversar sobre algum ajuste, estou à disposição.
              </p>
              <p>[Seu nome]</p>
            </div>
            <p className="text-sm leading-relaxed text-fg-muted">
              Não mencione que está esperando a resposta há dias. Não cobre. Só reabra a
              conversa com leveza. Para estratégias mais detalhadas de follow-up —
              incluindo quantas vezes insistir e quando parar —
              confira nosso guia completo sobre{' '}
              <Link
                href="/blog/follow-up-proposta-comercial"
                className="text-fg-base underline underline-offset-2 hover:text-accent"
              >
                como fazer follow-up de proposta comercial
              </Link>
              .
            </p>
          </Section>

          {/* CTA */}
          <div className="mt-12 rounded-sm border border-border bg-bg-subtle p-8">
            <h2 className="mb-3 text-xl font-medium text-fg-base">
              Crie a proposta perfeita para enviar
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-fg-muted">
              De nada adianta mandar um email impecável se a proposta em PDF não tiver a mesma
              qualidade. O PropFreela gera propostas comerciais profissionais em segundos —
              você preenche as informações, escolhe o template e baixa o PDF pronto para anexar.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-fg-muted">
              Plano gratuito com 3 propostas por mês. Sem cartão de crédito.
            </p>
            <Link
              href="/login"
              className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              Criar minha primeira proposta grátis →
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
      <h2 className="mb-3 mt-10 text-xl font-medium text-fg-base">{title}</h2>
      <div>{children}</div>
    </div>
  )
}
