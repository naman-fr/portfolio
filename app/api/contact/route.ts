import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();
    
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'VALIDATION_ERROR: MISSING_PAYLOAD' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const isDev = process.env.NODE_ENV === 'development';

    if (isDev) {
      console.log('[DEBUG] API_KEY_PRESENT:', !!apiKey);
      console.log('[DEBUG] NODE_ENV:', process.env.NODE_ENV);
    }

    if (!apiKey) {
      if (isDev) {
        console.log('--- DEVELOPMENT MODE: MOCKING EMAIL ---');
        return NextResponse.json({ 
          success: true, 
          message: 'DEV_MOCK_SUCCESS',
          debug: 'Key missing but mocked in dev' 
        });
      }
      return NextResponse.json({ 
        error: 'SYSTEM_ERROR: SMTP_GATEWAY_NOT_CONFIGURED',
        details: 'Missing RESEND_API_KEY in environment variables'
      }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'namangautam172@gmail.com',
      subject: `[SYSTEM_NOTIFICATION] Message from ${name}`,
      replyTo: email,
      text: `SOURCE: Portfolio Contact Form\nUSER: ${name}\nEMAIL: ${email}\n\nPAYLOAD:\n${message}`,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Contact form critical error:', error);
    return NextResponse.json({ error: 'CRITICAL_FAILURE: TRANSMISSION_TIMEOUT' }, { status: 500 });
  }
}
