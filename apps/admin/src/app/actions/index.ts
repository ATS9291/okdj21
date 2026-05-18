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

export async function updateReservationStatus(id: string, status: 'confirmed' | 'cancelled') {
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
