'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';

// ── 노리개 커서 ──────────────────────────────────────────────────────────────
const NORIGAE_SVG = `<svg width="44" height="77" viewBox="0 0 36 64" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ng" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#7A8C2E"/>
      <stop offset="100%" stop-color="#242D0C"/>
    </radialGradient>
  </defs>
  <ellipse cx="18" cy="8" rx="9" ry="7" fill="#4B5520" stroke="#242D0C" stroke-width="1.5"/>
  <path d="M9,8 Q18,1 27,8 Q18,15 9,8Z" fill="#6B7A28" opacity="0.7"/>
  <path d="M18,1 Q25,8 18,15 Q11,8 18,1Z" fill="#6B7A28" opacity="0.7"/>
  <circle cx="18" cy="8" r="3" fill="#242D0C"/>
  <rect x="17" y="15" width="2" height="7" rx="1" fill="#3A4518"/>
  <path d="M18,22 L33,31 L18,40 L3,31 Z" fill="#6B7A28" stroke="#242D0C" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M18,22 L33,31 L18,40 L3,31 Z" fill="url(#ng)" opacity="0.5"/>
  <ellipse cx="18" cy="31" rx="4" ry="9" fill="#4B5520"/>
  <circle cx="18" cy="31" r="3" fill="#242D0C"/>
  <circle cx="18" cy="31" r="1.5" fill="#7A8C2E"/>
  <line x1="12" y1="40" x2="9"  y2="61" stroke="#3A4518" stroke-width="2"   stroke-linecap="round"/>
  <line x1="15" y1="40" x2="13" y2="63" stroke="#6B7A28" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="18" y1="40" x2="18" y2="64" stroke="#4B5520" stroke-width="2"   stroke-linecap="round"/>
  <line x1="21" y1="40" x2="23" y2="63" stroke="#6B7A28" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="24" y1="40" x2="27" y2="61" stroke="#3A4518" stroke-width="2"   stroke-linecap="round"/>
  <circle cx="9"  cy="61" r="2"   fill="#8A9C35"/>
  <circle cx="13" cy="63" r="1.5" fill="#8A9C35"/>
  <circle cx="18" cy="64" r="2"   fill="#8A9C35"/>
  <circle cx="23" cy="63" r="1.5" fill="#8A9C35"/>
  <circle cx="27" cy="61" r="2"   fill="#8A9C35"/>
</svg>`;
const CURSOR_CSS = `url("data:image/svg+xml,${encodeURIComponent(NORIGAE_SVG)}") 22 5, crosshair`;

// ── 설정값 ───────────────────────────────────────────────────────────────────
const FILL_THRESHOLD  = 0.97;   // 97% 채워지면 3D + 클릭존 활성화
const MAX_ROTATE      = 2.5;    // 최대 기울기 각도 (deg)
const MAX_TRANSLATE   = 12;     // 최대 이동 거리 (px)
const PERSPECTIVE     = 2400;   // 원근감 (높을수록 미묘)
const SAMPLE_INTERVAL = 800;

// ── 클릭 존 타입 ─────────────────────────────────────────────────────────────
export interface ClickZone {
  id:    string;
  label: string;
  href:  string;
  // 화면 기준 % (0~100)
  x: number; y: number; w: number; h: number;
}

interface Props {
  src:      string;
  radius?:  number;
  softness?: number;
  zones?:   ClickZone[];
}

