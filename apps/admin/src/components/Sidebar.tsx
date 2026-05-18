'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { adminLogout } from '@/app/actions';

const NAV = [
  { href: '/reservations', label: '예약 관리' },
  { href: '/blog', label: '블로그 관리' },
];

const S = {
  sidebar: {
    width: 220, minHeight: '100vh', background: '#111',
    borderRight: '1px solid rgba(200,169,110,0.1)',
    display: 'flex', flexDirection: 'column' as const,
    position: 'sticky' as const, top: 0, flexShrink: 0,
  },
  logo: {
    padding: '24px 24px 20px',
    borderBottom: '1px solid rgba(200,169,110,0.1)',
  },
  logoText: {
    fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 15, fontWeight: 700, color: '#c8a96e',
    display: 'block',
  },
  logoSub: {
    fontFamily: 'sans-serif', fontSize: 10,
    color: 'rgba(255,255,255,0.25)', letterSpacing: '0.15em',
    marginTop: 4, display: 'block',
  },
  nav: { padding: '16px 0', flex: 1 },
  logoutArea: { padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' },
  logoutBtn: {
    width: '100%', padding: '9px 16px',
    background: 'transparent', border: '1px solid rgba(255,255,255,0.12)',
    color: 'rgba(255,255,255,0.35)', fontFamily: "'Noto Sans KR', sans-serif",
    fontSize: 12, cursor: 'pointer', borderRadius: 3, textAlign: 'left' as const,
  },
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside style={S.sidebar}>
      <div style={S.logo}>
        <span style={S.logoText}>옥된장 어드민</span>
        <span style={S.logoSub}>ADMIN PANEL</span>
      </div>

      <nav style={S.nav}>
        {NAV.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              display: 'block', padding: '11px 24px',
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 13, fontWeight: active ? 600 : 400,
              color: active ? '#c8a96e' : 'rgba(255,255,255,0.45)',
              textDecoration: 'none',
              borderLeft: active ? '2px solid #c8a96e' : '2px solid transparent',
              background: active ? 'rgba(200,169,110,0.06)' : 'transparent',
              transition: 'all 0.15s',
            }}>
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={S.logoutArea}>
        <button onClick={() => adminLogout()} style={S.logoutBtn}>
          로그아웃
        </button>
      </div>
    </aside>
  );
}
