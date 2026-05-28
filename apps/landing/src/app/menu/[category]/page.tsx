'use client';

import { useParams } from 'next/navigation';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { CATEGORIES } from '@/lib/menu-data';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const current = CATEGORIES.find(c => c.id === category);
  if (!current) notFound();

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <section style={{ position: 'relative', width: '100%', height: '62vh', overflow: 'hidden', minHeight: 360 }}>
        <img
          src={current.image}
          alt={current.label}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: current.imagePosition ?? 'center 50%',
            transform: `scale(${current.imageScale ?? 1})`,
            filter: 'brightness(0.42) saturate(0.88)',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, transparent 40%, rgba(10,10,10,0.9) 100%)',
        }} />

        <Link
          href="/menu"
          style={{
            position: 'absolute', top: 92, left: 'clamp(32px, 6vw, 80px)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.2em',
            color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#c8a96e'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)'}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path d="M14 5H2M6 1L2 5l4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          전체 메뉴
        </Link>

        <div style={{
          position: 'absolute', bottom: 52, left: 0, right: 0,
          padding: '0 clamp(32px, 6vw, 80px)',
        }}>
          <p style={{
            fontFamily: 'sans-serif', fontSize: 10,
            letterSpacing: '0.32em', color: '#c8a96e', marginBottom: 14,
          }}>
            {current.en}
          </p>
          <h1 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(38px, 5.5vw, 68px)',
            fontWeight: 300, color: '#fff',
            letterSpacing: '0.05em', margin: '0 0 12px', lineHeight: 1.15,
          }}>
            {current.label}
          </h1>
          <p style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 14, color: 'rgba(255,255,255,0.45)',
            margin: 0, letterSpacing: '0.02em',
          }}>
            {current.tagline}
          </p>
        </div>
      </section>

      <nav style={{
        display: 'flex',
        borderBottom: '1px solid rgba(200,169,110,0.45)',
        padding: '0 clamp(32px, 6vw, 80px)',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {CATEGORIES.map(cat => {
          const isActive = cat.id === category;
          return (
            <Link
              key={cat.id}
              href={`/menu/${cat.id}`}
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '24px 44px 22px',
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 25,
                fontWeight: isActive ? 600 : 300,
                color: isActive ? '#fff' : 'rgba(255,255,255,0.38)',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #c8a96e' : '2px solid transparent',
                marginBottom: -1,
                whiteSpace: 'nowrap',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)';
              }}
            >
              {cat.label}
            </Link>
          );
        })}
      </nav>

      <section style={{ padding: '60px clamp(32px, 6vw, 80px) 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
          border: '1px solid rgba(200,169,110,0.1)',
        }}>
          {current.items.map((item, i) => (
            <div
              key={item.name}
              style={{
                padding: '44px 40px',
                background: '#0a0a0a',
                borderRight: '1px solid rgba(200,169,110,0.1)',
                borderBottom: '1px solid rgba(200,169,110,0.1)',
                transition: 'background 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(200,169,110,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.background = '#0a0a0a';
              }}
            >
              <span style={{
                fontFamily: 'sans-serif', fontSize: 10,
                letterSpacing: '0.22em', color: 'rgba(200,169,110,0.4)',
                display: 'block', marginBottom: 18,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 'clamp(17px, 1.8vw, 22px)',
                fontWeight: 500, color: '#fff',
                letterSpacing: '0.03em', margin: '0 0 14px',
              }}>
                {item.name}
              </h3>
              <div style={{ width: 28, height: 1, background: 'rgba(200,169,110,0.3)', marginBottom: 18 }} />
              <p style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 13, color: 'rgba(255,255,255,0.38)',
                lineHeight: 1.85, margin: '0 0 22px',
              }}>
                {item.desc}
              </p>
              {item.price && (
                <span style={{
                  fontFamily: 'sans-serif', fontSize: 13,
                  letterSpacing: '0.06em', color: '#c8a96e',
                }}>
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.18)',
          lineHeight: 1.9, marginTop: 44,
        }}>
          * 점심엔 2,000 할인 혜택을 드립니다.
        </p>
      </section>

    </main>
  );
}
