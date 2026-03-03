import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createShippingLabel } from '@/lib/shippo'

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

    // Retrieve full session with line items and shipping
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['line_items', 'shipping_details', 'shipping_cost.shipping_rate'],
    })

    const { customer_details, shipping_details, shipping_cost, line_items, amount_total, id } = fullSession

    console.log('[Order] New order received:', {
      sessionId: id,
      amountTotal: `$${(amount_total / 100).toFixed(2)}`,
      customer: customer_details?.email,
      items: line_items?.data.map((i) => `${i.quantity}x ${i.description}`),
    })

    // Determine service level from what customer selected at checkout
    const shippingName = shipping_cost?.shipping_rate?.display_name ?? ''
    const serviceLevel = shippingName.toLowerCase().includes('priority') ? 'priority' : 'standard'

    // Build Shippo destination address
    const addr = shipping_details?.address
    const toAddress = {
      name:    shipping_details?.name || customer_details?.name || 'Customer',
      street1: addr?.line1,
      street2: addr?.line2 || '',
      city:    addr?.city,
      state:   addr?.state,
      zip:     addr?.postal_code,
      country: addr?.country || 'US',
      email:   customer_details?.email,
    }

    // Create and purchase shipping label
    try {
      const label = await createShippingLabel({ toAddress, serviceLevel })
      console.log('[Shippo] Label created:', {
        tracking: label.trackingNumber,
        carrier:  label.carrier,
        service:  label.service,
        labelUrl: label.labelUrl,
      })
    } catch (err) {
      // Log but don't fail — order is paid, label can be created manually in Shippo
      console.error('[Shippo] Label creation failed:', err.message)
    }
  }

  return NextResponse.json({ received: true })
}
