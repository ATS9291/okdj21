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

  const message   = esc(body.message).slice(0, 1000);
  const stack     = esc(body.stack).slice(0, 3000);
  const digest    = body.digest ? esc(body.digest).slice(0, 100) : null;
  const url       = esc(body.url).slice(0, 500);
  const userAgent = esc(body.userAgent).slice(0, 300);
  const now       = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

  const hasStack  = stack && stack !== '알 수 없음';

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: NOTIFY_EMAIL,
      subject: `🚨 [긴급] 옥된장 프론트엔드 크래시 — 즉시 확인 필요`,
      html: `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Apple SD Gothic Neo','-apple-system','Segoe UI',sans-serif;">

  <div style="max-width:640px;margin:32px auto;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- 경고 헤더 -->
    <div style="background:#dc2626;padding:20px 28px;display:flex;align-items:center;gap:12px;">
      <span style="font-size:28px;">🚨</span>
      <div>
        <p style="margin:0;color:#fff;font-size:18px;font-weight:700;letter-spacing:-0.3px;">프론트엔드 크래시 발생</p>
        <p style="margin:4px 0 0;color:#fca5a5;font-size:13px;">옥된장 랜딩페이지에 치명적 오류가 감지되었습니다</p>
      </div>
    </div>

    <!-- 에러 요약 -->
    <div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 28px;margin:0;">
      <p style="margin:0 0 4px;color:#7f1d1d;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">에러 메시지</p>
      <p style="margin:0;color:#991b1b;font-size:15px;font-weight:600;line-height:1.5;word-break:break-all;">${message}</p>
    </div>

    <div style="padding:24px 28px;">

      <!-- 발생 정보 테이블 -->
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:24px;">
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#64748b;padding:10px 0;width:110px;font-weight:500;">⏰ 발생 시각</td>
          <td style="color:#0f172a;padding:10px 0;">${now}</td>
        </tr>
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#64748b;padding:10px 0;font-weight:500;">🔗 발생 URL</td>
          <td style="color:#2563eb;padding:10px 0;word-break:break-all;">${url}</td>
        </tr>
        ${digest ? `
        <tr style="border-bottom:1px solid #f1f5f9;">
          <td style="color:#64748b;padding:10px 0;font-weight:500;">🔑 Error Digest</td>
          <td style="color:#0f172a;padding:10px 0;font-family:monospace;font-size:12px;">${digest}</td>
        </tr>` : ''}
        <tr>
          <td style="color:#64748b;padding:10px 0;font-weight:500;vertical-align:top;">🖥️ 브라우저</td>
          <td style="color:#475569;padding:10px 0;font-size:12px;word-break:break-all;">${userAgent}</td>
        </tr>
      </table>

      <!-- 스택 트레이스 -->
      ${hasStack ? `
      <div style="margin-bottom:24px;">
        <p style="margin:0 0 8px;color:#374151;font-size:12px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;">📋 스택 트레이스</p>
        <pre style="margin:0;background:#1e293b;color:#e2e8f0;padding:16px;border-radius:6px;font-size:11.5px;line-height:1.7;overflow-x:auto;white-space:pre-wrap;word-break:break-all;">${stack}</pre>
      </div>` : ''}

      <!-- Claude Code 수정 힌트 -->
      <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:16px 20px;margin-bottom:8px;">
        <p style="margin:0 0 10px;color:#1d4ed8;font-size:13px;font-weight:700;">🤖 Claude Code 수정 가이드</p>
        <p style="margin:0 0 8px;color:#1e40af;font-size:12px;line-height:1.6;">아래 명령어를 Claude Code 터미널에 붙여넣어 즉시 수정하세요:</p>
        <pre style="margin:0;background:#1e3a8a;color:#bfdbfe;padding:12px 14px;border-radius:4px;font-size:12px;line-height:1.6;white-space:pre-wrap;word-break:break-all;">claude "다음 에러를 수정해줘:

에러 메시지: ${message}
발생 URL: ${url}
${digest ? `Error Digest: ${digest}` : ''}
${hasStack ? `\n스택 트레이스:\n${stack}` : ''}"</pre>
      </div>

    </div>

    <!-- 푸터 -->
    <div style="background:#f8fafc;padding:14px 28px;border-top:1px solid #e2e8f0;">
      <p style="margin:0;color:#94a3b8;font-size:11px;">옥된장 자동 에러 알림 시스템 · 이 메일은 자동 발송됩니다</p>
    </div>

  </div>

</body>
</html>
      `,
    });
  } catch (err) {
    console.error('[error-report] resend failed:', err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
