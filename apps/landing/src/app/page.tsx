'use client';

import HoverColorReveal, { ClickZone } from '@/components/HoverColorReveal';
import { SOCIAL_LINKS } from '@/lib/constants';

const ZONES: ClickZone[] = [
  { id: 'start', label: '', href: '/start', x: 20, y: 35, w: 36, h: 47 },
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
        top: 20,
        right: 28,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
        zIndex: 200,
        pointerEvents: 'auto',
      }}>
        {SOCIAL_LINKS.map(({ ko, en, href }) => (
          <a
            key={en}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              color: 'rgba(0,0,0,0.82)',
              textDecoration: 'none',
              textShadow: '0 0 8px rgba(255,255,255,0.7)',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(0,0,0,1)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.82)')}
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
    </main>
  );
}
