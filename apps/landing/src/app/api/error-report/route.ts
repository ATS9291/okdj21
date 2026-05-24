import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

function esc(value: unknown): string {
  return String(value ?? '알 수 없음')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const NOTIFY_EMAIL = process.env.ERROR_NOTIFY_EMAIL ?? 'qhfud0306@gmail.com';

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const message = esc(body.message).slice(0, 1000);
  const digest = body.digest ? esc(body.digest).slice(0, 100) : null;
  const url = esc(body.url).slice(0, 500);
  const userAgent = esc(body.userAgent).slice(0, 300);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: NOTIFY_EMAIL,
      subject: `[옥된장] 프론트엔드 에러 발생`,
      html: `
        <div style="font-family:monospace;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#f5f5f0;">
          <h2 style="font-size:16px;font-weight:400;letter-spacing:0.1em;border-bottom:1px solid #333;padding-bottom:16px;margin-bottom:24px;">
            옥된장 — 프론트엔드 에러 알림
          </h2>
          <table style="width:100%;border-collapse:collapse;font-size:13px;line-height:1.8;">
            <tr>
              <td style="color:#888;padding:4px 0;width:100px;">발생 시각</td>
              <td style="color:#f5f5f0;">${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:4px 0;">URL</td>
              <td style="color:#f5f5f0;">${url}</td>
            </tr>
            ${digest ? `<tr><td style="color:#888;padding:4px 0;">Digest</td><td style="color:#f5f5f0;font-family:monospace;">${digest}</td></tr>` : ''}
            <tr>
              <td style="color:#888;padding:4px 0;vertical-align:top;">에러 메시지</td>
              <td style="color:#ff6b6b;font-family:monospace;word-break:break-all;">${message}</td>
            </tr>
            <tr>
              <td style="color:#888;padding:4px 0;vertical-align:top;">User Agent</td>
              <td style="color:#666;font-size:11px;word-break:break-all;">${userAgent}</td>
            </tr>
          </table>
        </div>
      `,
    });
  } catch (err) {
    console.error('[error-report] resend failed:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
