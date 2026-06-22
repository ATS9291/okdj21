'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createDb } from '@okdoenjang/database';

const client = createDb();

export async function adminLogin(formData: FormData) {
  const pw = formData.get('password') as string;
  if (pw !== process.env.ADMIN_PASSWORD) {
    return { error: '비밀번호가 올바르지 않습니다.' };
  }
  const cookieStore = await cookies();
  cookieStore.set('admin_session', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 * 8 });
  redirect('/');
}

export async function adminLogout() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  redirect('/login');
}

async function sendSms(phone: string, message: string) {
  const form = new FormData();
  form.append('key',         process.env.ALIGO_API_KEY!);
  form.append('user_id',     process.env.ALIGO_USER_ID!);
  form.append('sender',      process.env.ALIGO_SENDER!);
  form.append('receiver',    phone.replace(/-/g, ''));
  form.append('msg',         message);
  form.append('testmode_yn', 'N');
  const res = await fetch('https://apis.aligo.in/send/', { method: 'POST', body: form });
  return res.json();
}

export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled') {
  if (status === 'confirmed') {
    const { data: r, error } = await client
      .from('reservations')
      .update({ status })
      .eq('id', id)
      .select('name, phone, date, time, party_size')
      .single();
    if (error) return { error: error.message };

    if (r) {
      try {
        const dateFormatted = new Date(r.date).toLocaleDateString('ko-KR', {
          month: 'long', day: 'numeric', weekday: 'short',
        });
        const msg =
          `[옥된장 양재점] ${r.name}님, 예약이 확정되었습니다!\n` +
          `📅 ${dateFormatted} ${r.time} / ${r.party_size}명\n` +
          `📍 서울 서초구 서운로6길 29, 1층\n` +
          `문의: 070-8657-2499`;
        await sendSms(r.phone, msg);
      } catch (e) {
        console.error('SMS error:', e);
      }
    }
    return { success: true };
  }

  const { error } = await client.from('reservations').update({ status }).eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function saveBlogPost(formData: FormData) {
  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const category = formData.get('category') as string;
  const excerpt = (formData.get('excerpt') as string) || null;
  const content = formData.get('content') as string;
  const cover_image_url = (formData.get('cover_image_url') as string) || null;
  const published = formData.get('published') === 'true';

  if (id) {
    const { error } = await client
      .from('blog_posts')
      .update({ title, slug, category, excerpt, content, cover_image_url, published })
      .eq('id', id);
    if (error) return { error: error.message };
  } else {
    const { error } = await client
      .from('blog_posts')
      .insert({ title, slug, category, excerpt, content, cover_image_url, published });
    if (error) return { error: error.message };
  }
  return { success: true };
}

export async function deleteBlogPost(id: string) {
  const { error } = await client.from('blog_posts').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}