export default function HoverColorReveal({ src, radius = 200, softness = 0.6, zones = [] }: Props) {
  const router        = useRouter();
  const outerRef      = useRef<HTMLDivElement>(null);   // perspective 컨테이너
  const wrapperRef    = useRef<HTMLDivElement>(null);   // 3D 틸트 대상
  const overlayRef    = useRef<HTMLDivElement>(null);   // 페이지 전환 오버레이
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const trailRef      = useRef<HTMLCanvasElement | null>(null);
  const colorImgRef   = useRef<HTMLImageElement | null>(null);
  const grayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef        = useRef<number>(0);
  const readyRef      = useRef(false);
  const tiltRef       = useRef(true);   // 처음부터 틸트 활성
  const zonesRef      = useRef(false);  // 97% 이후 클릭존 활성
  const navigatingRef = useRef(false);  // 줌인 이동 중 마우스 틸트 차단
  const [fillPct, setFillPct] = useState(0);
  const [tiltOn,  setTiltOn]  = useState(false);
  const [, setHoveredZone] = useState<string | null>(null);

  // ── 캔버스 크기 동기화 ───────────────────────────────────────────────────
  const setSize = useCallback(() => {
    const canvas = canvasRef.current;
    const trail  = trailRef.current;
    if (!canvas) return;
    const w = window.innerWidth, h = window.innerHeight;
    if (trail && trail.width > 0) {
      const tmp = document.createElement('canvas');
      tmp.width = trail.width; tmp.height = trail.height;
      tmp.getContext('2d')!.drawImage(trail, 0, 0);
      trail.width = w; trail.height = h;
      trail.getContext('2d')!.drawImage(tmp, 0, 0);
    } else if (trail) { trail.width = w; trail.height = h; }
    canvas.width = w; canvas.height = h;
  }, []);

  // ── 렌더 루프 ────────────────────────────────────────────────────────────
  const drawFrame = useCallback(() => {
    const canvas   = canvasRef.current;
    const trail    = trailRef.current;
    const colorImg = colorImgRef.current;
    const grayC    = grayCanvasRef.current;
    if (!canvas || !trail || !colorImg || !grayC || !readyRef.current) {
      rafRef.current = requestAnimationFrame(drawFrame); return;
    }
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width, H = canvas.height;
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(grayC, 0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(trail, 0, 0);
    ctx.globalCompositeOperation = 'destination-over';
    ctx.drawImage(colorImg, 0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';
    rafRef.current = requestAnimationFrame(drawFrame);
  }, []);

  // ── fill % 샘플링 ────────────────────────────────────────────────────────
  const sampleFill = useCallback(() => {
    const trail = trailRef.current;
    if (!trail || trail.width === 0) return;
    const sw = Math.floor(trail.width / 8);
    const sh = Math.floor(trail.height / 8);
    const tmp = document.createElement('canvas');
    tmp.width = sw; tmp.height = sh;
    tmp.getContext('2d')!.drawImage(trail, 0, 0, sw, sh);
    const data = tmp.getContext('2d')!.getImageData(0, 0, sw, sh).data;
    let filled = 0;
    for (let i = 3; i < data.length; i += 4) filled += data[i] > 30 ? 1 : 0;
    const pct = filled / (sw * sh);
    setFillPct(pct);
    if (pct >= FILL_THRESHOLD && !zonesRef.current) {
      zonesRef.current = true;
      setTiltOn(true);
      gsap.timeline()
        .to(wrapperRef.current, { scale: 1.03, duration: 0.3, ease: 'power2.out' })
        .to(wrapperRef.current, { scale: 1.0,  duration: 0.6, ease: 'elastic.out(1, 0.35)' });
    }
  }, []);

  // ── 초기화 ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const trail = document.createElement('canvas');
    trailRef.current = trail;
    setSize();
    const img = new Image();
    img.src = src;
    img.onload = () => {
      colorImgRef.current = img;
      const gray = document.createElement('canvas');
      gray.width = img.naturalWidth; gray.height = img.naturalHeight;
      const gCtx = gray.getContext('2d')!;
      gCtx.filter = 'grayscale(1) brightness(0.82)';
      gCtx.drawImage(img, 0, 0);
      grayCanvasRef.current = gray;

      // 옥된장 간판 영역을 미리 컬러로 표시 (색칠 유도 가이드)
      const tCtx = trail.getContext('2d')!;
      const W = trail.width, H = trail.height;
      // 간판: x 23~43%, y 36~46% 영역을 브러시로 채움
      const signPoints = [
        { x: 0.23, y: 0.37 }, { x: 0.28, y: 0.37 }, { x: 0.33, y: 0.37 }, { x: 0.38, y: 0.37 }, { x: 0.43, y: 0.37 },
        { x: 0.23, y: 0.41 }, { x: 0.28, y: 0.41 }, { x: 0.33, y: 0.41 }, { x: 0.38, y: 0.41 }, { x: 0.43, y: 0.41 },
        { x: 0.23, y: 0.45 }, { x: 0.28, y: 0.45 }, { x: 0.33, y: 0.45 }, { x: 0.38, y: 0.45 }, { x: 0.43, y: 0.45 },
      ];
      tCtx.globalCompositeOperation = 'source-over';
      for (const { x, y } of signPoints) {
        const px = x * W, py = y * H, r = 70;
        const grad = tCtx.createRadialGradient(px, py, 0, px, py, r);
        grad.addColorStop(0,   'rgba(255,255,255,1)');
        grad.addColorStop(0.7, 'rgba(255,255,255,0.95)');
        grad.addColorStop(1,   'rgba(255,255,255,0)');
        tCtx.fillStyle = grad;
        tCtx.beginPath();
        tCtx.arc(px, py, r, 0, Math.PI * 2);
        tCtx.fill();
      }

      readyRef.current = true;
    };
    img.onerror = () => console.error('[HoverColorReveal] 이미지 로드 실패:', src);
    window.addEventListener('resize', setSize);
    rafRef.current = requestAnimationFrame(drawFrame);
    const timer = setInterval(sampleFill, SAMPLE_INTERVAL);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', setSize);
      clearInterval(timer);
    };
  }, [src, setSize, drawFrame, sampleFill]);

  // ── 마우스 이동: 색칠 + 3D 틸트 ────────────────────────────────────────
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const trail = trailRef.current;
    const canvas = canvasRef.current;
    if (trail && canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const tCtx = trail.getContext('2d')!;
      const grad = tCtx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0,            'rgba(255,255,255,1)');
      grad.addColorStop(1 - softness, 'rgba(255,255,255,0.95)');
      grad.addColorStop(1,            'rgba(255,255,255,0)');
      tCtx.globalCompositeOperation = 'source-over';
      tCtx.fillStyle = grad;
      tCtx.beginPath();
      tCtx.arc(x, y, radius, 0, Math.PI * 2);
      tCtx.fill();
    }
    if (!tiltRef.current || !wrapperRef.current || navigatingRef.current) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const nx = (e.clientX - cx) / cx;
    const ny = (e.clientY - cy) / cy;
    gsap.to(wrapperRef.current, {
      rotateX:  -ny * MAX_ROTATE,
      rotateY:   nx * MAX_ROTATE,
      x:         nx * MAX_TRANSLATE,
      y:         ny * MAX_TRANSLATE,
      scale:     1.08,
      duration:  1.4,
      ease:      'power2.out',
      overwrite: 'auto',
    });
  }, [radius, softness]);

  const handleMouseLeave = useCallback(() => {
    // 마우스가 UI를 벗어나면 현재 위치/기울기에서 그대로 정지
    // 마우스가 다시 돌아오면 handleMouseMove가 새 위치로 자연스럽게 재개
    gsap.killTweensOf(wrapperRef.current);
  }, []);

  // ── 클릭 존 이동 (파사드 입구 줌인 → 0.5s 정지 → 검정 페이드 → 이동) ──
  const navigateTo = useCallback((href: string) => {
    const overlay = overlayRef.current;
    const wrapper = wrapperRef.current;
    if (!wrapper) { router.push(href); return; }

    // 이동 중 마우스 틸트/스케일 덮어쓰기 차단
    navigatingRef.current = true;

    const W = window.innerWidth;
    const H = window.innerHeight;
    const DOOR_X = 0.33;
    const DOOR_Y = 0.67;
    const tx = W * (0.5 - DOOR_X);
    const ty = H * (0.5 - DOOR_Y);

    gsap.killTweensOf(wrapper);
    gsap.set(wrapper, {
      rotateX: 0, rotateY: 0, x: 0, y: 0, scale: 1,
      transformOrigin: `${DOOR_X * 100}% ${DOOR_Y * 100}%`,
    });

    const tl = gsap.timeline();
    // 줌인 3.7초, 1.1초 시점부터 함께 어두워지며 줌인 끝과 동시에 완료
    tl.to(wrapper, { scale: 7, x: tx, y: ty, duration: 3.7, ease: 'power1.inOut' }, 0)
      .to(overlay, {
        opacity: 1,
        duration: 2.6,
        ease: 'power2.in',
        onComplete: () => router.push(href),
      }, 1.1);
  }, [router]);

  // ── 97% 이전 조기 클릭: 전체 채색 후 이동 ─────────────────────────────
  const handleEarlyClick = useCallback((href: string) => {
    const trail = trailRef.current;
    if (trail) {
      const tCtx = trail.getContext('2d')!;
      tCtx.globalCompositeOperation = 'source-over';
      tCtx.fillStyle = 'rgba(255,255,255,1)';
      tCtx.fillRect(0, 0, trail.width, trail.height);
    }
    zonesRef.current = true;
    setTiltOn(true);
    setTimeout(() => navigateTo(href), 180);
  }, [navigateTo]);

  return (
    <>
    {/* 페이지 전환 오버레이 — perspective 바깥에 위치해야 3D 스태킹에 묻히지 않음 */}
    <div ref={overlayRef} style={{
      position: 'fixed', inset: 0, background: '#000',
      opacity: 0, zIndex: 9999, pointerEvents: 'none',
    }} />

    <div ref={outerRef} style={{ width: '100%', height: '100%', perspective: `${PERSPECTIVE}px`, overflow: 'hidden' }}>


      {/* 3D 틸트 wrapper */}
      <div
        ref={wrapperRef}
        data-testid="tilt-wrapper"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d', willChange: 'transform',
          cursor: CURSOR_CSS,
        }}
      >
        {/* 메인 캔버스 */}
        <canvas
          ref={canvasRef}
          data-testid="main-canvas"
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* 파사드 스파클 효과 — 항상 표시 (클릭 유도) */}
        {zones.map(zone => (
          <div key={`shimmer-${zone.id}`} style={{
            position: 'absolute',
            left: `${zone.x}%`, top: `${zone.y}%`,
            width: `${zone.w}%`, height: `${zone.h}%`,
            pointerEvents: 'none', zIndex: 5,
            overflow: 'hidden',
          }}>
            {([
              { left: '18%', top: '12%', delay: '0s',   size: 4.5 },
              { left: '78%', top:  '9%', delay: '1.3s', size: 4   },
              { left: '50%', top: '20%', delay: '0.7s', size: 5   },
              { left: '26%', top: '76%', delay: '2.0s', size: 4   },
              { left: '38%', top: '52%', delay: '1.6s', size: 6   },
              { left: '70%', top: '80%', delay: '0.4s', size: 4.5 },
            ] as Array<{left:string;top:string;delay:string;size:number}>).map((sp, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: sp.left, top: sp.top,
                width: sp.size, height: sp.size,
                background: 'rgba(255,235,100,1)',
                borderRadius: '50%',
                boxShadow: `0 0 ${sp.size * 2.5}px rgba(255,225,80,0.85)`,
                animation: `sparkle 2.6s ease-in-out ${sp.delay} infinite`,
              }} />
            ))}
          </div>
        ))}

        {/* 97% 이전 클릭 존 — 전체 채색 후 이동 */}
        {!tiltOn && zones.map(zone => (
          <button
            key={`early-${zone.id}`}
            onClick={() => handleEarlyClick(zone.href)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            style={{
              position: 'absolute',
              left: `${zone.x}%`, top: `${zone.y}%`,
              width: `${zone.w}%`, height: `${zone.h}%`,
              background: 'transparent', border: 'none', outline: 'none',
              cursor: CURSOR_CSS, padding: 0, zIndex: 8,
            }}
          />
        ))}

        {/* 97% 이후 클릭 존 */}
        {tiltOn && zones.map(zone => (
          <button
            key={zone.id}
            data-testid={`zone-${zone.id}`}
            onClick={() => navigateTo(zone.href)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
            style={{
              position: 'absolute',
              left: `${zone.x}%`, top: `${zone.y}%`,
              width: `${zone.w}%`, height: `${zone.h}%`,
              background: 'transparent', border: 'none', outline: 'none',
              cursor: CURSOR_CSS, padding: 0, zIndex: 8,
            }}
          />
        ))}


      </div>

      <style>{`
        @keyframes sparkle {
          0%,100% { transform:scale(0) rotate(0deg);  opacity:0; }
          50%     { transform:scale(1) rotate(45deg); opacity:1; }
        }
      `}</style>
    </div>
    </>
  );
}
