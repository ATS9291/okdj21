import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendSms } from '@/lib/sms';
import { formatDateShort } from '@/lib/format';

type Reservation = {
  status: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  party_size: number;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id     = searchParams.get('id');
  const action = searchParams.get('action');

  if (!id || !['confirm', 'cancel'].includes(action ?? '')) {
    return new NextResponse('잘못된 요청입니다.', { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: reservation, error: fetchError } = await supabase
    .from('reservations')
    .select('status, name, phone, date, time, party_size')
    .eq('id', id)
    .single<Reservation>();

  if (fetchError || !reservation) {
    return new NextResponse(html('⚠️', '예약 없음', '해당 예약을 찾을 수 없습니다.'), {
      status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  if (reservation.status !== 'pending') {
    const label = reservation.status === 'confirmed' ? '이미 수락된' : '이미 거절된';
    return new NextResponse(html('⚠️', '이미 처리된 예약', `${label} 예약입니다.`), {
      status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const status = action === 'confirm' ? 'confirmed' : 'cancelled';
  const { error: updateError } = await supabase
    .from('reservations')
    .update({ status })
    .eq('id', id);

  if (updateError) {
    console.error('Status update error:', updateError);
    return new NextResponse('처리 중 오류가 발생했습니다.', { status: 500 });
  }

  if (action === 'confirm') {
    try {
      const dateFormatted = formatDateShort(reservation.date);
      const msg =
        `[옥된장 양재점] ${reservation.name}님, 예약이 확정되었습니다!\n` +
        `📅 ${dateFormatted} ${reservation.time} / ${reservation.party_size}명\n` +
        `📍 서울 서초구 서운로6길 29, 1층\n` +
        `문의: 070-8657-2499`;
      await sendSms(reservation.phone, msg);
    } catch (smsErr) {
      console.error('SMS send error:', smsErr);
    }

    return new NextResponse(
      html('✅', '예약 수락 완료', `${reservation.name}님께 예약 확정 문자를 발송했습니다.`),
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  return new NextResponse(
    html('❌', '예약 거절 완료', `${reservation.name}님의 예약을 거절 처리했습니다.`),
    { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

function html(icon: string, title: string, message: string) {
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Apple SD Gothic Neo','Noto Sans KR',sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;">
  <div style="text-align:center;padding:48px 32px;max-width:400px;">
    <div style="font-size:52px;margin-bottom:20px;">${icon}</div>
    <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#c8a96e;">${title}</h1>
    <p style="margin:0;color:rgba(255,255,255,0.55);font-size:14px;line-height:1.8;">${message}</p>
  </div>
</body>
</html>`;
}
