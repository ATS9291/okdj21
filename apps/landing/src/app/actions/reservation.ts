'use server';

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { formatDateShort } from '@/lib/format';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function submitReservation(formData: FormData) {
  const name       = formData.get('name') as string;
  const phone      = formData.get('phone') as string;
  const date       = formData.get('date') as string;
  const time       = formData.get('time') as string;
  const party_size = parseInt(formData.get('party_size') as string, 10);
  const notes      = formData.get('notes') as string || null;

  if (!name || !phone || !date || !time || !party_size) {
    return { error: '필수 항목을 모두 입력해주세요.' };
  }

  const { data, error } = await supabase
    .from('reservations')
    .insert({ name, phone, date, time, party_size, notes })
    .select('id')
    .single();

  if (error) {
    console.error('Reservation insert error:', error);
    return { error: '예약 저장 중 오류가 발생했습니다. 다시 시도해 주세요.' };
  }
  if (!data) return { success: true };

  try {
    const siteUrl    = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://okdoenjang.com';
    const confirmUrl = `${siteUrl}/api/reservation-confirm?id=${data.id}&action=confirm`;
    const cancelUrl  = `${siteUrl}/api/reservation-confirm?id=${data.id}&action=cancel`;
    const dateFormatted = formatDateShort(date);

    await resend.emails.send({
      from: '옥된장 예약 <noreply@okdoenjang.com>',
      to:   process.env.ADMIN_EMAIL ?? 'qhfud0306@gmail.com',
      subject: `[예약 신청] ${esc(name)}님 · ${dateFormatted} ${esc(time)}`,
      html: `
<!DOCTYPE html>
<html lang="ko">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#111;font-family:'Apple SD Gothic Neo','Noto Sans KR',sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#1a1a1a;border-radius:12px;overflow:hidden;border:1px solid rgba(200,169,110,0.2);">

    <!-- 헤더 -->
    <div style="background:linear-gradient(135deg,#2a1a08,#1a0a02);padding:28px 32px;border-bottom:1px solid rgba(200,169,110,0.15);">
      <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.25em;color:#c8a96e;">OKDOENJANG YANGJAE</p>
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#fff;">새 예약 신청이 들어왔습니다</h1>
    </div>

    <!-- 예약 정보 -->
    <div style="padding:28px 32px;">
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;width:72px;">이름</td>
          <td style="padding:10px 0;color:#fff;font-size:15px;font-weight:600;">${esc(name)}</td>
        </tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;">연락처</td>
          <td style="padding:10px 0;color:#fff;font-size:15px;">${esc(phone)}</td>
        </tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;">날짜</td>
          <td style="padding:10px 0;color:#c8a96e;font-size:15px;font-weight:600;">${dateFormatted}</td>
        </tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;">시간</td>
          <td style="padding:10px 0;color:#c8a96e;font-size:15px;font-weight:600;">${esc(time)}</td>
        </tr>
        <tr style="border-top:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;">인원</td>
          <td style="padding:10px 0;color:#fff;font-size:15px;">${party_size}명</td>
        </tr>
        ${notes ? `
        <tr style="border-top:1px solid rgba(255,255,255,0.06);">
          <td style="padding:10px 0;color:rgba(255,255,255,0.4);font-size:12px;letter-spacing:0.1em;vertical-align:top;">요청사항</td>
          <td style="padding:10px 0;color:rgba(255,255,255,0.65);font-size:14px;line-height:1.7;">${esc(notes)}</td>
        </tr>` : ''}
      </table>
    </div>

    <!-- 버튼 -->
    <div style="padding:0 32px 32px;display:flex;gap:12px;">
      <a href="${confirmUrl}"
         style="display:inline-block;background:#c8a96e;color:#0a0a0a;text-decoration:none;padding:14px 36px;border-radius:6px;font-weight:700;font-size:14px;letter-spacing:0.05em;">
        ✅ 수락
      </a>
      <a href="${cancelUrl}"
         style="display:inline-block;background:transparent;color:rgba(255,255,255,0.6);text-decoration:none;padding:14px 36px;border-radius:6px;font-weight:600;font-size:14px;letter-spacing:0.05em;border:1px solid rgba(255,255,255,0.15);">
        ❌ 거절
      </a>
    </div>

    <!-- 푸터 -->
    <div style="padding:16px 32px;background:rgba(0,0,0,0.3);border-top:1px solid rgba(255,255,255,0.06);">
      <p style="margin:0;color:rgba(255,255,255,0.2);font-size:11px;">수락 시 고객 휴대폰으로 예약 확정 문자가 자동 발송됩니다.</p>
    </div>
  </div>
</body>
</html>`,
    });
  } catch (emailErr) {
    console.error('Admin notification email error:', emailErr);
  }

  return { success: true };
}
