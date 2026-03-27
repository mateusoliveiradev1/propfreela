import { type NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { proposalsService } from '@/server/services/proposals.service'
import {
  sendExpiryReminderToClient,
  sendExpiryWarningToFreelancer,
} from '@/server/services/email.service'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env['CRON_SECRET']}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 1. Expire overdue proposals
  const expiredCount = await proposalsService.expireOverdue({ db })

  // 2. Find proposals expiring in ~2 days and send reminders
  const expiring = await proposalsService.findExpiringIn2Days({ db })

  const appUrl = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://propfreela.com'

  const results = await Promise.allSettled(
    expiring.map(async (proposal) => {
      // Send reminder to client (if email known)
      if (proposal.clientEmail && proposal.publicToken && proposal.expiresAt) {
        await sendExpiryReminderToClient({
          to: proposal.clientEmail,
          proposalTitle: proposal.title,
          freelancerName: proposal.userName,
          proposalUrl: `${appUrl}/p/${proposal.publicToken}`,
          expiresAt: proposal.expiresAt,
        })
      }

      // Send warning to freelancer
      if (proposal.expiresAt) {
        await sendExpiryWarningToFreelancer({
          to: proposal.userEmail,
          proposalTitle: proposal.title,
          clientName: proposal.clientName,
          expiresAt: proposal.expiresAt,
        })
      }
    }),
  )

  const failed = results.filter((r) => r.status === 'rejected').length

  return NextResponse.json({
    ok: true,
    expired: expiredCount,
    reminders: expiring.length,
    failed,
  })
}
