'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Field, Input } from '@propfreela/ui'
import { UpdateUserSchema, type UpdateUserInput } from '@propfreela/validators'
import { trpc } from '@/lib/trpc/client'

const ACCENT_PRESETS = [
  { label: 'Verde floresta', value: '#1A472A' },
  { label: 'Azul marinho', value: '#1B3A6B' },
  { label: 'Vinho', value: '#6B1B2A' },
  { label: 'Ardósia', value: '#2D3748' },
  { label: 'Cobre', value: '#7D4500' },
]

type Props = {
  defaultValues: {
    companyName: string
    accentColor: string
    logoUrl: string | null
  }
  isPro: boolean
}

export function ConfiguracoesForm({ defaultValues, isPro }: Props) {
  const [saved, setSaved] = useState(false)
  const [logoPreview, setLogoPreview] = useState<string | null>(defaultValues.logoUrl)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateUserInput>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      companyName: defaultValues.companyName,
      accentColor: defaultValues.accentColor,
      logoUrl: defaultValues.logoUrl,
    },
  })

  const currentAccent = watch('accentColor')

  const updateMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    },
  })

  async function handleLogoUpload(file: File) {
    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload/logo', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Falha no upload')

      const { url } = (await res.json()) as { url: string }
      setValue('logoUrl', url)
      setLogoPreview(url)
    } catch {
      // silently fail — user can retry
    } finally {
      setUploadingLogo(false)
    }
  }

  function onSubmit(data: UpdateUserInput) {
    updateMutation.mutate(data)
  }

  const isPending = updateMutation.isPending || isSubmitting

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      {/* Company info */}
      <div className="space-y-6">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
          Dados da empresa
        </p>
        <Field label="Nome da empresa ou freelancer" error={errors.companyName?.message}>
          <Input
            {...register('companyName')}
            placeholder="João Silva Dev"
          />
        </Field>

        {/* Logo upload */}
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
            Logo
            {!isPro && (
              <span className="ml-2 text-[10px] normal-case text-fg-placeholder">
                (plano Pro)
              </span>
            )}
          </p>
          {isPro ? (
            <div className="flex items-center gap-4">
              {logoPreview && (
                <img
                  src={logoPreview}
                  alt="Logo"
                  className="h-12 w-auto object-contain"
                />
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleLogoUpload(file)
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                loading={uploadingLogo}
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? 'Trocar logo' : 'Enviar logo'}
              </Button>
              {logoPreview && (
                <button
                  type="button"
                  onClick={() => {
                    setValue('logoUrl', null)
                    setLogoPreview(null)
                  }}
                  className="text-xs text-fg-placeholder hover:text-fg-muted"
                >
                  Remover
                </button>
              )}
            </div>
          ) : (
            <div className="flex h-12 items-center rounded-sm border border-dashed border-border px-4">
              <p className="text-xs text-fg-placeholder">
                Disponível no plano Pro —{' '}
                <a href="/precos" className="text-accent hover:underline">
                  fazer upgrade
                </a>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Accent color */}
      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-fg-muted">
          Cor de destaque do PDF
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_PRESETS.map((preset) => (
            <button
              key={preset.value}
              type="button"
              title={preset.label}
              onClick={() => setValue('accentColor', preset.value, { shouldValidate: true })}
              className="h-8 w-8 rounded-sm border-2 transition-all"
              style={{
                backgroundColor: preset.value,
                borderColor: currentAccent === preset.value ? '#0D0D0B' : 'transparent',
              }}
            />
          ))}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={currentAccent ?? '#1A472A'}
              onChange={(e) => setValue('accentColor', e.target.value, { shouldValidate: true })}
              className="h-8 w-8 cursor-pointer rounded-sm border border-border bg-transparent"
              title="Cor personalizada"
            />
            <span className="font-mono text-xs text-fg-placeholder">{currentAccent}</span>
          </div>
        </div>
        {errors.accentColor && (
          <p className="text-xs text-red-500">{errors.accentColor.message}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit" loading={isPending}>
          Salvar configurações
        </Button>
        {saved && (
          <p className="text-xs text-accent">Salvo com sucesso.</p>
        )}
      </div>
    </form>
  )
}
