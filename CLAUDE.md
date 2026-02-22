# Lala Lucinda's Beadwork — Project Context

## What This Is
E-commerce storefront for a handmade beadwork artist. Built with Next.js 14 (App Router), 
deployed on Vercel, connected to Airtable for product/order data, Stripe for payments.

## Tech Stack
- Framework: Next.js 14 with App Router
- Styling: Tailwind CSS
- Database: Airtable (Products table + Orders table)
- Payments: Stripe Checkout (hosted)
- Shipping: Shippo (via Zapier automation)
- Deployment: Vercel (auto-deploys on push to main)

## Key Conventions
- All product data fetched server-side via Airtable REST API
- Environment variables in .env.local (never commit this file)
- Stripe runs in test mode until launch
- No TypeScript — plain JavaScript throughout

## Brand Voice
Warm, artisan, handmade. Never corporate. First-person as the artist.

## Important Env Vars Needed
- AIRTABLE_API_KEY
- AIRTABLE_BASE_ID
- STRIPE_SECRET_KEY
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- STRIPE_WEBHOOK_SECRET