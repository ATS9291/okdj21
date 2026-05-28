'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { SOCIAL_LINKS } from '@/lib/constants';

const MENU_ITEMS = [
  { num: '01', name: '된장전골', en: 'DOENJANG JJEONGOL', desc: '20년 숙성 항아리 된장 베이스', price: '13,000', img: '/menu-된장전골.jpg', imgPos: 'center 50%', href: '/menu/doenjang' },
  { num: '02', name: '순두부전골', en: 'SUNDUBU JJEONGOL', desc: '부드러운 순두부와 해물의 조화', price: '14,000', img: '/menu-순두부전골.png', imgPos: 'center 50%', href: '/menu/sundubu' },
  { num: '03', name: '수육전골', en: 'SUYUK JJEONGOL', desc: '국내산 수육과 된장의 깊은 맛', price: '55,000', img: '/menu-수육전골.png', imgPos: 'center 50%', href: '/menu/sukyuk' },
  { num: '04', name: '별미차림', en: 'BYEOLMI CHARIM', desc: '계절 재료로 차린 별미 한상', price: '20,000', img: '/menu-별미차림.jpg', imgPos: 'center 50%', href: '/menu/byeolmi' },
];

const SECTIONS = [
  { label: '소개', sub: '사장님과 직원 이야기', href: '/about', tag: 'ABOUT' },
  { label: '블로그', sub: '장사 노하우 · 재료 이야기', href: '/blog', tag: 'BLOG' },
];

const YOUTUBE_VIDEO_ID = 'VIDEO_ID_HERE';

export default function StartPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [showWidget, setShowWidget] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });

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
            fontSize: 'clamp(35px, 5.2vw, 59px)',
            fontWeight: 800, color: '#fff',
            letterSpacing: '0.06em', lineHeight: 1.2,
            whiteSpace: 'nowrap',
            textShadow: '0 2px 32px rgba(0,0,0,0.6), 0 0 80px rgba(200,169,110,0.18)',
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
      <section style={{
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

        <div style={{ flex: 1, display: 'flex', marginTop: 28 }}>
          {MENU_ITEMS.map((item, i) => {
            const isHovered = hoveredMenu === i;
            const tx = isHovered ? tilt.x : 0;
            const ty = isHovered ? tilt.y : 0;
            return (
              <Link
                key={item.name}
                href={item.href}
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
              <div style={{
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
                    <span style={{
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
                    손님에서 직원으로 직원에서 연 10억매출 사장으로
                  </p>
                  {/* 소개 본문 */}
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 23, color: 'rgba(255,255,255,0.55)',
                    lineHeight: 2.1, letterSpacing: '0.03em',
                    marginBottom: 32,
                  }}>
                    김치짜글이만 찾던 제게 된장전골은 낯선 메뉴였습니다.<br />
                    그런데 두 번, 세 번… 발걸음이 잦아질수록 묘한 매력에 빠져들었고, 본사 대표님을 찾아가 창업의 뜻을 전했으나<br />
                    돌아온 답은 단호한 반대였습니다.<br />
                    <span style={{ color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>"요식업은 아무나 하는 게 아닙니다. 직접 일해 보시고, 충분히 고민해 보세요."</span><br />
                    고민 끝에 사직서를 내고 인수인계 기간동안 틈틈이 매장을 찾아 맞는길이 아니더라도 일내보자란 마인드로 배웠고,<br /> 퇴직 후엔 직영점 막내로 들어가 밑바닥부터 다시 배웠습니다.<br /> 매일 칼날에 손이베이고 설거지에 손이 부르트고 갈라지고, <br />하나라도 더 배우자는 생각에 14시간를 몰두하며 하루에 하나씩 기교 없이, 있는 그대로 천천히 익혀 나갔습니다.<br />
                    그렇게 흘린 땀과 열정을 인정받아 2024년, 21호점을 허락받았고 <br />지금의 옥된장 양재점이 탄생하게 되었습니다.<br />
                    부족하지만 확고한 운영철학은 옥된장 양재점이라는 공간안에서만큼 한 분 한 분이 따뜻한 정(情)을 느끼게, 해드리자이며 <br />초심을 잃지 않기 위해 매일 아침일찍 밥을 짓고, 한 분 한 분 기억하려 노력하고 먼저 인사하며, 같은 자리에서 같은 시간에 기다리고 있겠습니다.
                  </p>

                  {/* 구분선 */}
                  <div style={{ width: 48, height: 1, background: 'rgba(200,169,110,0.35)', marginBottom: 28 }} />

                  {/* 서명 */}
                  <p style={{
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
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 300 }}>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: 'rgba(255,255,255,0.45)' }}>{day}</span>
                    <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 23, color: '#fff' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 교통 및 주차 */}
            <div style={{ marginBottom: 40 }}>
              <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 20, letterSpacing: '0.25em', color: '#c8a96e', marginBottom: 10 }}>교통 및 주차</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
      <div style={{
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

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(7px); }
        }
      `}</style>
    </main>
  );
}
