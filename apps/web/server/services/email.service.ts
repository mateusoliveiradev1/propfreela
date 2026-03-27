import { Resend } from 'resend'

const resend = process.env['RESEND_API_KEY']
  ? new Resend(process.env['RESEND_API_KEY'])
  : null

// Em desenvolvimento/sem domínio verificado: usar onboarding@resend.dev
// Em produção com domínio verificado: trocar para ola@propfreela.com
const FROM = process.env['RESEND_FROM_EMAIL'] ?? 'PropFreela <onboarding@resend.dev>'

// ─── Templates ────────────────────────────────────────────────────────────────

function baseHtml(content: string): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F6F3;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#F7F6F3;padding:0 24px 48px;">
    <div style="padding:32px 0 24px;border-bottom:1px solid #E5E4E1;margin-bottom:32px;">
      <span style="font-size:13px;font-weight:500;color:#0D0D0B;letter-spacing:0.05em;">PropFreela</span>
    </div>
    ${content}
    <div style="margin-top:48px;padding-top:24px;border-top:1px solid #E5E4E1;">
      <p style="font-size:11px;color:#9CA3AF;margin:0;">
        PropFreela — Propostas comerciais para freelancers brasileiros.<br>
        <a href="https://propfreela.com" style="color:#9CA3AF;">propfreela.com</a>
      </p>
    </div>
  </div>
</body>
</html>`
}

function welcomeHtml(name: string): string {
  const firstName = name.split(' ')[0]
  return baseHtml(`
    <p style="font-size:22px;font-weight:300;color:#0D0D0B;margin:0 0 16px;">
      Bem-vindo ao PropFreela, ${firstName}.
    </p>
    <p style="font-size:14px;line-height:1.7;color:#4B4B4B;margin:0 0 24px;">
      Agora você pode criar propostas comerciais profissionais em PDF em menos de 2 minutos.
      Nossa IA gera o escopo técnico automaticamente — você só preenche os dados do projeto.
    </p>
    <p style="font-size:14px;line-height:1.7;color:#4B4B4B;margin:0 0 32px;">
      No plano gratuito você tem <strong>3 propostas por mês</strong> com 5 templates profissionais.
    </p>
    <a href="https://propfreela.com/nova-proposta"
       style="display:inline-block;background:#1A472A;color:#fff;text-decoration:none;
              font-size:14px;font-weight:500;padding:12px 28px;border-radius:2px;">
      Criar minha primeira proposta →
    </a>
  `)
}

function proposalApprovedHtml(proposalTitle: string): string {
  return baseHtml(`
    <p style="font-size:22px;font-weight:300;color:#0D0D0B;margin:0 0 16px;">
      Sua proposta foi aprovada. ✅
    </p>
    <div style="background:#fff;border:1px solid #E5E4E1;padding:16px 20px;margin:0 0 24px;border-radius:2px;">
      <p style="font-size:13px;color:#9CA3AF;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Proposta</p>
      <p style="font-size:15px;font-weight:500;color:#0D0D0B;margin:0;">${proposalTitle}</p>
    </div>
    <p style="font-size:14px;line-height:1.7;color:#4B4B4B;margin:0 0 32px;">
      O cliente aprovou sua proposta. Entre em contato para combinar os próximos passos e iniciar o projeto.
    </p>
    <a href="https://propfreela.com/propostas"
       style="display:inline-block;background:#1A472A;color:#fff;text-decoration:none;
              font-size:14px;font-weight:500;padding:12px 28px;border-radius:2px;">
      Ver minhas propostas →
    </a>
  `)
}

function proposalRejectedHtml(proposalTitle: string): string {
  return baseHtml(`
    <p style="font-size:22px;font-weight:300;color:#0D0D0B;margin:0 0 16px;">
      Proposta não aprovada desta vez.
    </p>
    <div style="background:#fff;border:1px solid #E5E4E1;padding:16px 20px;margin:0 0 24px;border-radius:2px;">
      <p style="font-size:13px;color:#9CA3AF;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Proposta</p>
      <p style="font-size:15px;font-weight:500;color:#0D0D0B;margin:0;">${proposalTitle}</p>
    </div>
    <p style="font-size:14px;line-height:1.7;color:#4B4B4B;margin:0 0 16px;">
      O cliente não aprovou esta proposta. Isso faz parte do processo — cada "não" te aproxima do próximo "sim".
    </p>
    <p style="font-size:14px;line-height:1.7;color:#4B4B4B;margin:0 0 32px;">
      Considere entrar em contato para entender o motivo e ajustar sua abordagem na próxima proposta.
    </p>
    <a href="https://propfreela.com/nova-proposta"
       style="display:inline-block;background:#1A472A;color:#fff;text-decoration:none;
              font-size:14px;font-weight:500;padding:12px 28px;border-radius:2px;">
      Criar nova proposta →
    </a>
  `)
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function sendWelcomeEmail(to: string, name: string): Promise<void> {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: 'Bem-vindo ao PropFreela 🎉',
    html: welcomeHtml(name),
  })
}

export async function sendProposalApprovedEmail(
  to: string,
  proposalTitle: string,
): Promise<void> {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: `✅ Proposta aprovada: ${proposalTitle}`,
    html: proposalApprovedHtml(proposalTitle),
  })
}

export async function sendProposalRejectedEmail(
  to: string,
  proposalTitle: string,
): Promise<void> {
  if (!resend) return
  await resend.emails.send({
    from: FROM,
    to,
    subject: `Proposta não aprovada: ${proposalTitle}`,
    html: proposalRejectedHtml(proposalTitle),
  })
}
