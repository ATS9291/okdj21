'use client';

import { useState } from 'react';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

type MenuItem = { name: string; desc: string; price?: string };
type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: 'doenjang-jeongol',
    label: '된장전골',
    items: [
      { name: '된장 버섯전골', desc: '국내산 버섯과 항아리 된장으로 끓인 깊고 구수한 전골', price: '22,000원 (2인)' },
      { name: '된장 두부전골', desc: '국산 두부를 넉넉히 넣어 담백하게 끓인 된장 전골', price: '20,000원 (2인)' },
      { name: '된장 해물전골', desc: '싱싱한 해물과 된장이 어우러지는 시원하고 깊은 전골', price: '26,000원 (2인)' },
      { name: '된장 쇠고기전골', desc: '국내산 쇠고기와 묵은 된장의 진한 풍미가 가득한 전골', price: '28,000원 (2인)' },
    ],
  },
  {
    id: 'soondubu-jeongol',
    label: '순두부전골',
    items: [
      { name: '해물 순두부전골', desc: '싱싱한 해물과 부드러운 순두부가 어우러진 얼큰한 전골', price: '24,000원 (2인)' },
      { name: '버섯 순두부전골', desc: '다양한 버섯과 순두부를 넣어 끓인 담백하고 깊은 전골', price: '22,000원 (2인)' },
      { name: '김치 순두부전골', desc: '잘 익은 김치와 부드러운 순두부가 어우러진 얼큰한 전골', price: '22,000원 (2인)' },
      { name: '낙지 순두부전골', desc: '통통한 낙지와 순두부를 넣어 끓인 해물 순두부 전골', price: '26,000원 (2인)' },
    ],
  },
  {
    id: 'sukyuk-jeongol',
    label: '수육전골',
    items: [
      { name: '차돌박이 된장전골', desc: '차돌박이와 묵은 된장으로 끓인 풍부하고 진한 전골', price: '30,000원 (2인)' },
      { name: '삼겹 수육전골', desc: '부드럽게 삶은 삼겹수육과 된장 육수의 조화로운 전골', price: '26,000원 (2인)' },
      { name: '돼지 수육전골', desc: '담백하게 삶은 돼지수육과 구수한 된장 육수의 전골', price: '24,000원 (2인)' },
      { name: '수육 모둠전골', desc: '다양한 수육을 한 자리에서 즐기는 푸짐한 모둠 전골', price: '32,000원 (2인)' },
    ],
  },
  {
    id: 'byeolmi-charim',
    label: '별미차림',
    items: [
      { name: '옥된장 정식', desc: '된장찌개, 순두부, 구이, 밑반찬이 함께하는 푸짐한 정식', price: '15,000원' },
      { name: '쌈밥 정식', desc: '직접 담근 된장과 쌈채소, 6가지 밑반찬이 함께하는 정식', price: '13,000원' },
      { name: '미나리전 상차림', desc: '향긋한 미나리전과 된장찌개, 밥, 밑반찬 한 상차림', price: '14,000원' },
      { name: '청국장 정식', desc: '직접 띄운 청국장찌개와 구이, 밑반찬이 함께하는 정식', price: '11,000원' },
    ],
  },
];

export default function MenuPage() {
  const [active, setActive] = useState(0);
  const cat = CATEGORIES[active];

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px 32px 100px' }}>
        {/* 헤더 */}
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 12 }}>
          MENU
        </p>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: '#fff', marginBottom: 56, lineHeight: 1.3,
        }}>
          대표 메뉴
        </h1>

        {/* 카테고리 탭 */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              style={{
                padding: '14px 28px',
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 15, fontWeight: i === active ? 600 : 400,
                color: i === active ? '#c8a96e' : 'rgba(255,255,255,0.45)',
                background: 'transparent', border: 'none',
                borderBottom: i === active ? '2px solid #c8a96e' : '2px solid transparent',
                marginBottom: -1,
                cursor: NORIGAE_CURSOR,
                transition: 'color 0.2s',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* 메뉴 카드 그리드 2×2 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 20,
        }}>
          {cat.items.map((item) => (
            <div
              key={item.name}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(200,169,110,0.15)',
                borderRadius: 8,
                padding: '28px 26px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.4)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(200,169,110,0.04)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(200,169,110,0.15)';
                (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <h3 style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 18, fontWeight: 600, color: '#fff', margin: 0,
              }}>
                {item.name}
              </h3>
              <p style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
                flex: 1, margin: 0,
              }}>
                {item.desc}
              </p>
              {item.price && (
                <span style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 15, fontWeight: 600, color: '#c8a96e',
                }}>
                  {item.price}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 안내 */}
        <p style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.25)',
          marginTop: 48, lineHeight: 1.8,
        }}>
          * 모든 메뉴는 국내산 재료를 사용합니다.<br />
          * 가격 및 메뉴는 시즌에 따라 변경될 수 있습니다.
        </p>
      </div>
    </main>
  );
}
