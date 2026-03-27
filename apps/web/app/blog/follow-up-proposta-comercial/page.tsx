import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Como fazer follow-up de proposta comercial sem parecer chato — PropFreela',
  description:
    'Aprenda quando e como fazer follow-up depois de enviar uma proposta comercial. Modelos de mensagem prontos para WhatsApp e email.',
  openGraph: {
    title: 'Como fazer follow-up de proposta comercial sem parecer chato',
    description:
      'Aprenda quando e como fazer follow-up depois de enviar uma proposta comercial. Modelos de mensagem prontos para WhatsApp e email.',
    type: 'article',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/blog/follow-up-proposta-comercial',
  },
}

export default function FollowUpPropostaPage() {
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
          Como fazer follow-up de proposta comercial sem parecer chato
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          A maioria dos freelancers manda a proposta e fica esperando. Isso é um erro. O follow-up
          é parte do processo comercial — e quem domina essa etapa fecha muito mais contratos.
        </p>

        <article className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="Por que o follow-up é parte da proposta">
            <p>
              Quando você envia uma proposta e fica em silêncio total, está deixando a decisão
              100% nas mãos do cliente. O problema é que o cliente tem a própria vida: reuniões,
              demandas urgentes, outros fornecedores para avaliar. Você some da cabeça dele.
            </p>
            <p>
              O follow-up não é insistência. É profissionalismo. É demonstrar que você leva o
              projeto a sério e que está disponível para tirar dúvidas. Profissionais de vendas
              experientes sabem que a maioria dos fechamentos acontece após o terceiro contato —
              não no primeiro.
            </p>
            <p>
              Além disso, o silêncio do cliente quase nunca significa "não". Significa que ele
              ainda não decidiu, que a proposta ficou perdida na caixa de entrada ou que ele
              simplesmente esqueceu de responder. Um follow-up gentil resolve isso em segundos.
            </p>
          </Section>

          <Section title="Quando fazer o follow-up?">
            <p>
              O timing certo evita que você pareça ansioso ou invasivo. Siga esta sequência como
              ponto de partida e ajuste conforme o perfil do cliente:
            </p>
            <ul className="space-y-4">
              {[
                {
                  tempo: '2 a 3 dias após o envio',
                  texto:
                    'Esse é o primeiro follow-up. Curto, objetivo, sem cobrança. Apenas confirme que a proposta chegou e se há dúvidas. A maioria dos clientes que vai fechar responde aqui.',
                },
                {
                  tempo: '7 dias após o envio',
                  texto:
                    'Se não houve resposta, tente uma segunda vez. Agora você pode adicionar um elemento de urgência real — como a validade da proposta ou a disponibilidade da sua agenda para o período combinado.',
                },
                {
                  tempo: '14 dias após o envio',
                  texto:
                    'Terceira e última tentativa. Seja direto: diga que vai encerrar a proposta caso não haja retorno. Isso não é agressivo — é respeito pelo seu tempo e pelo tempo dele.',
                },
              ].map((item) => (
                <li key={item.tempo} className="flex gap-4">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <div>
                    <p className="font-medium text-fg-base">{item.tempo}</p>
                    <p className="mt-1">{item.texto}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p>
              Nunca desista depois do primeiro silêncio. Estudos de vendas B2B mostram que mais
              de 80% dos contratos exigem pelo menos cinco pontos de contato. Para freelancers,
              três tentativas bem espaçadas já colocam você muito à frente da concorrência.
            </p>
          </Section>

          <Section title="Modelo de follow-up por email">
            <p>
              O email de follow-up deve ser curto, educado e ter um único objetivo: fazer o
              cliente dar o próximo passo. Evite textos longos — o cliente já leu a proposta
              completa. Use este modelo como base:
            </p>
            <div className="rounded-sm border border-border bg-bg-subtle p-6 text-xs leading-relaxed text-fg-base font-mono">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Modelo — Email de follow-up (1ª tentativa)
              </p>
              <p>Assunto: Proposta [Nome do Projeto] — alguma dúvida?</p>
              <br />
              <p>Olá, [Nome do cliente],</p>
              <br />
              <p>
                Enviei a proposta para [nome do projeto] na [data] e queria confirmar se chegou
                direitinho. Se tiver alguma dúvida sobre o escopo, valores ou prazo, estou à
                disposição para conversar.
              </p>
              <br />
              <p>
                Caso queira ajustar algum item antes de avançar, me fala — tenho flexibilidade
                para adaptar a proposta à sua necessidade.
              </p>
              <br />
              <p>Abraços,</p>
              <p>[Seu nome]</p>
            </div>
            <p className="mt-4">
              Para o segundo email (7 dias), mantenha o mesmo tom mas adicione contexto de
              urgência real — por exemplo, sua disponibilidade de agenda ou a validade da proposta.
              Nunca invente urgência: o cliente percebe e isso prejudica sua credibilidade.
            </p>
          </Section>

          <Section title="Modelo de follow-up por WhatsApp">
            <p>
              O WhatsApp é mais informal e direto. Mensagens longas são ignoradas — vá ao ponto.
              Use apenas se você já teve contato anterior por WhatsApp com o cliente; se a
              comunicação foi por email, mantenha o email.
            </p>
            <div className="rounded-sm border border-border bg-bg-subtle p-6 text-xs leading-relaxed text-fg-base font-mono">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Modelo — WhatsApp de follow-up (1ª tentativa)
              </p>
              <p>
                Oi, [Nome]! Tudo bem? Enviei a proposta do [projeto] semana passada. Conseguiu
                dar uma olhada? Se tiver alguma dúvida, pode me chamar aqui mesmo. 👍
              </p>
            </div>
            <div className="mt-4 rounded-sm border border-border bg-bg-subtle p-6 text-xs leading-relaxed text-fg-base font-mono">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Modelo — WhatsApp de follow-up (2ª tentativa, 7 dias depois)
              </p>
              <p>
                Oi, [Nome]! Passando pra avisar que a proposta que mandei tem validade até
                [data]. Depois disso precisaria rever os valores por conta da minha agenda.
                Ainda faz sentido avançar? Me fala qualquer coisa!
              </p>
            </div>
            <p className="mt-4">
              Evite mensagens de áudio no follow-up comercial. O cliente pode estar em uma
              reunião e o áudio cria atrito desnecessário. Texto é mais fácil de responder na hora.
            </p>
          </Section>

          <Section title="O que fazer se o cliente disser que está caro">
            <p>
              Objeção de preço é o sinal mais comum — e o mais mal interpretado. Na maioria das
              vezes, "está caro" não significa "não tenho dinheiro". Significa "ainda não vi
              valor suficiente para justificar esse investimento".
            </p>
            <p>
              Sua primeira reação não deve ser dar desconto imediatamente. Isso desvaloriza seu
              trabalho e sinaliza que o preço original era inflado. Em vez disso:
            </p>
            <ul className="space-y-3">
              {[
                'Pergunte o que está fora do orçamento dele — valor total, forma de pagamento ou prazo?',
                'Ofereça uma versão reduzida do escopo pelo valor que ele tem disponível. Isso mostra flexibilidade sem queimar seu preço.',
                'Apresente o ROI do projeto: quanto ele pode ganhar ou economizar com o que você vai entregar?',
                'Se ele realmente não tem o orçamento, proponha um parcelamento diferente. "50% agora e 50% na entrega" pode resolver.',
                'Nunca dê desconto sem tirar algo do escopo. Desconto sem contrapartida cria um precedente ruim.',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <span className="mt-0.5 shrink-0 text-accent">—</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="O que fazer se o cliente sumir">
            <p>
              Ghosting é frustrante, mas é parte da realidade de qualquer freelancer. O cliente
              que some geralmente está com outras prioridades — não necessariamente descartou sua
              proposta.
            </p>
            <p>
              O erro mais comum é continuar tentando contato da mesma forma e esperando um
              resultado diferente. Se ele não respondeu ao email, tente o WhatsApp. Se não
              respondeu ao WhatsApp, ligue uma vez. Se não atendeu, deixe uma mensagem de voz
              curta e objetiva.
            </p>
            <p>
              Depois de três tentativas em canais diferentes, envie um email de encerramento.
              Esse email é contraintuitivo, mas altamente eficaz:
            </p>
            <div className="rounded-sm border border-border bg-bg-subtle p-6 text-xs leading-relaxed text-fg-base font-mono">
              <p className="mb-3 font-sans text-xs font-medium uppercase tracking-[0.1em] text-fg-muted">
                Modelo — Email de encerramento (cliente sumiu)
              </p>
              <p>Assunto: Encerrando a proposta de [projeto]</p>
              <br />
              <p>Olá, [Nome],</p>
              <br />
              <p>
                Tentei entrar em contato algumas vezes nas últimas semanas e não tive retorno.
                Imagino que suas prioridades mudaram, o que é completamente normal.
              </p>
              <br />
              <p>
                Vou encerrar a proposta de [projeto] por aqui. Caso queira retomar no futuro,
                é só me chamar — terei prazer em atualizar os valores e a disponibilidade de agenda.
              </p>
              <br />
              <p>Abraços e boa sorte no projeto,</p>
              <p>[Seu nome]</p>
            </div>
            <p className="mt-4">
              Esse tipo de mensagem frequentemente provoca uma resposta imediata. O cliente
              sente que está perdendo algo e decide agir. Mesmo que não responda, você encerrou
              o ciclo com profissionalismo e pode seguir em frente sem culpa.
            </p>
          </Section>

          <Section title="Quantas vezes tentar contato?">
            <p>
              A regra prática para freelancers é: <strong className="text-fg-base">três tentativas,
              dois canais diferentes, no máximo 15 dias</strong>. Veja como estruturar:
            </p>
            <ul className="space-y-4">
              {[
                {
                  n: '1ª',
                  titulo: 'Dia 2–3: primeiro follow-up',
                  desc: 'Confirme o recebimento da proposta e abra espaço para dúvidas. Canal principal (email ou WhatsApp, o mesmo que usou para enviar a proposta).',
                },
                {
                  n: '2ª',
                  titulo: 'Dia 7: segundo follow-up',
                  desc: 'Adicione urgência real (validade da proposta, agenda). Se o canal principal não funcionou, tente o secundário.',
                },
                {
                  n: '3ª',
                  titulo: 'Dia 14: encerramento',
                  desc: 'Informe que vai encerrar a proposta. Tom gentil, sem pressão. Deixe a porta aberta para contato futuro.',
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm bg-accent text-xs font-medium text-accent-fg">
                    {item.n}
                  </span>
                  <div>
                    <p className="font-medium text-fg-base">{item.titulo}</p>
                    <p className="mt-1">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p>
              Depois de três tentativas sem resposta, encerre o ciclo internamente. Marque o
              lead como inativo no seu controle e siga para o próximo. Insistir além disso
              raramente converte e ainda queima sua reputação.
            </p>
            <p>
              Uma dica importante: documente tudo. Guarde as datas de cada tentativa, o canal
              usado e o conteúdo da mensagem. Se o cliente voltar meses depois, você terá
              contexto completo para retomar a conversa de forma profissional.
            </p>
          </Section>

          <div className="rounded-sm border border-border bg-bg-subtle p-8">
            <h2 className="mb-3 text-base font-medium text-fg-base">
              Envie propostas que facilitam o follow-up
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-fg-muted">
              O <strong className="text-fg-base">PropFreela</strong> gera um link compartilhável
              para cada proposta — sem precisar enviar arquivo em anexo. O cliente abre direto no
              navegador, em qualquer dispositivo. Você sabe exatamente o que enviar no follow-up
              e o cliente não precisa procurar o PDF na caixa de entrada.
            </p>
            <p className="mb-6 text-sm leading-relaxed text-fg-muted">
              Crie sua primeira proposta grátis em menos de 5 minutos. Plano gratuito inclui
              3 propostas por mês com link de compartilhamento.
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
      <h2 className="mb-4 text-xl font-medium text-fg-base">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
