import * as React from 'react'
import { cn } from './cn'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          // Underline style — sem border box
          'w-full bg-transparent',
          'border-b border-border',
          'pb-2 pt-1',
          'text-sm text-fg-base placeholder:text-fg-placeholder',
          'outline-none',
          'transition-colors duration-150',
          'focus:border-accent',
          error && 'border-red-400 focus:border-red-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full resize-none bg-transparent',
          'border-b border-border',
          'pb-2 pt-1',
          'text-sm text-fg-base placeholder:text-fg-placeholder',
          'outline-none',
          'transition-colors duration-150',
          'focus:border-accent',
          error && 'border-red-400 focus:border-red-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        rows={props.rows ?? 4}
        {...props}
      />
    )
  },
)

Textarea.displayName = 'Textarea'
