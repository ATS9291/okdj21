'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://www.instagram.com/' },
  { label: 'Threads',   href: 'https://www.threads.net/' },
  { label: 'YouTube',   href: 'https://www.youtube.com/' },
];

const SECTIONS = [
  { label: '대표 메뉴', sub: '된장 · 순두부 · 전골 · 미나리전', href: '/menu',  tag: 'MENU' },
  { label: '소개',      sub: '사장님과 직원 이야기',             href: '/about', tag: 'ABOUT' },
  { label: '블로그',    sub: '장사 노하우 · 재료 이야기',       href: '/blog',  tag: 'BLOG' },
];

const YOUTUBE_VIDEO_ID = 'VIDEO_ID_HERE';

export default function StartPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [showWidget, setShowWidget] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }
      );
    });

    const onScroll = () => setShowWidget(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      {/* ── 히어로 영상 ─────────────────────────────────────── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        <iframe
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
          allow="autoplay; fullscreen"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh', minWidth: '100%',
            height: '56.25vw', minHeight: '100%',
            border: 'none', pointerEvents: 'none',
          }}
          title="옥된장 영상"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0) 40%, rgba(10,10,10,0.6) 80%, rgba(10,10,10,1) 100%)',
        }} />
        <div ref={titleRef} style={{ position: 'absolute', bottom: 100, left: 0, right: 0, textAlign: 'center', opacity: 0 }}>
          <h1 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(48px, 6.5vw, 72px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '0.06em', lineHeight: 1.2,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 32px rgba(0,0,0,0.6), 0 0 80px rgba(200,169,110,0.18)',
          }}>
            오늘 행동이 내일의 기준이 된다
          </h1>
        </div>
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'bob 2s ease-in-out infinite',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>SCROLL</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 0v16M1 10l6 6 6-6" stroke="rgba(200,169,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </section>

      {/* ── 풀스크린 섹션 ────────────────────────────────────── */}
      {SECTIONS.map(({ label, sub, href, tag }, i) => {
        const isEven = i % 2 === 0;
        return (
          <section key={href} style={{
            position: 'relative', width: '100%', height: '100vh',
            display: 'flex', alignItems: 'center',
            background: isEven ? '#0a0a0a' : '#0d0d0d',
            borderTop: '1px solid rgba(200,169,110,0.07)',
            overflow: 'hidden',
          }}>
            {/* 배경 글로우 */}
            <div style={{
              position: 'absolute', inset: 0,
              background: isEven
                ? 'radial-gradient(ellipse at 72% 50%, rgba(200,169,110,0.05) 0%, transparent 55%)'
                : 'radial-gradient(ellipse at 28% 50%, rgba(200,169,110,0.05) 0%, transparent 55%)',
            }} />

            {/* 배경 섹션 번호 */}
            <span style={{
              position: 'absolute',
              right: isEven ? 40 : 'auto',
              left: isEven ? 'auto' : 40,
              top: '50%', transform: 'translateY(-50%)',
              fontFamily: 'sans-serif',
              fontSize: 'clamp(100px, 15vw, 200px)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.022)',
              userSelect: 'none', lineHeight: 1,
            }}>
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* 텍스트 + 콘텐츠 */}
            <div style={{
              position: 'relative', zIndex: 1,
              padding: '0 clamp(40px, 9vw, 140px)',
              maxWidth: 680,
              marginLeft: isEven ? 0 : 'auto',
              marginRight: isEven ? 'auto' : 0,
            }}>
              <p style={{
                fontFamily: 'sans-serif', fontSize: 11,
                letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 18,
              }}>
                {tag}
              </p>
              <h2 style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 'clamp(36px, 5.5vw, 68px)',
                fontWeight: 300, color: '#fff',
                letterSpacing: '0.05em', lineHeight: 1.25, marginBottom: 14,
              }}>
                {label}
              </h2>
              <p style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 14, color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.85, marginBottom: 44,
              }}>
                {sub}
              </p>

              {/* 콘텐츠 플레이스홀더 */}
              <div style={{
                width: '100%', height: 180,
                border: '1px dashed rgba(200,169,110,0.18)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: href === '/menu' ? 0 : 44,
                color: 'rgba(255,255,255,0.15)',
                fontSize: 11, fontFamily: 'sans-serif', letterSpacing: '0.15em',
              }}>
                CONTENT AREA
              </div>

              {/* 자세히 보기 — 메뉴 섹션 제외 */}
              {href !== '/menu' && (
                <a
                  href={href}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
                    color: '#c8a96e', textDecoration: 'none',
                    borderBottom: '1px solid rgba(200,169,110,0.35)',
                    paddingBottom: 4,
                    marginTop: 44,
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#e8c98e';
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#e8c98e';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e';
                    (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,169,110,0.35)';
                  }}
                >
                  자세히 보기
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </section>
        );
      })}

      {/* ── 찾아오시는 길 ────────────────────────────────────── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        display: 'flex', alignItems: 'center',
        background: '#0d0d0d',
        borderTop: '1px solid rgba(200,169,110,0.07)',
        overflow: 'hidden',
      }}>
        {/* 배경 글로우 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 72% 50%, rgba(200,169,110,0.05) 0%, transparent 55%)',
        }} />

        {/* 배경 섹션 번호 */}
        <span style={{
          position: 'absolute', right: 40,
          top: '50%', transform: 'translateY(-50%)',
          fontFamily: 'sans-serif',
          fontSize: 'clamp(100px, 15vw, 200px)',
          fontWeight: 800,
          color: 'rgba(255,255,255,0.022)',
          userSelect: 'none', lineHeight: 1,
        }}>04</span>

        {/* 2단 레이아웃 */}
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%',
          padding: '80px clamp(40px, 9vw, 140px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* 왼쪽: 텍스트 정보 */}
          <div>
            <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 18 }}>
              LOCATION
            </p>
            <h2 style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 'clamp(36px, 5.5vw, 68px)',
              fontWeight: 300, color: '#fff',
              letterSpacing: '0.05em', lineHeight: 1.25, marginBottom: 40,
            }}>
              찾아오시는 길
            </h2>

            {/* 주소 */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>주소</p>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 15, color: '#fff', lineHeight: 1.7 }}>
                서울특별시 서초구 서운로 6길 29, 1층
              </p>
            </div>

            {/* 운영시간 */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>운영시간</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { day: '매일', time: '11:00 — 22:00' },
                  { day: '쉬는시간', time: '없음' },
                ].map(({ day, time }) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 300 }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{day}</span>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: '#fff' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 교통 및 주차 */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 10, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>교통 및 주차</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  🚇 지하철 3호선 양재역 1번출구 도보 7분
                </p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  🚗 주차불가 · 유료주차 <span style={{ color: 'rgba(255,255,255,0.75)' }}>양지주차장</span> 도보 5분
                </p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, paddingLeft: 22 }}>
                  서울 서초구 서초동 1359-8
                </p>
              </div>
            </div>

            {/* 전화 */}
            <a
              href="tel:070-8657-2499"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 13, fontWeight: 600, letterSpacing: '0.1em',
                color: '#c8a96e', textDecoration: 'none',
                borderBottom: '1px solid rgba(200,169,110,0.35)',
                paddingBottom: 4,
                transition: 'color 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#e8c98e';
                (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#e8c98e';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e';
                (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(200,169,110,0.35)';
              }}
            >
              📞 070-8657-2499
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* 오른쪽: 지도 플레이스홀더 */}
          <div>
            <div style={{
              width: '100%', aspectRatio: '4/3',
              borderRadius: 8,
              overflow: 'hidden',
              border: '1px solid rgba(200,169,110,0.2)',
            }}>
              <iframe
                src="https://maps.google.com/maps?q=37.4857761,127.0310138&output=embed&z=18&hl=ko"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="옥된장 양재점 지도"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── 소셜 링크 (우측 상단 고정) ──────────────────────── */}
      <div style={{
        position: 'fixed', top: 0, right: 28,
        height: 64,
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        gap: 20, zIndex: 600,
      }}>
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.55)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'}
          >
            {label}
          </a>
        ))}
      </div>

      {/* ── 예약 플로팅 위젯 (마우스 접근 시 확장) ─────────── */}
      <div
        style={{
          position: 'fixed', right: 0, top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 300,
          opacity: showWidget ? 1 : 0,
          pointerEvents: showWidget ? 'auto' : 'none',
          transition: 'opacity 0.45s ease',
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div style={{
          display: 'flex', flexDirection: 'row', alignItems: 'stretch',
          background: 'rgba(8,8,8,0.96)',
          borderLeft: '2px solid #c8a96e',
          borderTop: '1px solid rgba(200,169,110,0.25)',
          borderBottom: '1px solid rgba(200,169,110,0.25)',
          borderRadius: '10px 0 0 10px',
          backdropFilter: 'blur(14px)',
        }}>
          {/* 확장 콘텐츠 */}
          <div style={{
            width: isExpanded ? 148 : 0,
            overflow: 'hidden',
            transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{ width: 148, padding: '24px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
              {/* 캘린더 아이콘 */}
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ color: '#c8a96e', flexShrink: 0 }}>
                <rect x="2" y="3.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M7 1.5v4M15 1.5v4M2 9h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                <circle cx="7.5" cy="14" r="1" fill="currentColor"/>
                <circle cx="11" cy="14" r="1" fill="currentColor"/>
                <circle cx="14.5" cy="14" r="1" fill="currentColor"/>
              </svg>

              {/* 구분선 */}
              <div style={{ width: '100%', height: 1, background: 'rgba(200,169,110,0.18)' }} />

              {/* 설명 */}
              <p style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 10, color: 'rgba(255,255,255,0.3)',
                textAlign: 'center', lineHeight: 1.9, letterSpacing: '0.05em',
                margin: 0,
              }}>
                테이블 예약<br />찾아오는 길
              </p>

              {/* 예약 버튼 */}
              <Link
                href="/reservation"
                style={{
                  display: 'block', width: '100%',
                  padding: '11px 0', textAlign: 'center',
                  background: '#c8a96e',
                  borderRadius: 4,
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 12, fontWeight: 700,
                  color: '#0a0a0a', textDecoration: 'none',
                  letterSpacing: '0.1em',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = '#dbb97e'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = '#c8a96e'}
              >
                바로 예약
              </Link>
            </div>
          </div>

          {/* 항상 보이는 탭 — 예약하기 수직 표시 */}
          <div style={{
            width: 44, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '28px 0',
            cursor: 'pointer',
          }}>
            <p style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 12, fontWeight: 700,
              letterSpacing: '0.22em', color: '#c8a96e',
              writingMode: 'vertical-rl', textOrientation: 'mixed',
              lineHeight: 1, margin: 0,
            }}>예약하기</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </main>
  );
}
