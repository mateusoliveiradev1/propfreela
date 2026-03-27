import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Freelancer: MEI ou PJ? Qual é a melhor opção em 2025 — PropFreela',
  description:
    'MEI ou abrir PJ como freelancer? Entenda as diferenças, limites de faturamento, impostos e qual é a melhor escolha para o seu perfil.',
  openGraph: {
    title: 'Freelancer: MEI ou PJ? Qual é a melhor opção em 2025',
    description:
      'MEI ou abrir PJ como freelancer? Entenda as diferenças, limites de faturamento, impostos e qual é a melhor escolha para o seu perfil.',
    type: 'article',
    locale: 'pt_BR',
  },
  alternates: {
    canonical: '/blog/freelancer-mei-ou-pj',
  },
}

export default function FreelancerMeiOuPjPage() {
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
          Freelancer: MEI ou PJ? Qual é a melhor opção em 2025
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          A maioria dos freelancers começa sem CNPJ — e perde dinheiro com isso. Entenda as diferenças
          entre MEI e abrir uma empresa, os limites de faturamento, os impostos e qual é a melhor escolha
          para o seu momento.
        </p>

        <article className="prose-custom space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="Por que formalizar como freelancer?">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Trabalhar como pessoa física parece mais simples no começo, mas gera uma série de
              desvantagens práticas que vão se acumulando com o tempo.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>
                <strong className="text-fg-base">Credibilidade com clientes maiores:</strong> empresas
                médias e grandes geralmente só contratam prestadores de serviço com CNPJ. Sem ele,
                você fica fora de muitos processos seletivos.
              </li>
              <li>
                <strong className="text-fg-base">Emissão de nota fiscal:</strong> sem CNPJ você não
                emite NF, e muitos clientes exigem nota para poder pagar. Trabalhar sem NF também
                expõe o cliente a problemas fiscais.
              </li>
              <li>
                <strong className="text-fg-base">Vantagem tributária:</strong> como PF, você paga
                Imposto de Renda na tabela progressiva, que chega a 27,5%. Como PJ no Simples
                Nacional, a alíquota efetiva pode ser significativamente menor.
              </li>
              <li>
                <strong className="text-fg-base">Acesso a crédito e financiamentos:</strong> ter
                CNPJ ativo facilita a obtenção de crédito, linhas de capital de giro e até
                financiamentos com juros menores para pessoa jurídica.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Formalizar não é só uma questão burocrática — é uma decisão estratégica que afeta
              diretamente quanto dinheiro você leva para casa no final do mês.
            </p>
          </Section>

          <Section title="O que é MEI e para quem serve">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O MEI (Microempreendedor Individual) é a forma mais simples de ter CNPJ no Brasil.
              Foi criado especificamente para formalizar trabalhadores autônomos com um processo
              burocrático mínimo.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Limite de faturamento:</strong> R$81.000 por ano
              (aproximadamente R$6.750 por mês). Se você ultrapassar esse valor, precisa se
              desenquadrar e abrir uma empresa convencional.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Tributação:</strong> o MEI paga uma guia mensal fixa
              chamada DAS-MEI. Em 2025, o valor é de aproximadamente R$75,90 para serviços
              (INSS + ISS). Não há declaração mensal de impostos sobre o faturamento — apenas a
              guia fixa e a declaração anual simplificada (DASN-SIMEI).
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Vantagens do MEI:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>Abertura gratuita e 100% online no Portal do Empreendedor</li>
              <li>Sem contador obrigatório (declaração anual é simples)</li>
              <li>Custo fixo mensal baixo e previsível</li>
              <li>Acesso ao INSS (aposentadoria, afastamento por doença, licença-maternidade)</li>
              <li>Pode ter conta bancária PJ e cartão de crédito PJ</li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Limitações importantes:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>Não pode ter sócio</li>
              <li>Não pode ter mais de um funcionário registrado</li>
              <li>Nem todas as atividades são permitidas para MEI — serviços de TI e design
                geralmente estão, mas consulte a lista oficial no CCMEI</li>
              <li>Limite de R$81.000/ano é rígido: ultrapassar obriga o desenquadramento</li>
              <li>Não pode participar como sócio em outra empresa</li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O MEI é ideal para quem está começando, fatura até R$6.750/mês e quer a forma mais
              simples e barata de ter CNPJ.
            </p>
          </Section>

          <Section title="Abrir empresa (LTDA ou SLU): quando vale a pena?">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Quando o MEI já não comporta sua operação, a alternativa é abrir uma empresa no regime
              de Microempresa (ME) ou Empresa de Pequeno Porte (EPP), enquadrando no Simples Nacional.
              As formas jurídicas mais comuns para freelancers são:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>
                <strong className="text-fg-base">SLU (Sociedade Limitada Unipessoal):</strong> empresa
                individual, sem necessidade de sócio. Substituiu a EIRELI. É a opção mais indicada
                para freelancers que trabalham sozinhos mas precisam de mais do que o MEI oferece.
              </li>
              <li>
                <strong className="text-fg-base">LTDA (Sociedade Limitada):</strong> exige pelo menos
                dois sócios. Indicada se você tem um parceiro de negócios ou deseja dividir a
                sociedade com alguém.
              </li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Quando abrir uma empresa vale a pena:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>Você já fatura acima de R$81.000 por ano (ou está próximo disso)</li>
              <li>Clientes grandes exigem contrato com CNPJ de empresa (não MEI)</li>
              <li>Você quer fazer planejamento tributário mais sofisticado (pro-labore + distribuição
                de lucros)</li>
              <li>Pretende ter sócios no futuro</li>
              <li>Sua atividade não está na lista de atividades permitidas para MEI</li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              A abertura de uma empresa exige contador, tem custos mensais (honorários contábeis
              de R$200 a R$600 dependendo da região) e obrigações acessórias mais complexas. Mas
              o ganho em otimização tributária e credibilidade costuma compensar para quem está
              nesse nível.
            </p>
          </Section>

          <Section title="MEI vs PJ: comparação prática">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Veja as principais diferenças lado a lado:
            </p>

            {/* Comparison table using divs */}
            <div className="rounded-sm border border-border text-sm">
              {/* Header */}
              <div className="grid grid-cols-3 gap-4 border-b border-border px-4 pb-3 pt-3">
                <span className="font-medium text-fg-base">Critério</span>
                <span className="font-medium text-fg-base">MEI</span>
                <span className="font-medium text-fg-base">Empresa (SLU/LTDA)</span>
              </div>

              {[
                {
                  label: 'Limite de faturamento',
                  mei: 'R$81.000/ano',
                  pj: 'Até R$4,8 mi/ano (Simples)',
                },
                {
                  label: 'Custo mensal mínimo',
                  mei: '~R$75,90 (DAS fixo)',
                  pj: 'Imposto % faturamento + contador (~R$200–600)',
                },
                {
                  label: 'Abertura',
                  mei: 'Gratuita, online, imediata',
                  pj: 'Pago, precisa de contador, 5–15 dias',
                },
                {
                  label: 'Contador obrigatório',
                  mei: 'Não',
                  pj: 'Sim',
                },
                {
                  label: 'Emissão de NF',
                  mei: 'Sim (com restrições por cidade)',
                  pj: 'Sim, sem restrições',
                },
                {
                  label: 'Sócios',
                  mei: 'Não permite',
                  pj: 'Permitido (LTDA)',
                },
                {
                  label: 'Funcionários',
                  mei: 'Máximo 1',
                  pj: 'Sem limite',
                },
                {
                  label: 'Acesso ao INSS',
                  mei: 'Sim (contribuição inclusa)',
                  pj: 'Via pro-labore (obrigatório)',
                },
                {
                  label: 'Complexidade',
                  mei: 'Muito baixa',
                  pj: 'Média',
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 gap-4 px-4 py-2 text-sm${i < 8 ? ' border-b border-border' : ''}`}
                >
                  <span className="text-fg-muted">{row.label}</span>
                  <span className="text-fg-base">{row.mei}</span>
                  <span className="text-fg-base">{row.pj}</span>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Posso emitir nota fiscal como MEI?">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Sim. O MEI pode emitir Nota Fiscal de Serviços Eletrônica (NFS-e) para os clientes.
              O processo varia de cidade para cidade, pois a NFS-e é administrada pelos municípios.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Na maioria das prefeituras, basta acessar o portal da Nota Fiscal eletrônica do
              município, cadastrar seu CNPJ de MEI e começar a emitir. Algumas cidades facilitaram
              bastante o processo nos últimos anos.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Atenção:</strong> o ISS (Imposto sobre Serviços) já
              está incluso na guia DAS-MEI que você paga mensalmente. Então ao emitir a nota, você
              não paga ISS novamente — ele já foi recolhido. Confira com a prefeitura da sua cidade
              para confirmar esse procedimento, pois pode haver variações locais.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Para emitir NF para outras empresas (B2B), o CNPJ de MEI é suficiente e amplamente
              aceito. A percepção de que "MEI não vale como nota fiscal" é um mito — a nota tem
              validade fiscal igual à de qualquer outra empresa.
            </p>
          </Section>

          <Section title="Qual é a alíquota de imposto?">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Para freelancers que prestam serviços e optam pelo Simples Nacional (o regime mais
              comum para MEI e pequenas empresas), os impostos seguem tabelas progressivas chamadas
              Anexos.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">MEI:</strong> pagamento fixo mensal de
              aproximadamente R$75,90 (para serviços), independentemente do faturamento. Isso
              equivale a uma alíquota efetiva muito baixa para quem fatura próximo ao limite —
              menos de 2% sobre R$81.000/ano.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Empresa no Simples Nacional — Anexo III
              (serviços de tecnologia, design e comunicação):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-fg-muted">
              <li>Faturamento até R$180.000/ano: alíquota efetiva de ~6%</li>
              <li>De R$180.001 a R$360.000/ano: alíquota efetiva de ~11,2%</li>
              <li>De R$360.001 a R$720.000/ano: alíquota efetiva de ~13,5%</li>
            </ul>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Anexo V</strong> (consultorias, certas atividades
              intelectuais) tem alíquotas mais altas — começando em ~15,5%. Seu contador vai
              indicar em qual Anexo sua atividade se enquadra.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Compare com a tributação como pessoa física: na tabela progressiva do IRPF, rendimentos
              acima de R$4.664,68/mês já pagam 27,5% de IR (mais outros encargos). A diferença de
              carga tributária entre PF e PJ bem estruturada pode representar dezenas de milhares
              de reais por ano.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              <strong className="text-fg-base">Importante:</strong> esses são valores de referência.
              A alíquota exata depende do histórico de faturamento dos últimos 12 meses, da atividade
              exercida e da cidade (o ISS municipal varia). Sempre consulte um contador para calcular
              sua carga tributária real.
            </p>
          </Section>

          <Section title="Minha recomendação: quando abrir o quê">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Aqui está um guia direto para ajudar na sua decisão:
            </p>

            <div className="space-y-4">
              <div className="rounded-sm border border-border p-4">
                <p className="mb-1 text-sm font-medium text-fg-base">
                  Está começando e fatura menos de R$4.000/mês
                </p>
                <p className="text-sm text-fg-muted">
                  Abra o MEI agora. É gratuito, leva minutos e resolve imediatamente seus problemas
                  com nota fiscal e credibilidade. Não tem motivo para adiar.
                </p>
              </div>

              <div className="rounded-sm border border-border p-4">
                <p className="mb-1 text-sm font-medium text-fg-base">
                  Fatura entre R$4.000 e R$6.750/mês (até R$81k/ano)
                </p>
                <p className="text-sm text-fg-muted">
                  O MEI ainda cobre. Mas atenção: se você estiver crescendo, planeje a transição para
                  empresa com antecedência. Ultrapassar o limite no meio do ano gera complicações
                  fiscais.
                </p>
              </div>

              <div className="rounded-sm border border-border p-4">
                <p className="mb-1 text-sm font-medium text-fg-base">
                  Fatura acima de R$6.750/mês ou prevê isso em breve
                </p>
                <p className="text-sm text-fg-muted">
                  Abra uma SLU (Sociedade Limitada Unipessoal) no Simples Nacional. Contrate um
                  contador desde o início — o custo mensal vale o ganho em otimização tributária e
                  a tranquilidade de estar em conformidade.
                </p>
              </div>

              <div className="rounded-sm border border-border p-4">
                <p className="mb-1 text-sm font-medium text-fg-base">
                  Tem sócios ou planeja tê-los
                </p>
                <p className="text-sm text-fg-muted">
                  LTDA é a escolha certa. Defina o contrato social com cuidado — as participações
                  e regras de saída precisam estar claras desde o início.
                </p>
              </div>

              <div className="rounded-sm border border-border p-4">
                <p className="mb-1 text-sm font-medium text-fg-base">
                  Sua atividade não está na lista do MEI
                </p>
                <p className="text-sm text-fg-muted">
                  Vá direto para SLU. Não adianta tentar encaixar a atividade de forma incorreta —
                  isso pode gerar problemas na fiscalização.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-fg-muted mb-4 mt-6">
              Independentemente da escolha, o passo mais importante é dar o primeiro passo. Freelancer
              sem CNPJ está deixando dinheiro na mesa — tanto em oportunidades perdidas quanto em
              impostos pagos a mais como pessoa física.
            </p>
          </Section>

          <Section title="Enquanto isso, profissionalize suas propostas">
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              Ter CNPJ é um passo importante — mas de nada adianta se a sua proposta comercial ainda
              parece feita no Bloco de Notas. Clientes avaliam sua credibilidade antes de assinar
              qualquer contrato, e o documento que você envia diz muito sobre como você trabalha.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O <strong className="text-fg-base">PropFreela</strong> foi criado para freelancers
              brasileiros que querem criar propostas profissionais em PDF sem perder tempo com
              formatação. Preencha os dados do projeto, escolha o template e baixe o PDF em segundos
              — com seu nome, CNPJ e os detalhes do cliente já formatados corretamente.
            </p>
            <p className="text-sm leading-relaxed text-fg-muted mb-4">
              O plano gratuito permite 3 propostas por mês. Sem cartão de crédito.
            </p>
            <Link
              href="/login"
              className="mt-2 inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
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
      <h2 className="text-xl font-medium text-fg-base mb-3 mt-10">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}
