import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request) {
  const { name, email, pieceType, budget, notes } = await request.json()

  if (!name || !email || !pieceType || !budget) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Notify Lala
    await resend.emails.send({
      from: 'Lala Lucinda <hello@lalalucindas.com>',
      to: 'lala@lalalucindas.com',
      replyTo: email,
      subject: `New Custom Order Request — ${pieceType} from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #3a2e26; background: #faf8f5;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8070; margin: 0 0 32px;">
            New Custom Order Request · lalalucindas.com
          </p>
          <h1 style="font-size: 24px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 24px; color: #1a1210;">
            ${name} wants a custom ${pieceType}
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin: 0 0 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a8070; width: 130px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px; font-weight: 300;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a8070;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px; font-weight: 300;"><a href="mailto:${email}" style="color: #c4715a;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a8070;">Piece Type</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px; font-weight: 300;">${pieceType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a8070;">Budget</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd0; font-size: 14px; font-weight: 300;">${budget}</td>
            </tr>
          </table>
          ${notes ? `
          <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #9a8070; margin: 0 0 8px;">Their Notes</p>
          <p style="font-size: 14px; font-weight: 300; line-height: 1.8; background: #f2ece2; padding: 16px; margin: 0 0 24px; border-left: 3px solid #c4715a;">
            ${notes.replace(/\n/g, '<br>')}
          </p>
          ` : '<p style="font-size: 13px; font-weight: 300; color: #9a8070; margin: 0 0 24px;">No additional notes provided.</p>'}
          <a href="mailto:${email}?subject=Re: Your Custom Order Request"
             style="display: inline-block; background: #3a2e26; color: #faf8f5; text-decoration: none;
                    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
                    padding: 14px 28px;">
            Reply to ${name}
          </a>
        </div>
      `,
    })

    // Confirm to the customer
    await resend.emails.send({
      from: 'Lala Lucinda <hello@lalalucindas.com>',
      to: email,
      subject: 'Got your custom order request — I\'ll be in touch soon',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 48px 32px; color: #3a2e26; background: #faf8f5;">
          <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #9a8070; margin: 0 0 32px;">
            Lala Lucinda's Beadwork · Northern California
          </p>
          <h1 style="font-size: 28px; font-weight: 300; letter-spacing: 0.05em; margin: 0 0 24px; color: #1a1210;">
            I got your request, ${name.split(' ')[0]}.
          </h1>
          <p style="font-size: 15px; line-height: 1.8; font-weight: 300; margin: 0 0 20px;">
            I read every custom order request myself. You asked about a <strong style="font-weight: 400;">${pieceType}</strong> in the <strong style="font-weight: 400;">${budget}</strong> range — I'll reach out within a few days to talk through what you're envisioning.
          </p>
          <p style="font-size: 15px; line-height: 1.8; font-weight: 300; margin: 0 0 20px;">
            We won't start anything until we both love the idea. No pressure, just a conversation.
          </p>
          <p style="font-size: 15px; font-weight: 300; margin: 0 0 4px;">— Lucinda</p>
          <div style="margin: 40px 0; border-top: 1px solid #d4c4b0;"></div>
          <a href="https://www.lalalucindas.com"
             style="display: inline-block; background: #3a2e26; color: #faf8f5; text-decoration: none;
                    font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
                    padding: 14px 28px;">
            Browse the Shop
          </a>
        </div>
      `,
    })
  }

  return NextResponse.json({ success: true })
}
