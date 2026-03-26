import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 text-center">
        <p className="font-mono text-6xl font-light text-fg-placeholder">404</p>
        <h1 className="text-2xl font-light text-fg-base">Pagina nao encontrada</h1>
        <p className="text-sm text-fg-muted">
          O link que voce acessou nao existe ou foi removido.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-sm bg-accent px-6 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
        >
          Voltar ao inicio
        </Link>
      </div>
    </div>
  )
}
