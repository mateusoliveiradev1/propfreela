import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Upgrade realizado — PropFreela',
  robots: { index: false },
}

export default function SucessoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-base px-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        {/* Icon */}
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-sm bg-accent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent-fg"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
            Plano Pro ativado
          </p>
          <h1 className="text-3xl font-light text-fg-base">
            Bem-vindo ao Pro!
          </h1>
          <p className="text-sm text-fg-muted">
            Seu upgrade foi processado com sucesso.
          </p>
        </div>

        <ul className="space-y-2 text-left">
          {[
            'Propostas ilimitadas',
            'PDF sem watermark',
            'Sua logo no PDF',
            'Cor de destaque personalizada',
            'Suporte por email',
          ].map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-fg-muted">
              <span className="text-accent">✓</span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="/dashboard"
          className="inline-flex h-10 w-full items-center justify-center rounded-sm bg-accent text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        >
          Ir para o dashboard
        </Link>
      </div>
    </div>
  )
}
