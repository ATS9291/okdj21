'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { SOCIAL_LINKS } from '@/lib/constants';

const MENU_ITEMS = [
  { num: '01', name: '된장전골', en: 'DOENJANG JJEONGOL', desc: '50년 비밀 된장 레시피', price: '13,000', img: '/menu-된장전골.jpg', imgPos: 'center 50%', href: '/menu/doenjang' },
  { num: '02', name: '순두부전골', en: 'SUNDUBU JJEONGOL', desc: '칼칼함과 부드러움의 만남', price: '14,000', img: '/menu-순두부전골.png', imgPos: 'center 50%', href: '/menu/sundubu' },
  { num: '03', name: '수육전골', en: 'SUYUK JJEONGOL', desc: '술안주 겸 해장까지 가능한 혜자메뉴', price: '55,000', img: '/menu-수육전골.png', imgPos: 'center 50%', href: '/menu/sukyuk' },
  { num: '04', name: '별미차림', en: 'BYEOLMI CHARIM', desc: '안먹어본 사람은 있어도 한번먹어본사람은 없는 메뉴', price: '20,000', img: '/menu-별미차림.jpg', imgPos: 'center 50%', href: '/menu/byeolmi' },
];

const SECTIONS = [
  { label: '소개', sub: '사장님과 직원 이야기', href: '/about', tag: 'ABOUT' },
  { label: '블로그', sub: '장사 노하우 · 재료 이야기', href: '/blog', tag: 'BLOG' },
];

