export function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/20 bg-accent/8">
          {icon}
        </div>
        <span className="font-mono text-xs font-bold text-accent/40">{number}</span>
      </div>
      <p className="mb-2 text-sm font-semibold text-fg-base">{title}</p>
      <p className="text-sm leading-relaxed text-fg-muted">{description}</p>
    </div>
  )
}
