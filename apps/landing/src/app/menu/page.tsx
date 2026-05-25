import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { CATEGORIES } from '@/lib/menu-data';

export default function MenuPage() {
  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <div style={{ padding: '100px clamp(32px, 6vw, 80px) 44px' }}>
        <p style={{
          fontFamily: 'sans-serif', fontSize: 11,
          letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 12,
        }}>MENU</p>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: '#fff', lineHeight: 1.3, margin: 0,
        }}>대표 메뉴</h1>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '0 clamp(32px, 6vw, 80px) 80px',
        borderTop: '1px solid rgba(200,169,110,0.1)',
      }}>
        {CATEGORIES.map((cat, ci) => (
          <div
            key={cat.id}
            id={cat.id}
            style={{
              padding: '36px 28px',
              borderRight: ci < 3 ? '1px solid rgba(200,169,110,0.1)' : 'none',
              borderTop: '2px solid transparent',
            }}
          >
            <div style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: 'sans-serif', fontSize: 9,
                letterSpacing: '0.28em', color: '#c8a96e',
                margin: '0 0 10px',
              }}>{cat.en}</p>
              <h2 style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.72)',
                margin: '0 0 18px',
                letterSpacing: '0.04em',
              }}>{cat.label}</h2>
              <div style={{ height: 1, background: 'rgba(200,169,110,0.2)' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {cat.items.map((item, ii) => (
                <div
                  key={item.name}
                  style={{
                    padding: '18px 0',
                    borderBottom: ii < cat.items.length - 1
                      ? '1px solid rgba(255,255,255,0.05)'
                      : 'none',
                  }}
                >
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 14, fontWeight: 600, color: '#fff',
                    margin: '0 0 6px',
                  }}>{item.name}</p>
                  <p style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 12, color: 'rgba(255,255,255,0.38)',
                    lineHeight: 1.75, margin: '0 0 10px',
                  }}>{item.desc}</p>
                  {item.price && (
                    <span style={{
                      fontFamily: 'sans-serif',
                      fontSize: 12, letterSpacing: '0.05em', color: '#c8a96e',
                    }}>{item.price}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontFamily: "'Noto Sans KR', sans-serif",
        fontSize: 12, color: 'rgba(255,255,255,0.2)',
        padding: '0 clamp(32px, 6vw, 80px) 60px',
        lineHeight: 1.8,
      }}>
        * 모든 메뉴는 국내산 재료를 사용합니다.<br />
        * 가격 및 메뉴는 시즌에 따라 변경될 수 있습니다.
      </p>
    </main>
  );
}
