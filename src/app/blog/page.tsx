'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { supabase, type BlogPost } from '@/lib/supabase';

const CATEGORIES = ['전체', '장사노하우', '재료이야기', '레시피', '일상'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default function BlogPage() {
  const [posts, setPosts]   = useState<BlogPost[]>([]);
  const [cat, setCat]       = useState('전체');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      let q = supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (cat !== '전체') q = q.eq('category', cat);
      const { data } = await q;
      setPosts(data ?? []);
      setLoading(false);
    })();
  }, [cat]);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px 32px 100px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 12 }}>
          BLOG
        </p>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: '#fff', marginBottom: 48, lineHeight: 1.3,
        }}>
          이야기
        </h1>

        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{
              padding: '12px 20px',
              fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
              fontWeight: c === cat ? 600 : 400,
              color: c === cat ? '#c8a96e' : 'rgba(255,255,255,0.4)',
              background: 'transparent', border: 'none',
              borderBottom: c === cat ? '2px solid #c8a96e' : '2px solid transparent',
              marginBottom: -1, cursor: NORIGAE_CURSOR, transition: 'color 0.2s',
            }}>
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14 }}>불러오는 중...</p>
        ) : posts.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14 }}>아직 게시된 글이 없습니다.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: 32 }}>
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  border: '1px solid rgba(200,169,110,0.15)',
                  borderRadius: 4, overflow: 'hidden',
                  transition: 'border-color 0.25s, transform 0.25s',
                  cursor: NORIGAE_CURSOR,
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.5)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(200,169,110,0.15)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  }}
                >
                  {/* 커버 이미지 */}
                  <div style={{
                    width: '100%', aspectRatio: '16/7',
                    background: post.cover_image_url ? `url(${post.cover_image_url}) center/cover` : 'rgba(200,169,110,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {!post.cover_image_url && (
                      <span style={{ color: 'rgba(200,169,110,0.3)', fontSize: 32 }}>✍️</span>
                    )}
                  </div>

                  <div style={{ padding: '20px 24px 24px' }}>
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: 10,
                      color: '#c8a96e', letterSpacing: '0.2em',
                    }}>
                      {post.category}
                    </span>
                    <h2 style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 17, fontWeight: 600, color: '#fff',
                      margin: '8px 0 10px', lineHeight: 1.5,
                    }}>
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p style={{
                        fontFamily: "'Noto Sans KR', sans-serif",
                        fontSize: 13, color: 'rgba(255,255,255,0.4)',
                        lineHeight: 1.7,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                      }}>
                        {post.excerpt}
                      </p>
                    )}
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: 11,
                      color: 'rgba(255,255,255,0.2)', marginTop: 16,
                    }}>
                      {formatDate(post.created_at)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
