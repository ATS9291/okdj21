'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { DanChungMedallion } from '@/components/DanChungMedallion';

const WOOD = (dir: 'right' | 'left') => [
  'repeating-linear-gradient(90deg, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 54px, rgba(0,0,0,0.45) 54px, rgba(0,0,0,0.45) 57px)',
  `linear-gradient(to ${dir}, #2E1408 0%, #4E2610 18%, #6B3818 40%, #7A4520 55%, #6B3818 72%, #4E2610 88%, #2E1408 100%)`,
].join(', ');

const CROSSBAR: React.CSSProperties = {
  position: 'absolute', left: 0, right: 0, height: 22,
  background: 'linear-gradient(180deg, #2A1208 0%, #472010 50%, #2A1208 100%)',
  borderTop: '1.5px solid rgba(200,160,64,0.4)',
  borderBottom: '1.5px solid rgba(200,160,64,0.4)',
};

export function DoorOverlay() {
  const router      = useRouter();
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const bgRef       = useRef<HTMLDivElement>(null);
  const busyRef     = useRef(false);

  useEffect(() => {
    // 초기 상태: 완전히 숨김
    gsap.set([leftRef.current, rightRef.current, bgRef.current], { opacity: 0 });

    // ── 문 닫힘 (메인 → /start) ───────────────────────────
    const onClose = (e: Event) => {
      if (busyRef.current) return;
      busyRef.current = true;
      const href = (e as CustomEvent<{ href: string }>).detail.href;

      const tl = gsap.timeline();
      // 줌인 진행 중 (1.5s 대기) → 패널 페이드인 0.8s
      tl.to([leftRef.current, rightRef.current],
        { opacity: 1, duration: 0.8, ease: 'power3.in' }, 1.5)
      // 배경 블랙 (패널 뒤 안전망)
      tl.to(bgRef.current,
        { opacity: 1, duration: 0.4, ease: 'power1.in' }, 2.0)
      // 닫힌 채 1.9s 긴장감 정지 → 이동
      tl.call(() => {
        sessionStorage.setItem('doorEntry', '1');
        router.push(href);
      }, [], 4.1);
    };

    // ── 문 열림 (/start 진입 시) ──────────────────────────
    const onOpen = () => {
      const tl = gsap.timeline();
      // 0.5s 대기 (긴장감) → 2s 열림
      tl.to(bgRef.current,
        { opacity: 0, duration: 0.6, ease: 'power2.out' }, 0.5)
      tl.to(leftRef.current,
        { x: '-100%', duration: 2.0, ease: 'power2.inOut' }, 0.5)
      tl.to(rightRef.current,
        { x: '100%', duration: 2.0, ease: 'power2.inOut' }, 0.5)
      // 열린 후 초기화 (다음번 사용을 위해)
      tl.set([leftRef.current, rightRef.current],
        { opacity: 0, x: 0 });
      tl.call(() => { busyRef.current = false; });
    };

    window.addEventListener('doorClose', onClose);
    window.addEventListener('doorOpen',  onOpen);
    return () => {
      window.removeEventListener('doorClose', onClose);
      window.removeEventListener('doorOpen',  onOpen);
    };
  }, [router]);

  const panelStyle = (side: 'left' | 'right'): React.CSSProperties => ({
    position: 'fixed', top: 0,
    [side]: 0,
    width: '50vw', height: '100vh',
    background: WOOD(side === 'left' ? 'right' : 'left'),
    [side === 'left' ? 'borderRight' : 'borderLeft']: '3px solid #C8A040',
    boxShadow: side === 'left'
      ? 'inset -40px 0 80px rgba(0,0,0,0.6), 4px 0 16px rgba(0,0,0,0.9)'
      : 'inset 40px 0 80px rgba(0,0,0,0.6), -4px 0 16px rgba(0,0,0,0.9)',
    opacity: 0,
    zIndex: 9997,
    pointerEvents: 'none',
  });

  return (
    <>
      {/* 블랙 배경 (패널 뒤) */}
      <div ref={bgRef} style={{
        position: 'fixed', inset: 0,
        background: '#000',
        opacity: 0, zIndex: 9996, pointerEvents: 'none',
      }} />

      {/* 좌 패널 */}
      <div ref={leftRef} style={panelStyle('left')}>
        <div style={{ ...CROSSBAR, top: '18%' }} />
        <div style={{ ...CROSSBAR, top: '80%' }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(38vw, 64vh)', height: 'min(38vw, 64vh)',
          filter: 'drop-shadow(0 0 40px rgba(200,160,64,0.4)) drop-shadow(0 0 100px rgba(200,160,64,0.15))',
        }}>
          <DanChungMedallion />
        </div>
      </div>

      {/* 우 패널 */}
      <div ref={rightRef} style={panelStyle('right')}>
        <div style={{ ...CROSSBAR, top: '18%' }} />
        <div style={{ ...CROSSBAR, top: '80%' }} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(38vw, 64vh)', height: 'min(38vw, 64vh)',
          filter: 'drop-shadow(0 0 40px rgba(200,160,64,0.4)) drop-shadow(0 0 100px rgba(200,160,64,0.15))',
        }}>
          <DanChungMedallion />
        </div>
      </div>
    </>
  );
}