export default function StartPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showWidget, setShowWidget] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  // 문 입장 전환 여부 — 동기 초기화로 첫 렌더부터 패널 표시
  const [isDoorEntry] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const val = sessionStorage.getItem('doorEntry') === '1';
    if (val) sessionStorage.removeItem('doorEntry');
    return val;
  });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (0.5 - py) * 18, y: (px - 0.5) * 24 });
    setGlare({ x: px * 100, y: py * 100 });
  };

  const handleCardLeave = () => {
    setHoveredMenu(null);
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50 });
  };

  // 문 입장 시 layout의 DoorOverlay에 패널 열기 신호
  useEffect(() => {
    if (!isDoorEntry) return;
    window.dispatchEvent(new Event('doorOpen'));
  }, [isDoorEntry]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: isDoorEntry ? 0.6 : 0.3 }
      );
    });

    if (videoRef.current) videoRef.current.playbackRate = 0.9;

    const onScroll = () => setShowWidget(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { ctx.revert(); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      {/* ── 히어로 영상 ─────────────────────────────────────── */}
      <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', animation: 'projectorFlicker 6s infinite' }}>

        {/* SVG 필터 정의 */}
        <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            {/* 유기적 필름 그레인 */}
            <filter id="filmGrain" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="4" stitchTiles="stitch">
                <animate attributeName="seed" values="0;3;7;1;9;4;6;2;8;5;0" dur="0.07s" repeatCount="indefinite" />
              </feTurbulence>
              <feColorMatrix type="matrix"
                values="0 0 0 0 0.52
                        0 0 0 0 0.42
                        0 0 0 0 0.22
                        0 0 0 0.42 0" />
            </filter>
            {/* 미세 입자 */}
            <filter id="fineGrain" x="0%" y="0%" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch">
                <animate attributeName="seed" values="5;2;8;0;6;3;9;1;7;4;5" dur="0.05s" repeatCount="indefinite" />
              </feTurbulence>
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>

        {/* 영상 — 80년대 필름 색감 */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '177.78vh', minWidth: '100%',
            height: '56.25vw', minHeight: '100%',
            objectFit: 'cover', pointerEvents: 'none',
            filter: 'sepia(0.28) contrast(1.06) brightness(0.82) saturate(0.65) hue-rotate(-6deg)',
          }}
        >
          <source src="https://n6vkksjxda93kdi5.public.blob.vercel-storage.com/hero.mp4" type="video/mp4" />
        </video>

        {/* 필름 베이스 포그 — 블랙 리프트 (필름은 순수 검정이 없다) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(48, 36, 16, 0.09)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }} />

        {/* 색 그레이딩 — 그림자 청록, 하이라이트 앰버 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(200,155,60,0.1) 0%, transparent 45%, rgba(18,38,52,0.22) 100%)',
          mixBlendMode: 'soft-light',
          pointerEvents: 'none',
        }} />

        {/* 라이트 리크 — 상단 좌측 앰버 (80년대 필름 번짐) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 12% 0%, rgba(220,155,40,0.22) 0%, rgba(180,100,20,0.08) 38%, transparent 62%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }} />

        {/* 유기적 필름 그레인 */}
        <div style={{
          position: 'absolute', inset: 0,
          filter: 'url(#filmGrain)',
          opacity: 0.55,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          background: 'white',
        }} />

        {/* 미세 그레인 */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.18, mixBlendMode: 'overlay' } as React.CSSProperties}>
          <rect width="100%" height="100%" filter="url(#fineGrain)" />
        </svg>

        {/* 필름 스크래치 — 세로 라인 (불규칙 나타남) */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent 0px, transparent 320px, rgba(255,230,180,0.03) 320px, rgba(255,230,180,0.03) 321px)',
          animation: 'scratchMove 0.25s steps(1) infinite',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
        }} />

        {/* 강한 비네트 — 80년대 렌즈 특성 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 48%, transparent 40%, rgba(12,8,4,0.55) 72%, rgba(6,4,2,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        {/* 하단 페이드 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, transparent 30%, rgba(10,10,10,0.5) 76%, rgba(10,10,10,1) 100%)',
        }} />

        {/* 슬로건 (하단) */}
        <div ref={titleRef} className="hero-bottom" style={{
          position: 'absolute', bottom: 100, left: 0, right: 0,
          textAlign: 'center',
          opacity: 0,
        }}>
          <h1 className="hero-h1" style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(36px, 4.6vw, 60px)',
            fontWeight: 800,
            letterSpacing: '0.06em', lineHeight: 1.2,
            margin: 0,
            color: '#c8a96e',
            textShadow: '0 2px 32px rgba(0,0,0,0.7), 0 0 60px rgba(200,169,110,0.25)',
          }}>
            우리의 미친짓이 내일의 기준이 된다
          </h1>
        </div>
        <div style={{
          position: 'absolute', bottom: 32, left: '50%',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          animation: 'bob 2s ease-in-out infinite',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, letterSpacing: '0.25em', fontFamily: 'sans-serif' }}>SCROLL</span>
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
            <path d="M7 0v16M1 10l6 6 6-6" stroke="rgba(200,169,110,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </section>

      {/* ── 대표 메뉴 (seed.com 스타일 4패널) ──────────────── */}
      <section className="menu-section" style={{
        position: 'relative', width: '100%', height: '100vh',
        display: 'flex', flexDirection: 'column',
        background: '#0a0a0a',
        borderTop: '1px solid rgba(200,169,110,0.07)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '44px clamp(40px, 9vw, 140px) 0', flexShrink: 0 }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 10 }}>MENU</p>
          <h2 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 300, color: '#fff', letterSpacing: '0.05em',
          }}>대표 메뉴</h2>
        </div>

        <div className="menu-strip" style={{ flex: 1, display: 'flex', marginTop: 28 }}>
          {MENU_ITEMS.map((item, i) => {
            const isHovered = hoveredMenu === i;
            const tx = isHovered ? tilt.x : 0;
            const ty = isHovered ? tilt.y : 0;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="menu-card"
                onMouseEnter={() => setHoveredMenu(i)}
                onMouseLeave={handleCardLeave}
                onMouseMove={handleCardMouseMove}
                style={{
                  flex: isHovered ? '1.55' : (hoveredMenu !== null ? '0.82' : '1'),
                  position: 'relative',
                  textDecoration: 'none',
                  borderRight: i < 3 ? '1px solid rgba(200,169,110,0.08)' : 'none',
                  cursor: 'pointer',
                  perspective: '1000px',
                  overflow: 'visible',
                  transition: 'flex 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* 3D 회전 카드 */}
                <div style={{
                  width: '100%', height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#0a0a0a',
                  transform: `rotateX(${tx}deg) rotateY(${ty}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: isHovered
                    ? 'transform 0.08s linear'
                    : 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1)',
                  willChange: 'transform',
                }}>
                  {/* 배경 이미지 — 카드 꽉 채움, 냄비 높이 70%로 정규화 */}
                  <img
                    src={item.img}
                    alt={item.name}
                    style={{
                      position: 'absolute', inset: 0,
                      width: '100%', height: '100%',
                      objectFit: 'cover',
                      objectPosition: item.imgPos,
                      filter: `brightness(${isHovered ? 0.78 : 0.5}) saturate(${isHovered ? 1.15 : 0.85})`,
                      transition: 'filter 0.5s ease',
                    }}
                  />

                  {/* 상단 비네트 — 틈 마스킹 + 어두운 럭셔리 분위기 */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: '18%',
                    background: 'linear-gradient(to bottom, rgba(10,10,10,0.75) 0%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />

                  {/* 하단 그라데이션 — 텍스트 가독성 */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 50%, transparent 100%)',
                    pointerEvents: 'none',
                  }} />

                  {/* 상단 골드 라인 */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: 'linear-gradient(90deg, transparent, #c8a96e, transparent)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.35s',
                    transform: 'translateZ(2px)',
                  }} />

                  {/* 번호 */}
                  <span style={{
                    position: 'absolute', top: 20, left: 20,
                    fontFamily: 'sans-serif', fontSize: 10, letterSpacing: '0.22em',
                    color: isHovered ? '#c8a96e' : 'rgba(255,255,255,0.3)',
                    transition: 'color 0.35s',
                    transform: 'translateZ(20px)',
                  }}>{item.num}</span>

                  {/* 텍스트 오버레이 */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '0 24px 32px',
                    display: 'flex', flexDirection: 'column', gap: 7,
                    transform: 'translateZ(30px)',
                  }}>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: 9, letterSpacing: '0.28em',
                      color: '#c8a96e', margin: 0,
                      opacity: isHovered ? 1 : 0,
                      transform: `translateY(${isHovered ? 0 : 6}px)`,
                      transition: 'opacity 0.3s, transform 0.3s',
                    }}>{item.en}</p>
                    <h3 style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 'clamp(19px, 2vw, 28px)',
                      fontWeight: 500,
                      color: '#fff',
                      letterSpacing: '0.05em', margin: 0,
                    }}>{item.name}</h3>
                    <p style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 12, color: 'rgba(255,255,255,0.6)',
                      margin: 0, lineHeight: 1.65,
                      opacity: isHovered ? 1 : 0,
                      transform: `translateY(${isHovered ? 0 : 6}px)`,
                      transition: 'opacity 0.3s 0.05s, transform 0.3s 0.05s',
                    }}>{item.desc}</p>
                    <p style={{
                      fontFamily: 'sans-serif', fontSize: 15, letterSpacing: '0.06em',
                      color: '#c8a96e', fontWeight: 500,
                      margin: 0,
                    }}>₩ {item.price}</p>
                  </div>

                  {/* 글레어 */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: isHovered
                      ? `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,230,160,0.11) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)`
                      : 'none',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s',
                    pointerEvents: 'none',
                    transform: 'translateZ(1px)',
                  }} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── 풀스크린 섹션 ────────────────────────────────────── */}
      {SECTIONS.map(({ label, sub, href, tag }, i) => {
        const isEven = i % 2 === 0;
        const isAbout = tag === 'ABOUT';
        return (
          <section key={href} style={{
            position: 'relative', width: '100%',
            height: isAbout ? 'auto' : '100vh',
            display: 'flex', alignItems: 'center',
            background: isEven ? '#0a0a0a' : '#0d0d0d',
            borderTop: '1px solid rgba(200,169,110,0.07)',
            overflow: isAbout ? 'visible' : 'hidden',
            ...(isAbout && { minHeight: '100vh', padding: 'clamp(60px, 8vh, 100px) 0' }),
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

            {isAbout ? (
              <div className="about-content-wrap" style={{
                position: 'relative', zIndex: 1,
                width: '100%',
                paddingLeft: 0,
                paddingRight: 'clamp(40px, 9vw, 140px)',
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr',
                gap: 'clamp(32px, 5vw, 80px)',
                alignItems: 'center',
              }}>
                <div style={{
                  width: '100%',
                  overflow: 'hidden',
                  borderRadius: 4,
                  border: '1px solid rgba(200,169,110,0.2)',
                }}>
                  <Image
                    src="/사장.jpg"
                    alt="사장님"
                    width={600}
                    height={800}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <p style={{
                    fontFamily: 'sans-serif', fontSize: 18,
                    letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 18,
                  }}>
                    {tag}
                  </p>
                  <h2 style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 'clamp(39px, 4.5vw, 63px)',
                    fontWeight: 300, color: '#fff',
                    letterSpacing: '0.05em', lineHeight: 1.25, marginBottom: 32,
                  }}>
                    {label}
                  </h2>

                  {/* 직함 + 이름 */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                    <span style={{
                      fontFamily: 'sans-serif', fontSize: 17,
                      letterSpacing: '0.2em', color: '#c8a96e',
                      border: '1px solid rgba(200,169,110,0.4)',
                      padding: '4px 10px', borderRadius: 2,
                    }}>대표</span>
                    <span className="about-person-name" style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 25, fontWeight: 500, color: '#fff',
                      letterSpacing: '0.08em',
                    }}>이기태</span>
                  </div>

                  {/* 후킹 제목 */}
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 'clamp(23px, 2.2vw, 28px)',
                    fontWeight: 600, color: '#c8a96e',
                    lineHeight: 1.6, letterSpacing: '0.02em',
                    marginBottom: 20,
                  }}>
                    손님으로 처음 맛본 된장전골 한 그릇이 제 인생을 바꿨습니다.
                  </p>
                  {/* 소개 본문 */}
                  <p className="about-body-text" style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 23, color: 'rgba(255,255,255,0.55)',
                    lineHeight: 2.1, letterSpacing: '0.03em',
                    marginBottom: 32,
                  }}>
                    두 번, 세 번 발걸음이 잦아지다 결국 다니던 회사에 사직서를 냈습니다.<br />
                    본사 대표님은 단호했습니다.<br />
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>"요식업은 아무나 하는 게 아닙니다. 직접 일해 보세요."</span><br />
                    그 말을 듣고 직영점 막내로 들어가 매일 14시간씩 칼질에 손이 베이고,<br />
                    설거지에 손이 부르트며 밑바닥부터 익혔습니다.<br />
                    기교 없이, 하루에 하나씩, 있는 그대로.<br /><br />
                    흘린 땀을 인정받아 2024년, 21호점 옥된장 양재점을 열었습니다.<br /><br />
                    지금도 매일 아침 직접 밥을 짓고, 오신 분 한 분 한 분을 기억하며 먼저 인사드립니다.<br />
                    이 공간 안에서만큼은 따뜻한 정(情)을 느끼고 가시도록,<br />
                    오늘도 같은 자리에서 기다리고 있겠습니다.
                  </p>

                  {/* 구분선 */}
                  <div style={{ width: 48, height: 1, background: 'rgba(200,169,110,0.35)', marginBottom: 28 }} />

                  {/* 서명 */}
                  <p className="about-sign-text" style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 22, color: 'rgba(255,255,255,0.3)',
                    lineHeight: 1.9, letterSpacing: '0.04em',
                    marginBottom: 40,
                  }}>
                    — 옥된장 양재점 점주 이기태 드림
                  </p>

                  {/* 슬로건 */}
                  <div style={{
                    borderLeft: '2px solid #c8a96e',
                    paddingLeft: 20,
                  }}>
                    <p style={{
                      fontFamily: "'Noto Sans KR', sans-serif",
                      fontSize: 'clamp(22px, 1.6vw, 27px)',
                      fontWeight: 500,
                      color: '#fff',
                      lineHeight: 1.7,
                      letterSpacing: '0.04em',
                      margin: 0,
                    }}>
                      삭막한 세상,<br />
                      <span style={{ color: '#c8a96e' }}>정(情)</span>이 뭔지 보여드리겠습니다.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
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
                  marginBottom: 44,
                  color: 'rgba(255,255,255,0.15)',
                  fontSize: 11, fontFamily: 'sans-serif', letterSpacing: '0.15em',
                }}>
                  CONTENT AREA
                </div>

                <Link
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
                    <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            )}
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
        }}>03</span>

        {/* 2단 레이아웃 */}
        <div className="loc-grid" style={{
          position: 'relative', zIndex: 1,
          width: '100%',
          padding: '80px clamp(40px, 9vw, 140px)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}>
          {/* 왼쪽: 텍스트 정보 */}
          <div className="loc-info">
            <p style={{ fontFamily: 'sans-serif', fontSize: 21, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 18 }}>
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
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>주소</p>
              <a
                href="https://naver.me/GkR3y2cn"
                target="_blank"
                rel="noopener noreferrer"
                className="loc-addr"
                style={{
                  fontFamily: "'Noto Sans KR', sans-serif", fontSize: 25, color: '#fff', lineHeight: 1.7,
                  textDecoration: 'underline', textUnderlineOffset: 4, transition: 'color 0.2s', display: 'inline-block',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e'}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
              >
                서울특별시 서초구 서운로 6길 29, 1층
              </a>
            </div>

            {/* 운영시간 */}
            <div style={{ marginBottom: 32 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>운영시간</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { day: '매일', time: '11:00 — 22:00' },
                  { day: '쉬는시간', time: '없음' },
                ].map(({ day, time }) => (
                  <div key={day} className="loc-hour-row" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 300 }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: 'rgba(255,255,255,0.45)' }}>{day}</span>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: '#fff' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 교통 및 주차 */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>교통 및 주차</p>
              <div className="loc-transport" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  🚇 지하철 3호선 양재역 1번출구 도보 7분
                </p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  🚗 주차불가 · 유료주차{' '}
                  <a
                    href="https://naver.me/GyYbPrdY"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'underline', textUnderlineOffset: 3, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)'}
                  >
                    양지주차장
                  </a>{' '}
                  도보 5분
                </p>
                <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22, color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, paddingLeft: 22 }}>
                  <span style={{ color: 'rgba(200,169,110,0.6)' }}>양지주차장 주소:</span>{' '}
                  <a
                    href="https://naver.me/GyYbPrdY"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'underline', textUnderlineOffset: 3, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e'}
                    onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)'}
                  >
                    서울 서초구 서초동 1359-8
                  </a>
                </p>
              </div>
            </div>

            {/* 전화 */}
            <a
              href="tel:07086572499"
              className="loc-phone"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 23, fontWeight: 600, letterSpacing: '0.1em',
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
                <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
      <div className="soc-links" style={{
        position: 'fixed', top: 0, right: 28,
        height: 64,
        display: 'flex', flexDirection: 'row', alignItems: 'center',
        gap: 24, zIndex: 600,
      }}>
        {SOCIAL_LINKS.map(({ ko, en, href }) => (
          <a
            key={en}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
              textDecoration: 'none',
              color: 'rgba(255,255,255,0.55)',
              transition: 'color 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#fff'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'}
          >
            <span style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 16, fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1,
            }}>{ko}</span>
            <span style={{
              fontFamily: 'sans-serif',
              fontSize: 10, fontWeight: 400, letterSpacing: '0.2em', lineHeight: 1,
              opacity: 0.65,
            }}>{en}</span>
          </a>
        ))}
      </div>

      {/* ── 예약 플로팅 위젯 (마우스 접근 시 확장) ─────────── */}
      <div
        className="rsv-widget"
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
                <rect x="2" y="3.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 1.5v4M15 1.5v4M2 9h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                <circle cx="7.5" cy="14" r="1" fill="currentColor" />
                <circle cx="11" cy="14" r="1" fill="currentColor" />
                <circle cx="14.5" cy="14" r="1" fill="currentColor" />
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

      {/* ── 모바일 전용 예약 하단 바 ─────────────────────────── */}
      <Link
        href="/reservation"
        className="rsv-mobile-cta"
        style={{
          display: 'none',
          position: 'fixed', bottom: 0, left: 0, right: 0,
          zIndex: 300,
          padding: '16px 24px',
          background: '#c8a96e',
          textAlign: 'center',
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 16, fontWeight: 700,
          color: '#0a0a0a', textDecoration: 'none',
          letterSpacing: '0.08em',
          opacity: showWidget ? 1 : 0,
          pointerEvents: showWidget ? 'auto' : 'none',
          transition: 'opacity 0.45s ease',
          borderTop: '1px solid rgba(0,0,0,0.15)',
        }}
      >
        테이블 예약하기 →
      </Link>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
        /* 영사기 특유의 불규칙 밝기 떨림 */
        @keyframes projectorFlicker {
          0%,  100% { opacity: 1; }
          8%         { opacity: 0.93; }
          9%         { opacity: 1; }
          22%        { opacity: 1; }
          23%        { opacity: 0.86; }
          24%        { opacity: 0.97; }
          25%        { opacity: 1; }
          51%        { opacity: 1; }
          52%        { opacity: 0.91; }
          53%        { opacity: 1; }
          78%        { opacity: 1; }
          79%        { opacity: 0.89; }
          80%        { opacity: 0.96; }
          81%        { opacity: 1; }
        }
        /* 필름 스크래치 위치 이동 */
        @keyframes scratchMove {
          0%   { background-position: 0 0; }
          25%  { background-position: -48px 0; }
          50%  { background-position: 112px 0; }
          75%  { background-position: -90px 0; }
          100% { background-position: 30px 0; }
        }

        /* ── 반응형 ─────────────────────────────────────────── */

        /* 히어로 타이틀 */
        @media (max-width: 640px) {
          .hero-h1 {
            white-space: normal !important;
            font-size: clamp(22px, 7vw, 32px) !important;
            padding: 0 20px;
          }
          .hero-bottom { bottom: 72px !important; }
        }

        /* 메뉴 4패널 → 2×2 그리드 */
        @media (max-width: 768px) {
          .menu-section { height: auto !important; }
          .menu-strip {
            display: grid !important;
            flex: none !important;
            grid-template-columns: 1fr 1fr !important;
            grid-template-rows: repeat(2, 48vw) !important;
            margin-top: 8px !important;
          }
          .menu-card {
            flex: none !important;
            height: auto !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(200,169,110,0.08) !important;
            overflow: hidden !important;
          }
          .menu-card > div { height: 100% !important; }
        }

        /* 소개 섹션 그리드 → 1열 */
        @media (max-width: 768px) {
          .about-content-wrap {
            grid-template-columns: 1fr !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .about-body-text { font-size: 15px !important; line-height: 1.85 !important; }
          .about-sign-text { font-size: 14px !important; }
          .about-person-name { font-size: 18px !important; }
        }

        /* 위치 섹션 그리드 → 1열 */
        @media (max-width: 768px) {
          .loc-grid {
            grid-template-columns: 1fr !important;
            padding: 60px 24px 60px !important;
            gap: 40px !important;
          }
          .loc-addr { font-size: 17px !important; }
          .loc-hour-row span { font-size: 16px !important; }
          .loc-transport p { font-size: 15px !important; }
          .loc-phone { font-size: 17px !important; }
        }

        /* 소셜 링크 → 네비게이션 링크와 겹치므로 전체 숨김 */
        .soc-links { display: none !important; }

        /* 예약 위젯 → 모바일 숨김, 하단 바 표시 */
        @media (max-width: 768px) {
          .rsv-widget { display: none !important; }
          .rsv-mobile-cta { display: block !important; }
        }
      `}</style>
    </main>
  );
}
