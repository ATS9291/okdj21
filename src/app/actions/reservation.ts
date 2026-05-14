'use server';

import { createClient } from '@supabase/supabase-js';

export async function submitReservation(formData: FormData) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const name       = formData.get('name') as string;
  const phone      = formData.get('phone') as string;
  const date       = formData.get('date') as string;
  const time       = formData.get('time') as string;
  const party_size = parseInt(formData.get('party_size') as string, 10);
  const notes      = formData.get('notes') as string || null;

  if (!name || !phone || !date || !time || !party_size) {
    return { error: '필수 항목을 모두 입력해주세요.' };
  }

  const { error } = await supabase
    .from('reservations')
    .insert({ name, phone, date, time, party_size, notes });

  if (error) {
    console.error('Reservation insert error:', error);
    return { error: '예약 저장 중 오류가 발생했습니다. 다시 시도해 주세요.' };
  }

  return { success: true };
}
