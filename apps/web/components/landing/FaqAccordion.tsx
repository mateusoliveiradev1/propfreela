'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Preciso de cartão de crédito para começar?',
    a: 'Não. O plano gratuito é 100% grátis e não pede dados de pagamento. Você já pode criar até 3 propostas por mês sem pagar nada.',
  },
  {
    q: 'Os PDFs gerados são realmente profissionais?',
    a: 'Sim. Temos 5 templates desenhados por designers, todos otimizados para caber em uma página A4. Você pode personalizar com sua logo e cor de marca no plano Pro.',
  },
  {
    q: 'Como funciona a geração de escopo com IA?',
    a: 'Ao criar uma proposta, basta descrever brevemente o projeto. A IA gera automaticamente um escopo detalhado e profissional que você pode editar antes de gerar o PDF.',
  },
  {
    q: 'Posso cancelar o plano Pro a qualquer momento?',
    a: 'Sim, sem multa e sem burocracia. Você cancela direto nas configurações da sua conta e continua usando até o fim do período pago.',
  },
  {
    q: 'Meus clientes precisam ter conta para ver a proposta?',
    a: 'Não. Você pode compartilhar um link público da proposta. O cliente visualiza, aprova ou solicita alterações — tudo sem precisar criar conta.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. A plataforma é totalmente responsiva. Você pode criar e gerenciar propostas de qualquer dispositivo.',
  },
]

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="divide-y divide-border">
      {faqs.map((faq, i) => (
        <button
          key={i}
          type="button"
          className="flex w-full items-start justify-between gap-4 py-5 text-left"
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-fg-base">{faq.q}</p>
            {open === i && (
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {faq.a}
              </p>
            )}
          </div>
          <span className="mt-0.5 text-fg-muted transition-transform duration-200"
            style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}
          >
            +
          </span>
        </button>
      ))}
    </div>
  )
}
