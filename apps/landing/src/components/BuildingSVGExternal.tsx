'use client';

/**
 * 외부 SVG 파일(public/building.svg)을 불러와
 * 색칠 + 네비게이션 기능을 자동으로 연결하는 컴포넌트
 *
 * 사용법:
 *   1. public/building.svg 저장
 *   2. page.tsx에서 BuildingSVG → BuildingSVGExternal 로 교체
 */

import { useRef, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ColorMap } from '@/hooks/useColorStore';

// ─────────────────────────────────────────────
// 여기만 수정하면 됩니다
// id → 이동할 경로 & 툴팁 레이블 매핑
// Figma 레이어 이름과 동일하게 맞추세요
// ─────────────────────────────────────────────
const NAVIGATION_MAP: Record<string, { href: string; label: string }> = {
  'door-frame':  { href: '/shop',     label: '🛍 SHOP' },
  'door-panel':  { href: '/shop',     label: '🛍 SHOP' },
  'door-glass':  { href: '/shop',     label: '🛍 SHOP' },
  'sign-board':  { href: '/shop',     label: '🛍 SHOP' },
  'window-1':    { href: '/start',  label: '🖼 GALLERY' },
  'window-2':    { href: '/start',  label: '🖼 GALLERY' },
  'window-3':    { href: '/lookbook', label: '📖 LOOKBOOK' },
  'window-4':    { href: '/lookbook', label: '📖 LOOKBOOK' },
  'window-5':    { href: '/about',    label: '✨ ABOUT' },
  'window-6':    { href: '/about',    label: '✨ ABOUT' },
  'roof-main':   { href: '/about',    label: '✨ ABOUT' },
  'water-tower': { href: '/about',    label: '✨ ABOUT' },
};
// ─────────────────────────────────────────────

interface Props {
  colors: ColorMap;
  onZoneClick: (zoneId: string) => void;
  selectedColor: string;
}

export default function BuildingSVGExternal({ colors, onZoneClick, selectedColor }: Props) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [svgLoaded, setSvgLoaded] = useState(false);

  // ── SVG를 fetch해서 DOM에 직접 삽입 ──────────────────────────────
  // <img src> 방식은 내부 DOM 접근이 불가능하므로 inline inject 방식 사용
  useEffect(() => {
    fetch('/building.svg')
      .then(res => res.text())
      .then(svgText => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = svgText;

        const svg = containerRef.current.querySelector('svg');
        if (!svg) return;

        // 전체화면 맞춤
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.display = 'block';

        setSvgLoaded(true);
      })
      .catch(() => {
        console.error('building.svg를 찾을 수 없습니다. public/building.svg 경로를 확인하세요.');
      });
  }, []);

  // ── 색상 동기화 ───────────────────────────────────────────────────
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;

    Object.entries(colors).forEach(([id, color]) => {
      const el = containerRef.current!.querySelector(`#${id}`) as SVGElement | null;
      if (el) {
        el.setAttribute('fill', color);
      }
    });
  }, [colors, svgLoaded]);

  // ── 이벤트 연결 ──────────────────────────────────────────────────
  useEffect(() => {
    if (!svgLoaded || !containerRef.current) return;

    const svg = containerRef.current.querySelector('svg');
    if (!svg) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as SVGElement;
      const id = target.id || target.closest('[id]')?.id;
      if (!id) return;

      // 색칠
      onZoneClick(id);

      // 네비게이션
      const nav = NAVIGATION_MAP[id];
      if (nav) {
        gsap.timeline()
          .to(target, { scale: 1.08, duration: 0.12, transformOrigin: 'center', ease: 'power2.out' })
          .to(target, { scale: 1, duration: 0.1 })
          .to(svg, {
            scale: 1.5,
            opacity: 0,
            duration: 0.55,
            ease: 'power3.in',
            transformOrigin: `${e.clientX}px ${e.clientY}px`,
            onComplete: () => router.push(nav.href),
          });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as SVGElement;
      const id = target.id || target.closest('[id]')?.id;
      const nav = id ? NAVIGATION_MAP[id] : null;

      if (!tooltipRef.current) return;

      if (nav) {
        tooltipRef.current.textContent = nav.label;
        tooltipRef.current.style.opacity = '1';
        tooltipRef.current.style.left = `${e.clientX + 12}px`;
        tooltipRef.current.style.top = `${e.clientY - 10}px`;
        (e.target as SVGElement).style.cursor = 'pointer';
      } else {
        tooltipRef.current.style.opacity = '0';
        (e.target as SVGElement).style.cursor = 'crosshair';
      }
    };

    const handleMouseLeave = () => {
      if (tooltipRef.current) tooltipRef.current.style.opacity = '0';
    };

    svg.addEventListener('click', handleClick);
    svg.addEventListener('mousemove', handleMouseMove);
    svg.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      svg.removeEventListener('click', handleClick);
      svg.removeEventListener('mousemove', handleMouseMove);
      svg.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [svgLoaded, onZoneClick, router]);

  return (
    <>
      {/* 툴팁 */}
      <div
        ref={tooltipRef}
        className="fixed z-[100] pointer-events-none opacity-0 transition-opacity bg-black text-white text-xs font-black px-2 py-1 rounded-lg border-2 border-white"
        style={{ fontFamily: "'Comic Sans MS', cursive" }}
      />

      {/* SVG가 없을 때 안내 메시지 */}
      {!svgLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-100 border-4 border-dashed border-yellow-400 rounded-xl">
          <div className="text-center p-6" style={{ fontFamily: "'Comic Sans MS', cursive" }}>
            <p className="text-4xl mb-3">🏗️</p>
            <p className="text-xl font-black text-yellow-700">building.svg 없음</p>
            <p className="text-sm font-bold text-yellow-600 mt-1">
              public/building.svg 파일을 추가하세요
            </p>
          </div>
        </div>
      )}

      {/* SVG 컨테이너 */}
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ cursor: 'crosshair' }}
      />
    </>
  );
}
