'use client';

import { useEffect, useState } from 'react';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

type MenuItem = { name: string; desc: string; price?: string };
type Category = { id: string; label: string; en: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: 'doenjang',
    label: '된장전골',
    en: 'DOENJANG JJEONGOL',
    items: [
      { name: '된장 버섯전골', desc: '국내산 버섯과 항아리 된장으로 끓인 깊고 구수한 전골', price: '22,000원 (2인)' },
      { name: '된장 두부전골', desc: '국산 두부를 넉넉히 넣어 담백하게 끓인 된장 전골', price: '20,000원 (2인)' },
      { name: '된장 해물전골', desc: '싱싱한 해물과 된장이 어우러지는 시원하고 깊은 전골', price: '26,000원 (2인)' },
      { name: '된장 쇠고기전골', desc: '국내산 쇠고기와 묵은 된장의 진한 풍미가 가득한 전골', price: '28,000원 (2인)' },
    ],
  },
  {
    id: 'sundubu',
    label: '순두부전골',
    en: 'SUNDUBU JJEONGOL',
    items: [
      { name: '해물 순두부전골', desc: '싱싱한 해물과 부드러운 순두부가 어우러진 얼큰한 전골', price: '24,000원 (2인)' },
      { name: '버섯 순두부전골', desc: '다양한 버섯과 순두부를 넣어 끓인 담백하고 깊은 전골', price: '22,000원 (2인)' },
      { name: '김치 순두부전골', desc: '잘 익은 김치와 부드러운 순두부가 어우러진 얼큰한 전골', price: '22,000원 (2인)' },
      { name: '낙지 순두부전골', desc: '통통한 낙지와 순두부를 넣어 끓인 해물 순두부 전골', price: '26,000원 (2인)' },
    ],
  },
  {
    id: 'sukyuk',
    label: '수육전골',
    en: 'SUYUK JJEONGOL',
    items: [
      { name: '차돌박이 된장전골', desc: '차돌박이와 묵은 된장으로 끓인 풍부하고 진한 전골', price: '30,000원 (2인)' },
      { name: '삼겹 수육전골', desc: '부드럽게 삶은 삼겹수육과 된장 육수의 조화로운 전골', price: '26,000원 (2인)' },
      { name: '돼지 수육전골', desc: '담백하게 삶은 돼지수육과 구수한 된장 육수의 전골', price: '24,000원 (2인)' },
      { name: '수육 모둠전골', desc: '다양한 수육을 한 자리에서 즐기는 푸짐한 모둠 전골', price: '32,000원 (2인)' },
    ],
  },
  {
    id: 'byeolmi',
    label: '별미차림',
    en: 'BYEOLMI CHARIM',
    items: [
      { name: '옥된장 정식', desc: '된장찌개, 순두부, 구이, 밑반찬이 함께하는 푸짐한 정식', price: '15,000원' },
      { name: '쌈밥 정식', desc: '직접 담근 된장과 쌈채소, 6가지 밑반찬이 함께하는 정식', price: '13,000원' },
      { name: '미나리전 상차림', desc: '향긋한 미나리전과 된장찌개, 밥, 밑반찬 한 상차림', price: '14,000원' },
      { name: '청국장 정식', desc: '직접 띄운 청국장찌개와 구이, 밑반찬이 함께하는 정식', price: '11,000원' },
    ],
  },
];

export default function MenuPage() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) setActiveId(hash);
  }, []);

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
        {CATEGORIES.map((cat, ci) => {
          const isActive = activeId === cat.id;
          return (
            <div
              key={cat.id}
              id={cat.id}
              style={{
                padding: '36px 28px',
                borderRight: ci < 3 ? '1px solid rgba(200,169,110,0.1)' : 'none',
                borderTop: isActive ? '2px solid #c8a96e' : '2px solid transparent',
                background: isActive ? 'rgba(200,169,110,0.04)' : 'transparent',
                transition: 'background 0.3s, border-top-color 0.3s',
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
                  fontWeight: isActive ? 500 : 300,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.72)',
                  margin: '0 0 18px',
                  letterSpacing: '0.04em',
                }}>{cat.label}</h2>
                <div style={{
                  height: 1,
                  background: isActive ? '#c8a96e' : 'rgba(200,169,110,0.2)',
                  transition: 'background 0.3s',
                }} />
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
          );
        })}
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
