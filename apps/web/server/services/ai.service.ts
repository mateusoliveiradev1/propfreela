import { TRPCError } from '@trpc/server'
import type { GenerateScopeInput } from '@propfreela/validators'

// ─── Providers (usa o primeiro disponível) ────────────────────────────────────
//
//  GEMINI_API_KEY  → Google Gemini 2.0 Flash
//    Chave grátis (sem billing no projeto): https://aistudio.google.com/app/apikey
//    Limite free: 1.500 req/dia
//
//  GROQ_API_KEY    → Groq Llama 3.3 70B
//    Chave grátis: https://console.groq.com → API Keys → Create
//    Limite free: ~14.400 req/dia

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBRL(cents: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

// ─── Gemini ───────────────────────────────────────────────────────────────────

async function callGemini(prompt: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY!
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 1024, temperature: 0.75 },
    }),
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } }
    const msg = body.error?.message?.split('\n')[0] ?? `status ${res.status}`
    // Sempre lança Error simples — callAI decide se faz fallback ou vira TRPCError
    throw new Error(`Gemini ${res.status}: ${msg}`)
  }

  type GeminiResp = { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }
  const data = (await res.json()) as GeminiResp
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Gemini retornou resposta vazia')
  return text.trim()
}

// ─── Groq ─────────────────────────────────────────────────────────────────────

async function callGroq(prompt: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY!

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.75,
      messages: [
        {
          role: 'system',
          content:
            'Você é um redator de propostas comerciais. NUNCA use markdown, asteriscos, hashtags, traços de lista, numeração ou qualquer formatação especial. Escreva APENAS texto corrido puro, em parágrafos, sem nenhum símbolo de formatação.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => ({}))) as { error?: { message?: string } }
    const msg = body.error?.message ?? `status ${res.status}`
    throw new Error(`Groq ${res.status}: ${msg}`)
  }

  type GroqResp = { choices?: Array<{ message?: { content?: string } }> }
  const data = (await res.json()) as GroqResp
  const text = data.choices?.[0]?.message?.content
  if (!text) throw new Error('Groq retornou resposta vazia')
  return text.trim()
}

// ─── Router — Groq primeiro (mais confiável), Gemini como fallback ────────────

async function callAI(prompt: string): Promise<string> {
  const hasGemini = !!process.env.GEMINI_API_KEY
  const hasGroq = !!process.env.GROQ_API_KEY

  if (!hasGemini && !hasGroq) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message:
        'Nenhuma API de IA configurada. Adicione GEMINI_API_KEY ou GROQ_API_KEY no .env.local e reinicie o servidor.',
    })
  }

  // Tenta Groq primeiro (sem problema de billing), depois Gemini
  const providers: Array<() => Promise<string>> = []
  if (hasGroq) providers.push(() => callGroq(prompt))
  if (hasGemini) providers.push(() => callGemini(prompt))

  let lastError: unknown
  for (const call of providers) {
    try {
      return await call()
    } catch (err) {
      lastError = err
      console.warn('[AI Service] provider falhou, tentando próximo:', err instanceof Error ? err.message : err)
    }
  }

  const msg = lastError instanceof Error ? lastError.message : 'Todos os providers falharam'
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: `Erro na IA: ${msg}`,
  })
}

// ─── Generate scope from scratch ─────────────────────────────────────────────

async function generateScope(input: GenerateScopeInput): Promise<string> {
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
    `- NÃO use markdown, bullets, asteriscos ou formatação — texto corrido puro`,
    `- NÃO invente tecnologias ou prazos a menos que faça sentido pelo título`,
    `- Comece direto no conteúdo (sem "Prezado", sem saudação)`,
    `- Máximo 300 palavras`,
  ]
    .filter(Boolean)
    .join('\n')

  return callAI(prompt)
}

// ─── Refine existing scope ───────────────────────────────────────────────────

async function refineScope(input: GenerateScopeInput): Promise<string> {
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
    `- Melhore clareza, fluidez e profissionalismo`,
    `- Português brasileiro, tom profissional mas amigável`,
    `- NÃO use markdown, bullets, asteriscos ou formatação — texto corrido puro`,
    `- Retorne APENAS o texto melhorado, sem comentários`,
    `- Máximo 300 palavras`,
  ].join('\n')

  return callAI(prompt)
}

// ─── Export ──────────────────────────────────────────────────────────────────

export const aiService = {
  generateScope,
  refineScope,
}
