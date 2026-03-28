export function FeatureCard({
  icon,
  title,
  description,
  accent = false,
}: {
  icon: React.ReactNode
  title: string
  description: string
  accent?: boolean
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] ${
        accent
          ? 'border-accent/30 bg-accent/5'
          : 'border-border bg-bg-base hover:border-accent/20'
      }`}
    >
      {/* Glow de canto no hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Ícone */}
      <div
        className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg ${
          accent ? 'bg-accent/15' : 'bg-bg-subtle'
        }`}
      >
        {icon}
      </div>

      <p className="mb-1.5 text-sm font-semibold text-fg-base">{title}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}
