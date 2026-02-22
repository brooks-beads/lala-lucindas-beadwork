import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(request) {
  const { items } = await request.json()

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 })
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Stripe is not configured yet. Add STRIPE_SECRET_KEY to .env.local.' },
      { status: 503 }
    )
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-04-10',
  })

  const origin = request.headers.get('origin') || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: `Handmade by Lala Lucinda — ${item.name}`,
          metadata: { slug: item.slug },
        },
        unit_amount: Math.round(item.price * 100), // cents
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'usd' },
          display_name: 'Free Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 3 },
            maximum: { unit: 'business_day', value: 7 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 1200, currency: 'usd' },
          display_name: 'Priority Shipping',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 3 },
          },
        },
      },
    ],
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    metadata: {
      source: "lala-lucindas-beadwork",
    },
  })

  return NextResponse.json({ url: session.url })
}
