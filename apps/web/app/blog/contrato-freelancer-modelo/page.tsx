import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contrato de prestação de serviços para freelancer: modelo e dicas — PropFreela',
  description:
    'Modelo de contrato para freelancer com as clausulas essenciais: escopo, prazo, valor, propriedade intelectual e rescisao.',
  openGraph: {
    title: 'Contrato para freelancer: modelo e clausulas essenciais',
    description: 'Proteja seu trabalho com um contrato claro. Guia completo com modelo comentado.',
    type: 'article',
    locale: 'pt_BR',
  },
}

export default function ContratoFreelancerPage() {
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
          Contrato de prestacao de servicos para freelancer
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Trabalhar sem contrato e arriscar seu tempo, dinheiro e reputacao. Um contrato claro
          protege tanto voce quanto o cliente — e profissionaliza a relacao desde o inicio.
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">
              1. Por que usar contrato
            </h2>
            <p>
              Freelancers frequentemente evitam contratos por parecerem "formais demais" para
              projetos pequenos. Mas e exatamente nesses projetos que surgem os maiores problemas:
              escopo que cresce sem fim (scope creep), cliente que some sem pagar, brigas sobre
              o que estava ou nao incluso.
            </p>
            <p>
              Um contrato nao precisa ser um documento juridico complexo. Pode ser um email
              formal ou um PDF simples com os pontos essenciais. O que importa e que ambas as
              partes concordem e assinem antes do trabalho comecar.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">2. Clausulas essenciais</h2>
            <div className="space-y-4">
              {[
                {
                  titulo: 'Identificacao das partes',
                  desc: 'Nome completo (ou razao social), CPF/CNPJ e endereco de ambos. Simples, mas obrigatorio.',
                },
                {
                  titulo: 'Objeto do contrato (escopo)',
                  desc: 'Descreva com precisao o que sera entregue: paginas, funcionalidades, revisoes incluidas. O que nao esta escrito, nao foi contratado.',
                },
                {
                  titulo: 'Valor e forma de pagamento',
                  desc: 'Valor total, parcelamento (ex: 50% entrada + 50% na entrega) e prazo para pagamento. Inclua encargos por atraso.',
                },
                {
                  titulo: 'Prazo de entrega',
                  desc: 'Data de inicio, marcos intermediarios e prazo final. Deixe claro que o prazo depende de feedbacks e aprovacoes do cliente em tempo habil.',
                },
                {
                  titulo: 'Revisoes',
                  desc: 'Quantas rodadas de revisao estao incluidas e o que acontece alem disso (cobranca adicional por hora).',
                },
                {
                  titulo: 'Propriedade intelectual',
                  desc: 'Os arquivos so passam para o cliente apos pagamento integral. Voce pode mencionar o projeto no portfolio.',
                },
                {
                  titulo: 'Rescisao',
                  desc: 'O que acontece se uma das partes quiser cancelar: reembolso proporcional ao que foi entregue, aviso previo minimo.',
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
              3. Modelo simplificado comentado
            </h2>
            <div className="rounded-sm border border-border bg-bg-subtle p-5 text-xs leading-relaxed">
              <p className="mb-3 font-medium text-fg-base">CONTRATO DE PRESTACAO DE SERVICOS</p>
              <p className="mb-2">
                <strong className="text-fg-base">Contratante:</strong> [Nome do cliente], CPF/CNPJ [xxx], residente em [endereco].
              </p>
              <p className="mb-4">
                <strong className="text-fg-base">Contratado:</strong> [Seu nome], CPF/CNPJ [xxx], residente em [endereco].
              </p>
              <p className="mb-2 font-medium text-fg-base">Clausula 1a — Objeto</p>
              <p className="mb-4">
                O Contratado se compromete a desenvolver [descricao detalhada do projeto], conforme
                proposta comercial anexa datada de [data].
              </p>
              <p className="mb-2 font-medium text-fg-base">Clausula 2a — Valor e pagamento</p>
              <p className="mb-4">
                O valor total e de R$ [xxx], pago em [forma]. Atraso implica multa de 2% + juros
                de 0,5% ao mes.
              </p>
              <p className="mb-2 font-medium text-fg-base">Clausula 3a — Prazo</p>
              <p className="mb-4">
                Prazo de entrega: [X] dias uteis apos pagamento da entrada e recebimento de todos
                os materiais necessarios.
              </p>
              <p className="mb-2 font-medium text-fg-base">Clausula 4a — Propriedade intelectual</p>
              <p className="mb-4">
                A propriedade dos arquivos sera transferida ao Contratante apos quitacao integral.
                O Contratado tem direito de usar o projeto em portfolio.
              </p>
              <p className="text-fg-placeholder">
                [Data, local e assinaturas de ambas as partes]
              </p>
            </div>
            <p>
              Este e um modelo simplificado. Para projetos acima de R$5.000 ou com NDA envolvido,
              considere a revisao de um advogado.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-base font-medium text-fg-base">4. Dicas praticas</h2>
            <ul className="space-y-2">
              {[
                'Envie o contrato junto com a proposta, nao depois. Faz parte do processo profissional.',
                'Use ferramentas de assinatura digital gratuitas: DocuSign (plano free), Assine Online, ou ate PDF assinado + selfie.',
                'O contrato pode referenciar a proposta comercial como anexo — isso evita repeticao.',
                'Nunca comece a trabalhar sem pelo menos a entrada paga E o contrato assinado.',
                'Guarde tudo: emails, contratos, notas fiscais. Pelo menos 5 anos.',
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
              A proposta comercial e o primeiro passo antes do contrato. Crie propostas
              profissionais em PDF com a PropFreela — com escopo gerado por IA, templates
              bonitos e link de aprovacao para o cliente.
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
