import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade — PropFreela',
  description: 'Como a PropFreela coleta, usa e protege seus dados pessoais.',
}

export default function PrivacidadePage() {
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
        <h1 className="mb-4 text-4xl font-light leading-tight text-fg-base">
          Política de Privacidade
        </h1>
        <p className="mb-10 text-sm text-fg-muted">
          Última atualização: março de 2025
        </p>

        <div className="space-y-10 text-sm leading-relaxed text-fg-muted">
          <Section title="1. Quais dados coletamos">
            <p className="mb-3">
              Quando você cria uma conta na PropFreela via Google OAuth, coletamos apenas:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Nome e sobrenome (fornecido pelo Google)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Endereço de email</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Foto de perfil (opcional, fornecida pelo Google)</span>
              </li>
            </ul>
            <p className="mt-3">
              Adicionalmente, armazenamos o conteúdo das propostas que você cria (título, escopo,
              valores, dados do cliente) para que você possa acessá-las novamente.
            </p>
          </Section>

          <Section title="2. Como usamos seus dados">
            <p className="mb-3">Usamos seus dados exclusivamente para:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Autenticar sua sessão na plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Armazenar e exibir suas propostas no dashboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Associar sua assinatura Pro à conta correta</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Enviar comunicações importantes sobre o serviço (sem spam)</span>
              </li>
            </ul>
          </Section>

          <Section title="3. Não vendemos seus dados">
            <p>
              Seus dados pessoais nunca são vendidos, alugados ou compartilhados com terceiros
              para fins comerciais. Simples assim.
            </p>
          </Section>

          <Section title="4. Pagamentos e dados financeiros">
            <p>
              Os pagamentos são processados pela{' '}
              <strong className="text-fg-base">Stripe</strong>, uma plataforma certificada PCI-DSS.
              Não armazenamos nenhum dado de cartão de crédito em nossos servidores. A Stripe
              possui sua própria política de privacidade, disponível em stripe.com/privacy.
            </p>
          </Section>

          <Section title="5. Cookies e armazenamento local">
            <p>
              Usamos cookies de sessão estritamente necessários para manter você autenticado.
              Não usamos cookies de rastreamento ou publicidade de terceiros.
            </p>
          </Section>

          <Section title="6. Segurança dos dados">
            <p>
              Seus dados são armazenados em banco de dados PostgreSQL hospedado na Neon (plataforma
              com certificação SOC 2). A comunicação entre seu navegador e nossos servidores é
              criptografada via HTTPS/TLS.
            </p>
          </Section>

          <Section title="7. Seus direitos (LGPD)">
            <p className="mb-3">
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Acessar os dados que temos sobre você</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Solicitar a exclusão da sua conta e todos os seus dados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-accent">—</span>
                <span>Portabilidade dos seus dados em formato legível</span>
              </li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer desses direitos, envie um email para{' '}
              <a href="mailto:contato@propfreela.com" className="text-accent hover:underline">
                contato@propfreela.com
              </a>
              . Respondemos em até 5 dias úteis.
            </p>
          </Section>

          <Section title="8. Contato">
            <p>
              Dúvidas sobre privacidade? Entre em contato:{' '}
              <a href="mailto:contato@propfreela.com" className="text-accent hover:underline">
                contato@propfreela.com
              </a>
            </p>
          </Section>
        </div>

        <div className="mt-12 flex gap-6 border-t border-border pt-8">
          <Link href="/termos-de-uso" className="text-sm text-fg-muted hover:text-fg-base">
            Termos de uso →
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
