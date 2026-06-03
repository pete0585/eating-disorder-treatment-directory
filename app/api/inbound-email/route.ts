import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  let payload: Record<string, unknown>

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Resend delivers email.received events via Svix
  // Extract from payload.data when payload.type === 'email.received'
  const emailData =
    payload.type === 'email.received' && payload.data
      ? (payload.data as Record<string, unknown>)
      : payload

  const fromEmail = (emailData.from as string) || ''
  const fromName = (emailData.sender_name as string) || ''
  const subject = (emailData.subject as string) || ''
  const bodyText = (emailData.text as string) || ''
  const bodyHtml = (emailData.html as string) || ''

  if (!fromEmail) {
    return NextResponse.json({ error: 'Missing from email' }, { status: 400 })
  }

  try {
    const supabase = await createServiceClient()

    await supabase.from('inbound_emails').insert({
      directory: 'eating-disorder-treatment',
      from_email: fromEmail,
      from_name: fromName,
      subject,
      body_text: bodyText,
      body_html: bodyHtml,
      listing_id: null,
      listing_slug: null,
      processed: false,
    })
  } catch (err) {
    console.error('inbound-email insert error:', err)
  }

  return NextResponse.json({ received: true })
}
