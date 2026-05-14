'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: '메뉴', href: '/menu' },
  { label: '소개', href: '/about' },
  { label: '예약', href: '/reservation' },
  { label: '블로그', href: '/blog' },
];

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 32px',
      height: 64,
      background: scrolled ? 'rgba(10,10,10,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(200,169,110,0.15)' : 'none',
      transition: 'background 0.3s, backdrop-filter 0.3s, border-bottom 0.3s',
    }}>
      <Link href="/gallery" style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        fontSize: 18,
        fontWeight: 700,
        color: '#c8a96e',
        textDecoration: 'none',
        letterSpacing: '0.08em',
      }}>
        옥된장
      </Link>

      <div style={{ display: 'flex', gap: 32 }}>
        {NAV_LINKS.map(({ label, href }) => {
          const active = pathname === href;
          return (
            <Link key={href} href={href} style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 13,
              fontWeight: active ? 700 : 400,
              color: active ? '#c8a96e' : 'rgba(255,255,255,0.75)',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              borderBottom: active ? '1px solid #c8a96e' : '1px solid transparent',
              paddingBottom: 2,
              transition: 'color 0.2s, border-bottom 0.2s',
            }}>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
