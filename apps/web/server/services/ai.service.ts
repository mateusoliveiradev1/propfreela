import Anthropic from '@anthropic-ai/sdk'
import { TRPCError } from '@trpc/server'
import type { GenerateScopeInput } from '@propfreela/validators'

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'ANTHROPIC_API_KEY não configurada.',
    })
  }
  return new Anthropic({ apiKey })
}

function formatBRL(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

// ─── Generate scope from scratch ─────────────────────────────────────────────

async function generateScope(input: GenerateScopeInput): Promise<string> {
  const client = getClient()

  const valueStr = input.valueInCents ? formatBRL(input.valueInCents) : null

  const prompt = [
    `Você é um redator especializado em propostas comerciais para freelancers brasileiros.`,
    `Gere um escopo de projeto profissional e persuasivo com base nas informações abaixo.`,
    ``,
    `Cliente: ${input.clientName}`,
    `Projeto: ${input.title}`,
    valueStr ? `Valor: ${valueStr}` : null,
    ``,
    `Regras:`,
    `- Escreva em português brasileiro, tom profissional mas amigável`,
    `- 3 a 5 parágrafos curtos`,
    `- Descreva o que será entregue de forma clara e objetiva`,
    `- Mencione etapas do projeto quando apropriado`,
    `- Destaque o valor/benefício que o cliente receberá`,
    `- NÃO use markdown, bullets, ou formatação especial — texto corrido puro`,
    `- NÃO invente tecnologias ou prazos específicos a menos que faça sentido pelo título`,
    `- Comece direto com o conteúdo (sem "Prezado", sem saudação)`,
  ]
    .filter(Boolean)
    .join('\n')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Resposta da IA sem conteúdo de texto.',
    })
  }

  return textBlock.text.trim()
}

// ─── Refine existing scope ───────────────────────────────────────────────────

async function refineScope(input: GenerateScopeInput): Promise<string> {
  const client = getClient()

  const prompt = [
    `Você é um redator especializado em propostas comerciais para freelancers brasileiros.`,
    `Melhore o texto de escopo abaixo, tornando-o mais profissional e persuasivo.`,
    ``,
    `Cliente: ${input.clientName}`,
    `Projeto: ${input.title}`,
    ``,
    `Texto atual:`,
    `"""`,
    input.currentScope,
    `"""`,
    ``,
    `Regras:`,
    `- Mantenha a essência e informações do texto original`,
    `- Melhore a clareza, fluidez e profissionalismo`,
    `- Português brasileiro, tom profissional mas amigável`,
    `- NÃO use markdown, bullets, ou formatação especial — texto corrido puro`,
    `- Retorne APENAS o texto melhorado, sem comentários ou explicações`,
  ].join('\n')

  const message = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  })

  const textBlock = message.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Resposta da IA sem conteúdo de texto.',
    })
  }

  return textBlock.text.trim()
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const aiService = {
  generateScope,
  refineScope,
}
