import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createRecord } from '@/lib/airtable'

export async function POST(request) {
  const { email } = await request.json()

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  // Save to Airtable Subscribers table
  try {
    await createRecord('Subscribers', {
      Email: email,
      'Subscribed At': new Date().toISOString(),
    })
  } catch (err) {
    console.error('[Subscribe] Airtable error:', err.message)
    // Don't block the email from sending if Airtable fails
  }

  // Send confirmation email via Resend
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Lala Lucinda <hello@lalalucindas.com>',
      to: email,
      subject: 'You\'re in ✨ — welcome to Lala Lucinda\'s',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #3a2e26; background: #faf8f5;">

          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8070; margin: 0 0 32px;">
            Lala Lucinda's Beadwork · Northern California
          </p>

          <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 24px; color: #1a1210;">
            Thank you for being here.
          </h1>

          <p style="font-size: 15px; line-height: 1.8; font-weight: 300; margin: 0 0 20px;">
            I make everything by hand — one bead at a time, in my studio in the shadow of Mt. Shasta.
            Every piece is one of a kind. I don't replicate any of them, not even in color.
          </p>

          <p style="font-size: 15px; line-height: 1.8; font-weight: 300; margin: 0 0 20px;">
            When I have new work ready, you'll hear about it here first. I only reach out when
            there's something real to share — a new piece, a story from the studio, something
            worth your time.
          </p>

          <p style="font-size: 15px; line-height: 1.8; font-weight: 300; margin: 0 0 40px;">
            I'm glad you found your way here.
          </p>

          <p style="font-size: 15px; font-weight: 300; margin: 0 0 4px;">— Lucinda</p>

          <div style="margin: 40px 0; border-top: 1px solid #d4c4b0;"></div>

          <a href="https://www.lalalucindas.com"
             style="display: inline-block; background: #3a2e26; color: #faf8f5; text-decoration: none;
                    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
                    padding: 14px 28px;">
            Shop the Collection
          </a>

          <p style="font-size: 11px; color: #9a8070; margin: 32px 0 0; line-height: 1.6;">
            You're receiving this because you signed up at lalalucindas.com.<br>
            If this was a mistake, simply ignore this email.
          </p>

        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
