import * as React from 'react'
import { cn } from './cn.js'

type FieldProps = {
  label: string
  error?: string
  hint?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function Field({ label, error, hint, required, children, className }: FieldProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="text-xs font-medium uppercase tracking-wide text-fg-muted">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-fg-placeholder">{hint}</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
