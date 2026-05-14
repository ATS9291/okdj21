'use client';

import HoverColorReveal, { ClickZone } from '@/components/HoverColorReveal';

// ── 클릭 존 설정 ────────────────────────────────────────────────────────────
// x, y, w, h 모두 화면 기준 % 값
// 이미지 레이아웃에 맞게 숫자를 조정하세요
// 옥된장 파사드 영역에 맞게 x, y, w, h (화면 % 기준) 조정
const ZONES: ClickZone[] = [
  { id: 'gallery', label: '', href: '/gallery', x: 20, y: 35, w: 36, h: 47 },
];

const SOCIAL_LINKS = [
  { label: '인스타그램', href: 'https://www.instagram.com/' },
  { label: '유튜브',    href: 'https://www.youtube.com/' },
  { label: '스레드',   href: 'https://www.threads.net/' },
];

export default function Home() {
  return (
    <main className="w-screen h-screen overflow-hidden bg-black" style={{ position: 'relative' }}>
      <HoverColorReveal
        src="/옥된장메인.svg"
        radius={200}
        softness={0.5}
        zones={ZONES}
      />

      {/* 소셜 미디어 링크 */}
      <div style={{
        position: 'fixed',
        bottom: 24,
        right: 28,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        zIndex: 200,
        pointerEvents: 'auto',
      }}>
        {SOCIAL_LINKS.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(0,0,0,0.82)',
              textDecoration: 'none',
              fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textShadow: '0 0 8px rgba(255,255,255,0.7)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,0,0,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.82)')}
          >
            {label}
          </a>
        ))}
      </div>
    </main>
  );
}
