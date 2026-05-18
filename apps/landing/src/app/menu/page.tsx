'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';

type MenuItem = { name: string; desc: string; price?: string };
type Category = { id: string; label: string; items: MenuItem[] };

const CATEGORIES: Category[] = [
  {
    id: 'doenjang',
    label: '된장',
    items: [
      { name: '옥된장찌개', desc: '10년 묵은 항아리 된장으로 끓인 깊은 맛의 찌개. 두부와 호박이 어우러집니다.', price: '9,000원' },
      { name: '청국장찌개', desc: '직접 띄운 청국장으로 끓인 구수하고 진한 찌개입니다.', price: '9,000원' },
      { name: '된장 비빔밥', desc: '제철 나물과 묵은 된장 소스를 곁들인 정갈한 비빔밥.', price: '10,000원' },
      { name: '된장 쌈밥 정식', desc: '직접 담근 된장과 쌈채소, 밑반찬이 함께 나오는 정식.', price: '13,000원' },
    ],
  },
  {
    id: 'soondubu',
    label: '순두부',
    items: [
      { name: '해물 순두부찌개', desc: '싱싱한 해물과 부드러운 순두부가 만나는 얼큰하고 시원한 찌개.', price: '10,000원' },
      { name: '버섯 순두부찌개', desc: '다양한 버섯을 넣어 깊은 풍미를 낸 순두부찌개.', price: '9,500원' },
      { name: '순두부 덮밥', desc: '부드러운 순두부와 양념장을 밥 위에 올린 간편한 한 그릇 요리.', price: '9,000원' },
    ],
  },
  {
    id: 'jeongol',
    label: '전골',
    items: [
      { name: '버섯 전골', desc: '표고·느타리·팽이버섯을 가득 넣어 끓인 깔끔한 전골.', price: '16,000원 (2인)' },
      { name: '두부 전골', desc: '국내산 두부와 각종 채소를 넣어 끓이는 담백한 전골.', price: '15,000원 (2인)' },
      { name: '된장 해물 전골', desc: '묵은 된장 육수에 해물과 두부를 풍성하게 담은 전골.', price: '20,000원 (2인)' },
    ],
  },
  {
    id: 'minarijeon',
    label: '미나리전',
    items: [
      { name: '미나리전', desc: '향긋한 미나리를 듬뿍 넣어 노릇하게 구운 계절 전. 막걸리와 찰떡 궁합.', price: '11,000원' },
      { name: '미나리 해물파전', desc: '미나리와 신선한 해물이 어우러진 바삭한 파전.', price: '13,000원' },
      { name: '미나리 도토리묵무침', desc: '탱글한 도토리묵과 미나리를 새콤달콤하게 무친 반찬.', price: '8,000원' },
      { name: '미나리 나물', desc: '데친 미나리를 들기름에 무친 담백하고 향긋한 나물.', price: '5,000원' },
    ],
  },
];

export default function MenuPage() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const switchTab = (idx: number) => {
    if (idx === active) return;
    const el = listRef.current;
    if (!el) { setActive(idx); return; }
    gsap.to(el, {
      opacity: 0, y: 16, duration: 0.18, ease: 'power2.in',
      onComplete: () => {
        setActive(idx);
        gsap.fromTo(el, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' });
      },
    });
  };

  useEffect(() => {
    if (listRef.current) {
      gsap.fromTo(listRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' });
    }
  }, []);

  const cat = CATEGORIES[active];

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '120px 32px 100px' }}>
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

        {/* 탭 */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 56, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {CATEGORIES.map((c, i) => (
            <button
              key={c.id}
              onClick={() => switchTab(i)}
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

        {/* 메뉴 목록 */}
        <div ref={listRef} style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {cat.items.map((item) => (
            <div key={item.name} style={{
              display: 'grid', gridTemplateColumns: '1fr auto',
              alignItems: 'start', gap: 24,
              padding: '28px 0',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}>
              <div>
                <h3 style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 8,
                }}>
                  {item.name}
                </h3>
                <p style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
                }}>
                  {item.desc}
                </p>
              </div>
              {item.price && (
                <span style={{
                  fontFamily: "'Noto Sans KR', sans-serif",
                  fontSize: 14, color: '#c8a96e', whiteSpace: 'nowrap',
                  paddingTop: 4,
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
