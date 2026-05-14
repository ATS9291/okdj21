'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

const SECTION_CARDS = [
  { label: '대표 메뉴', sub: '된장 · 순두부 · 전골 · 미나리전', href: '/menu', icon: '🍲' },
  { label: '소개',     sub: '사장님과 직원 이야기',             href: '/about', icon: '👨‍🍳' },
  { label: '예약',     sub: '테이블 예약 · 찾아오는 길',       href: '/reservation', icon: '📅' },
  { label: '블로그',   sub: '장사 노하우 · 재료 이야기',       href: '/blog', icon: '✍️' },
];

// 실제 YouTube 영상 ID로 교체하세요
const YOUTUBE_VIDEO_ID = 'VIDEO_ID_HERE';

export default function GalleryPage() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.5 }
      );
    }
  }, []);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      {/* 히어로 영상 */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
          allow="autoplay; fullscreen"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh',
            minWidth: '100%',
            height: '56.25vw',
            minHeight: '100%',
            border: 'none',
            pointerEvents: 'none',
          }}
          title="옥된장 영상"
        />

        {/* 그라디언트 오버레이 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.6) 80%, rgba(10,10,10,1) 100%)',
        }} />

        {/* 영상 타이틀 */}
        <div ref={titleRef} style={{
          position: 'absolute', bottom: 100, left: 0, right: 0,
          textAlign: 'center', opacity: 0,
        }}>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 12, letterSpacing: '0.35em',
            color: '#c8a96e', marginBottom: 16,
          }}>
            옥된장의 하루
          </p>
          <h1 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '0.08em', lineHeight: 1.5,
          }}>
            정직한 재료,<br />매일 같은 맛
          </h1>
        </div>

        {/* 스크롤 유도 */}
        <div style={{
          position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'bob 2s ease-in-out infinite',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>SCROLL</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 0v16M1 10l6 6 6-6" stroke="rgba(200,169,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* 섹션 링크 카드 */}
      <section style={{ padding: '80px 40px 100px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{
          fontFamily: 'sans-serif', fontSize: 11,
          letterSpacing: '0.3em', color: '#c8a96e',
          marginBottom: 48, textAlign: 'center',
        }}>
          EXPLORE
        </p>
        <div ref={cardsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 20,
        }}>
          {SECTION_CARDS.map(({ label, sub, href, icon }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  padding: '36px 28px',
                  border: '1px solid rgba(200,169,110,0.2)',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.25s, background 0.25s, transform 0.25s',
                  cursor: NORIGAE_CURSOR,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(200,169,110,0.6)';
                  el.style.background = 'rgba(200,169,110,0.05)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.borderColor = 'rgba(200,169,110,0.2)';
                  el.style.background = 'rgba(255,255,255,0.02)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
                <h2 style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 20, fontWeight: 600,
                  color: '#fff', marginBottom: 8,
                }}>
                  {label}
                </h2>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 13, color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.7,
                }}>
                  {sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </main>
  );
}
