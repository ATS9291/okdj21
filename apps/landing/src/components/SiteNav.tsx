'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SOCIAL_LINKS } from '@/lib/constants';

const NAV_LINKS = [
  { label: '메뉴', href: '/menu' },
  { label: '소개', href: '/about' },
  { label: '예약', href: '/reservation' },
  { label: '블로그', href: '/blog' },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
        height: 64,
        background: scrolled || menuOpen ? 'rgba(10,10,10,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(200,169,110,0.15)' : 'none',
        transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
      }}>
        <Link href="/start" style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 20,
          fontWeight: 700,
          color: '#1a5c2a',
          textDecoration: 'none',
          letterSpacing: '0.08em',
          flexShrink: 0,
        }}>
          옥된장양재점
        </Link>

        {/* 데스크톱 소셜 링크 */}
        <div className="sitenav-links" style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {SOCIAL_LINKS.map(({ ko, en, href }) => (
            <a
              key={en}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="sitenav-link"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                textDecoration: 'none',
              }}
            >
              <span style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 13, fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1,
              }}>{ko}</span>
              <span style={{
                fontFamily: 'sans-serif',
                fontSize: 9, letterSpacing: '0.2em', lineHeight: 1,
                opacity: 0.6,
              }}>{en}</span>
            </a>
          ))}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          className="sitenav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          style={{
            display: 'none',
            background: 'none', border: 'none',
            cursor: 'pointer', padding: '8px 4px',
            flexDirection: 'column', gap: 5,
            alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'rgba(255,255,255,0.85)',
            transition: 'transform 0.3s, opacity 0.3s',
            transform: menuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'rgba(255,255,255,0.85)',
            transition: 'opacity 0.3s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 22, height: 1.5,
            background: 'rgba(255,255,255,0.85)',
            transition: 'transform 0.3s',
            transform: menuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
          }} />
        </button>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      <div
        ref={menuRef}
        className="sitenav-mobile-menu"
        aria-hidden={!menuOpen}
        style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 499,
          background: 'rgba(10,10,10,0.97)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(200,169,110,0.15)',
          display: 'none',
          flexDirection: 'column',
          padding: menuOpen ? '16px 24px 24px' : '0 24px',
          maxHeight: menuOpen ? '360px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1), padding 0.35s',
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            tabIndex={menuOpen ? undefined : -1}
            style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 18,
              fontWeight: pathname === href ? 600 : 400,
              color: pathname === href ? '#c8a96e' : 'rgba(255,255,255,0.85)',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              padding: '13px 0',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'block',
            }}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/reservation"
          onClick={() => setMenuOpen(false)}
          tabIndex={menuOpen ? undefined : -1}
          style={{
            display: 'block', marginTop: 18,
            padding: '13px 0', textAlign: 'center',
            background: '#c8a96e', borderRadius: 4,
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 14, fontWeight: 700,
            color: '#0a0a0a', textDecoration: 'none',
            letterSpacing: '0.1em',
          }}
        >
          바로 예약하기
        </Link>
      </div>

      <style>{`
        .sitenav-link { color: rgba(255,255,255,0.55); transition: color 0.2s; }
        .sitenav-link:hover { color: #c8a96e; }
        .sitenav-hamburger:focus-visible { outline: 2px solid #c8a96e; outline-offset: 4px; }
        @media (max-width: 768px) {
          .sitenav-links { display: none !important; }
          .sitenav-hamburger { display: flex !important; }
          .sitenav-mobile-menu { display: flex !important; }
        }
      `}</style>
    </>
  );
}
