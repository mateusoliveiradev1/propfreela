import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/server/db'
import { users } from '@propfreela/db'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET']
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const Stripe = (await import('stripe')).default
  const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] ?? '')

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object
      const userId = session.metadata?.['userId']
      if (!userId) break

      const stripeCustomerId =
        typeof session.customer === 'string' ? session.customer : (session.customer?.id ?? null)

      const stripeSubscriptionId =
        typeof session.subscription === 'string'
          ? session.subscription
          : (session.subscription?.id ?? null)

      await db
        .update(users)
        .set({ plan: 'pro', stripeCustomerId, stripeSubscriptionId, updatedAt: new Date() })
        .where(eq(users.id, userId))
      break
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object
      const customerId =
        typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id

      await db
        .update(users)
        .set({ plan: 'free', updatedAt: new Date() })
        .where(eq(users.stripeCustomerId, customerId))
      break
    }

    default:
      break
  }

  return NextResponse.json({ received: true })
}
