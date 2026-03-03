import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Required: disable body parsing so we can verify the raw Stripe signature
export const config = { api: { bodyParser: false } }

export async function POST(request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  })

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('[Webhook] STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('[Webhook] Signature verification failed:', err.message)
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object

    // Retrieve full session with line items and customer details
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'customer_details', 'shipping_details'],
    })

    const { customer_details, shipping_details, line_items, amount_total, id } = fullSession

    console.log('[Order] New order received:', {
      sessionId: id,
      amountTotal: `$${(amount_total / 100).toFixed(2)}`,
      customer: {
        name: customer_details?.name,
        email: customer_details?.email,
      },
      shipping: shipping_details?.address,
      items: line_items?.data.map((item) => ({
        name: item.description,
        quantity: item.quantity,
        amount: `$${(item.amount_total / 100).toFixed(2)}`,
      })),
    })

    // TODO: Save order to Airtable Orders table here
  }

  return NextResponse.json({ received: true })
}
