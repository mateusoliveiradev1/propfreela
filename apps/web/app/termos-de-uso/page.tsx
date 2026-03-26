import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Termos de Uso — PropFreela',
  description: 'Termos e condições de uso da plataforma PropFreela.',
}

export default function TermosPage() {
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
            Entrar
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
          Legal
        </p>
        <h1 className="mb-4 text-4xl font-light leading-tight text-fg-base">Termos de Uso</h1>
        <p className="mb-10 text-sm text-fg-muted">
          Última atualização: março de 2025
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="1. O que é a PropFreela">
            <p>
              A PropFreela é uma plataforma online que permite a freelancers criarem, personalizarem
              e baixarem propostas comerciais profissionais em formato PDF. Ao usar a plataforma,
              você concorda com estes termos.
            </p>
          </Section>

          <Section title="2. Quem pode usar">
            <p>
              Qualquer pessoa com mais de 18 anos e uma conta Google válida pode usar a PropFreela.
              Ao criar sua conta, você declara que as informações fornecidas são verdadeiras e que
              tem capacidade legal para aceitar estes termos.
            </p>
          </Section>

          <Section title="3. Planos e funcionalidades">
            <p className="mb-3">A plataforma oferece dois planos:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>
                  <strong className="text-fg-base">Gratuito:</strong> até 3 propostas por mês,
                  com marca d&apos;água PropFreela no PDF. Sem custo, sem cartão de crédito.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>
                  <strong className="text-fg-base">Pro:</strong> propostas ilimitadas, PDF sem
                  marca d&apos;água, suporte a logo própria e cor de destaque personalizada.
                  R$29/mês ou R$197/ano.
                </span>
              </li>
            </ul>
          </Section>

          <Section title="4. Responsabilidade pelo conteúdo">
            <p>
              Você é o único responsável pelo conteúdo das propostas que cria. A PropFreela não
              analisa, aprova ou endossa o conteúdo gerado pelos usuários. A ferramenta de IA
              gera sugestões de escopo que devem ser revisadas e adaptadas por você antes de
              enviar ao cliente.
            </p>
          </Section>

          <Section title="5. Pagamentos e cancelamento">
            <p>
              Os pagamentos do plano Pro são processados com segurança pela Stripe. Não armazenamos
              dados do seu cartão de crédito. Você pode cancelar a assinatura a qualquer momento
              diretamente nas configurações da sua conta, sem multa ou burocracia. O acesso Pro
              continua ativo até o final do período já pago.
            </p>
          </Section>

          <Section title="6. Disponibilidade do serviço">
            <p>
              Nos esforçamos para manter a plataforma disponível 24/7, mas não garantimos
              disponibilidade ininterrupta. Podemos realizar manutenções ou atualizações que
              impliquem em indisponibilidade temporária. Não somos responsáveis por perdas
              decorrentes de interrupções do serviço.
            </p>
          </Section>

          <Section title="7. Encerramento de conta">
            <p>
              Você pode solicitar a exclusão da sua conta a qualquer momento enviando um email
              para{' '}
              <a href="mailto:contato@propfreela.com" className="text-accent hover:underline">
                contato@propfreela.com
              </a>
              . Após a exclusão, seus dados são removidos dos nossos servidores em até 30 dias.
            </p>
          </Section>

          <Section title="8. Alterações nos termos">
            <p>
              Podemos atualizar estes termos periodicamente. Quando houver mudanças significativas,
              notificaremos por email. O uso continuado da plataforma após as alterações constitui
              aceitação dos novos termos.
            </p>
          </Section>

          <Section title="9. Contato">
            <p>
              Dúvidas sobre estes termos? Entre em contato:{' '}
              <a href="mailto:contato@propfreela.com" className="text-accent hover:underline">
                contato@propfreela.com
              </a>
            </p>
          </Section>
        </div>

        <div className="mt-12 flex gap-6 border-t border-border pt-8">
          <Link href="/privacidade" className="text-sm text-fg-muted hover:text-fg-base">
            Política de privacidade →
          </Link>
          <Link href="/" className="text-sm text-fg-muted hover:text-fg-base">
            Voltar ao início →
          </Link>
        </div>
      </main>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-base font-medium text-fg-base">{title}</h2>
      {children}
    </div>
  )
}
