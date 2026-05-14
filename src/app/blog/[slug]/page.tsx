'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { supabase, type BlogPost } from '@/lib/supabase';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const router   = useRouter();
  const [post, setPost]     = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .single();
      if (!data) { router.push('/blog'); return; }
      setPost(data);
      setLoading(false);
    })();
  }, [slug, router]);

  if (loading) {
    return (
      <main style={{ background: '#0a0a0a', minHeight: '100vh' }}>
        <SiteNav />
      </main>
    );
  }

  if (!post) return null;

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      {post.cover_image_url && (
        <div style={{
          width: '100%', height: '45vh',
          background: `url(${post.cover_image_url}) center/cover`,
          marginTop: 64,
        }} />
      )}

      <div style={{
        maxWidth: 680, margin: '0 auto',
        padding: post.cover_image_url ? '60px 32px 100px' : '140px 32px 100px',
      }}>
        <button onClick={() => router.push('/blog')} style={{
          background: 'transparent', border: 'none',
          color: 'rgba(200,169,110,0.7)', fontFamily: 'sans-serif', fontSize: 12,
          letterSpacing: '0.15em', cursor: NORIGAE_CURSOR, marginBottom: 40,
          padding: 0,
        }}>
          ← 목록으로
        </button>

        <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: '#c8a96e', letterSpacing: '0.25em' }}>
          {post.category}
        </span>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 500,
          color: '#fff', margin: '12px 0 8px', lineHeight: 1.5,
        }}>
          {post.title}
        </h1>
        <p style={{
          fontFamily: 'sans-serif', fontSize: 11,
          color: 'rgba(255,255,255,0.25)', marginBottom: 56,
        }}>
          {formatDate(post.created_at)}
        </p>

        <div style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 15, color: 'rgba(255,255,255,0.75)',
          lineHeight: 2.1,
          whiteSpace: 'pre-wrap',
        }}>
          {post.content}
        </div>
      </div>
    </main>
  );
}
