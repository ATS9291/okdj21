'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

type Person = {
  name: string;
  role: string;
  initials: string;
  quote: string;
  story: string;
  tilt: number;
};

const PEOPLE: Person[] = [
  {
    name: '홍길동',
    role: '직원',
    initials: 'ㅎ',
    quote: '음식은 사람을 연결하는 언어입니다.',
    story: '어릴 때부터 어머니 곁에서 된장을 담갔습니다. 손맛이란 결국 그 사람의 삶이 배어있는 것이라 믿으며, 오늘도 변하지 않는 맛을 위해 부엌에 섭니다.',
    tilt: -2,
  },
  {
    name: '김철수',
    role: '대표',
    initials: '김',
    quote: '손님으로 처음 맛본 된장전골 한 그릇이 제 인생을 바꿨습니다.',
    story: '두 번, 세 번 발걸음이 잦아지다 결국 다니던 회사에 사직서를 냈습니다. 본사 대표님은 단호했습니다. "요식업은 아무나 하는 게 아닙니다. 직접 일해 보세요." 그 말을 듣고 직영점 막내로 들어가 매일 14시간씩 칼질에 손이 베이고, 설거지에 손이 부르트며 밑바닥부터 익혔습니다. 기교 없이, 하루에 하나씩, 있는 그대로.\n\n흘린 땀을 인정받아 2024년, 21호점 옥된장 양재점을 열었습니다. 지금도 매일 아침 직접 밥을 짓고, 오신 분 한 분 한 분을 기억하며 먼저 인사드립니다. 이 공간 안에서만큼은 따뜻한 정(情)을 느끼고 가시도록, 오늘도 같은 자리에서 기다리고 있겠습니다.',
    tilt: 1.5,
  },
];

function PersonCard({ person, delay }: { person: Person; delay: number }) {
  const flippedRef = useRef(false);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay }
      );
    });
    return () => ctx.revert();
  }, [delay]);

  const handleClick = () => {
    const el = cardRef.current;
    if (!el) return;
    flippedRef.current = !flippedRef.current;
    gsap.to(el, { rotateY: flippedRef.current ? 180 : 0, duration: 0.6, ease: 'power2.inOut' });
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      style={{
        opacity: 0,
        transform: `rotate(${person.tilt}deg)`,
        cursor: NORIGAE_CURSOR,
        perspective: 1000,
        width: '100%',
        maxWidth: 320,
      }}
    >
      <div style={{
        position: 'relative',
        transformStyle: 'preserve-3d',
        width: '100%',
      }}>
        {/* 앞면 */}
        <div style={{
          background: '#f5f0e8',
          padding: '20px 20px 28px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          backfaceVisibility: 'hidden',
        }}>
          {/* 사진 플레이스홀더 */}
          <div style={{
            width: '100%', aspectRatio: '3/4',
            background: '#2a2a2a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 16,
          }}>
            <span style={{
              fontSize: 64, color: 'rgba(200,169,110,0.4)',
              fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 700,
            }}>
              {person.initials}
            </span>
          </div>
          <h3 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4,
          }}>
            {person.name}
          </h3>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 12, color: '#888', marginBottom: 12, letterSpacing: '0.1em',
          }}>
            {person.role}
          </p>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 13, color: '#444', lineHeight: 1.7,
            fontStyle: 'italic',
          }}>
            "{person.quote}"
          </p>
          <p style={{
            marginTop: 16, fontSize: 10, color: '#bbb',
            fontFamily: 'sans-serif', textAlign: 'center', letterSpacing: '0.15em',
          }}>
            TAP TO READ MORE
          </p>
        </div>

        {/* 뒷면 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#1a1a1a',
          border: '1px solid rgba(200,169,110,0.3)',
          padding: '32px 24px',
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          overflowY: 'auto',
        }}>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 2,
            whiteSpace: 'pre-line',
          }}>
            {person.story}
          </p>
          <p style={{
            marginTop: 24, fontSize: 10, color: 'rgba(200,169,110,0.5)',
            fontFamily: 'sans-serif', letterSpacing: '0.15em',
          }}>
            TAP TO GO BACK
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const missionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(missionRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.9 }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px 32px 100px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 12 }}>
          ABOUT
        </p>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: '#fff', marginBottom: 72, lineHeight: 1.3,
        }}>
          사람이 만드는 맛
        </h1>

        {/* 카드 — 직원(좌) 사장(우) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 48,
          justifyItems: 'center',
          marginBottom: 96,
        }}>
          {PEOPLE.map((p, i) => (
            <PersonCard key={p.name} person={p} delay={0.2 + i * 0.25} />
          ))}
        </div>

        {/* 가게 미션 */}
        <div ref={missionRef} style={{
          textAlign: 'center',
          padding: '56px 32px',
          border: '1px solid rgba(200,169,110,0.2)',
          opacity: 0,
        }}>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(18px, 2.5vw, 26px)',
            fontWeight: 300, color: '#fff',
            lineHeight: 1.8, letterSpacing: '0.05em',
          }}>
            좋은 재료로 정직하게,<br />
            <span style={{ color: '#c8a96e' }}>매일 같은 맛으로.</span>
          </p>
        </div>
      </div>
    </main>
  );
}
