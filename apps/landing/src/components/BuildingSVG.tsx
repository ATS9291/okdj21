'use client';

import { useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ColorMap } from '@/hooks/useColorStore';

interface Zone {
  id: string;
  href?: string;
  label?: string;
  cursor?: string;
}

const NAVIGABLE_ZONES: Zone[] = [
  { id: 'door-frame', href: '/shop', label: '🛍 SHOP', cursor: 'pointer' },
  { id: 'door-panel', href: '/shop', label: '🛍 SHOP', cursor: 'pointer' },
  { id: 'door-glass', href: '/shop', label: '🛍 SHOP', cursor: 'pointer' },
  { id: 'sign-board', href: '/shop', label: '🛍 SHOP', cursor: 'pointer' },
  { id: 'window-1', href: '/start', label: '🖼 GALLERY', cursor: 'pointer' },
  { id: 'window-2', href: '/start', label: '🖼 GALLERY', cursor: 'pointer' },
  { id: 'window-3', href: '/lookbook', label: '📖 LOOKBOOK', cursor: 'pointer' },
  { id: 'window-4', href: '/lookbook', label: '📖 LOOKBOOK', cursor: 'pointer' },
  { id: 'window-5', href: '/about', label: '✨ ABOUT', cursor: 'pointer' },
  { id: 'window-6', href: '/about', label: '✨ ABOUT', cursor: 'pointer' },
  { id: 'roof-main', href: '/about', label: '✨ ABOUT', cursor: 'pointer' },
  { id: 'water-tower', href: '/about', label: '✨ ABOUT', cursor: 'pointer' },
];

interface BuildingSVGProps {
  colors: ColorMap;
  onZoneClick: (zoneId: string) => void;
  selectedColor: string;
}

export default function BuildingSVG({ colors, onZoneClick, selectedColor }: BuildingSVGProps) {
  const router = useRouter();
  const svgRef = useRef<SVGSVGElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const getZoneInfo = (id: string) => NAVIGABLE_ZONES.find(z => z.id === id);

  const handleClick = useCallback((e: React.MouseEvent, zoneId: string) => {
    e.stopPropagation();
    const zoneInfo = getZoneInfo(zoneId);

    onZoneClick(zoneId);

    if (zoneInfo?.href) {
      const target = e.currentTarget as SVGElement;
      gsap.timeline()
        .to(target, { scale: 1.08, duration: 0.12, transformOrigin: 'center center', ease: 'power2.out' })
        .to(target, { scale: 1, duration: 0.1, ease: 'power2.in' })
        .to(svgRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.55,
          ease: 'power3.in',
          transformOrigin: `${e.clientX}px ${e.clientY}px`,
          onComplete: () => router.push(zoneInfo.href!),
        });
    }
  }, [onZoneClick, router]);

  const handleMouseEnter = useCallback((e: React.MouseEvent, zoneId: string) => {
    const zoneInfo = getZoneInfo(zoneId);
    if (!zoneInfo?.href) return;

    const target = e.currentTarget as SVGElement;
    gsap.to(target, { opacity: 0.75, duration: 0.15 });

    if (tooltipRef.current && zoneInfo.label) {
      tooltipRef.current.textContent = zoneInfo.label;
      tooltipRef.current.style.opacity = '1';
      tooltipRef.current.style.left = `${e.clientX + 12}px`;
      tooltipRef.current.style.top = `${e.clientY - 10}px`;
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (tooltipRef.current && tooltipRef.current.style.opacity === '1') {
      tooltipRef.current.style.left = `${e.clientX + 12}px`;
      tooltipRef.current.style.top = `${e.clientY - 10}px`;
    }
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent, zoneId: string) => {
    const zoneInfo = getZoneInfo(zoneId);
    if (!zoneInfo?.href) return;

    const target = e.currentTarget as SVGElement;
    gsap.to(target, { opacity: 1, duration: 0.15 });

    if (tooltipRef.current) {
      tooltipRef.current.style.opacity = '0';
    }
  }, []);

  const zoneProps = (id: string) => {
    const info = getZoneInfo(id);
    return {
      id,
      fill: colors[id] || '#ccc',
      style: { cursor: info?.href ? 'pointer' : 'crosshair' },
      onClick: (e: React.MouseEvent) => handleClick(e, id),
      onMouseEnter: (e: React.MouseEvent) => handleMouseEnter(e, id),
      onMouseMove: handleMouseMove,
      onMouseLeave: (e: React.MouseEvent) => handleMouseLeave(e, id),
    };
  };

  return (
    <>
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className="fixed z-[100] pointer-events-none opacity-0 transition-opacity bg-black text-white text-xs font-black px-2 py-1 rounded-lg border-2 border-white"
        style={{ fontFamily: "'Comic Sans MS', cursive" }}
      />

      <svg
        ref={svgRef}
        viewBox="0 0 700 750"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        className="w-full h-full"
        style={{ display: 'block' }}
      >
        {/* ── SKY ── */}
        <rect {...zoneProps('sky')} x="0" y="0" width="700" height="750" />

        {/* Clouds */}
        <ellipse cx="120" cy="80" rx="60" ry="30" fill="white" opacity="0.8" />
        <ellipse cx="160" cy="70" rx="50" ry="28" fill="white" opacity="0.8" />
        <ellipse cx="80" cy="75" rx="40" ry="22" fill="white" opacity="0.8" />
        <ellipse cx="560" cy="100" rx="70" ry="32" fill="white" opacity="0.7" />
        <ellipse cx="610" cy="88" rx="55" ry="28" fill="white" opacity="0.7" />

        {/* ── GROUND / SIDEWALK ── */}
        <rect {...zoneProps('ground')} x="0" y="650" width="700" height="100" />
        <rect {...zoneProps('sidewalk')} x="60" y="640" width="580" height="60" rx="4" />

        {/* ── MAIN BUILDING BODY ── */}
        <rect {...zoneProps('building-shadow')} x="135" y="195" width="435" height="460" rx="6" />
        <rect {...zoneProps('building-main')} x="130" y="190" width="435" height="460" rx="6" />

        {/* Building outline */}
        <rect x="130" y="190" width="435" height="460" rx="6" fill="none" stroke="#111" strokeWidth="3.5" />

        {/* ── ROOF ── */}
        <polygon {...zoneProps('roof-main')} points="110,195 350,100 590,195" />
        <polygon points="110,195 350,100 590,195" fill="none" stroke="#111" strokeWidth="3.5" strokeLinejoin="round" />
        <rect {...zoneProps('roof-trim')} x="108" y="188" width="484" height="18" rx="4" />
        <rect x="108" y="188" width="484" height="18" rx="4" fill="none" stroke="#111" strokeWidth="2.5" />

        {/* ── WATER TOWER ── */}
        <rect {...zoneProps('water-tower')} x="480" y="110" width="60" height="70" rx="6"
          onClick={(e) => handleClick(e, 'water-tower')}
          onMouseEnter={(e) => handleMouseEnter(e, 'water-tower')}
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => handleMouseLeave(e, 'water-tower')}
          style={{ cursor: 'pointer' }}
        />
        <rect x="480" y="110" width="60" height="70" rx="6" fill="none" stroke="#111" strokeWidth="2" />
        {/* water tower legs */}
        <line x1="493" y1="180" x2="488" y2="205" stroke="#111" strokeWidth="2.5" />
        <line x1="510" y1="180" x2="510" y2="205" stroke="#111" strokeWidth="2.5" />
        <line x1="527" y1="180" x2="532" y2="205" stroke="#111" strokeWidth="2.5" />
        <rect x="478" y="103" width="64" height="12" rx="4" fill={colors['water-tower'] || '#B8860B'} stroke="#111" strokeWidth="2" />

        {/* ── CHIMNEY ── */}
        <rect {...zoneProps('chimney')} x="220" y="120" width="30" height="80" rx="3" />
        <rect x="220" y="120" width="30" height="80" rx="3" fill="none" stroke="#111" strokeWidth="2" />
        <rect x="215" y="115" width="40" height="12" rx="3" fill={colors['chimney'] || '#888'} stroke="#111" strokeWidth="2" />

        {/* Smoke from chimney */}
        <ellipse cx="235" cy="100" rx="12" ry="8" fill="white" opacity="0.5" />
        <ellipse cx="245" cy="85" rx="10" ry="7" fill="white" opacity="0.4" />
        <ellipse cx="232" cy="70" rx="8" ry="6" fill="white" opacity="0.3" />

        {/* ── FLOOR DIVIDERS ── */}
        <line x1="130" y1="370" x2="565" y2="370" stroke="#111" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />
        <line x1="130" y1="490" x2="565" y2="490" stroke="#111" strokeWidth="2" strokeDasharray="8,4" opacity="0.4" />

        {/* ── WINDOWS – Floor 3 (top) ── */}
        {/* Window 5 */}
        <rect {...zoneProps('window-5')} x="175" y="220" width="90" height="110" rx="8" />
        <rect x="175" y="220" width="90" height="110" rx="8" fill="none" stroke="#111" strokeWidth="3" />
        <line x1="220" y1="220" x2="220" y2="330" stroke="#111" strokeWidth="2" />
        <line x1="175" y1="275" x2="265" y2="275" stroke="#111" strokeWidth="2" />
        {/* window reflection */}
        <line x1="185" y1="228" x2="195" y2="245" stroke="white" strokeWidth="2" opacity="0.6" />

        {/* Window 6 */}
        <rect {...zoneProps('window-6')} x="410" y="220" width="90" height="110" rx="8" />
        <rect x="410" y="220" width="90" height="110" rx="8" fill="none" stroke="#111" strokeWidth="3" />
        <line x1="455" y1="220" x2="455" y2="330" stroke="#111" strokeWidth="2" />
        <line x1="410" y1="275" x2="500" y2="275" stroke="#111" strokeWidth="2" />
        <line x1="420" y1="228" x2="430" y2="245" stroke="white" strokeWidth="2" opacity="0.6" />

        {/* Arched center window */}
        <path {...zoneProps('window-3')}
          d="M295,215 Q295,205 347.5,200 Q400,205 400,215 L400,330 L295,330 Z"
        />
        <path d="M295,215 Q295,205 347.5,200 Q400,205 400,215 L400,330 L295,330 Z"
          fill="none" stroke="#111" strokeWidth="3" />
        <line x1="347" y1="200" x2="347" y2="330" stroke="#111" strokeWidth="2" />
        <line x1="295" y1="268" x2="400" y2="268" stroke="#111" strokeWidth="2" />

        {/* ── WINDOWS – Floor 2 (middle) ── */}
        {/* Window 1 */}
        <rect {...zoneProps('window-1')} x="165" y="395" width="95" height="70" rx="6" />
        <rect x="165" y="395" width="95" height="70" rx="6" fill="none" stroke="#111" strokeWidth="2.5" />
        <line x1="212" y1="395" x2="212" y2="465" stroke="#111" strokeWidth="1.5" />
        <line x1="165" y1="430" x2="260" y2="430" stroke="#111" strokeWidth="1.5" />

        {/* Window 2 */}
        <rect {...zoneProps('window-2')} x="420" y="395" width="95" height="70" rx="6" />
        <rect x="420" y="395" width="95" height="70" rx="6" fill="none" stroke="#111" strokeWidth="2.5" />
        <line x1="467" y1="395" x2="467" y2="465" stroke="#111" strokeWidth="1.5" />
        <line x1="420" y1="430" x2="515" y2="430" stroke="#111" strokeWidth="1.5" />

        {/* Window 3 - Floor 2 center */}
        <rect {...zoneProps('window-3')} x="295" y="390" width="110" height="80" rx="6" />
        <rect x="295" y="390" width="110" height="80" rx="6" fill="none" stroke="#111" strokeWidth="2.5" />
        <line x1="350" y1="390" x2="350" y2="470" stroke="#111" strokeWidth="1.5" />

        {/* ── BALCONY ── */}
        <rect {...zoneProps('balcony')} x="155" y="463" width="115" height="10" rx="3" />
        <rect x="155" y="463" width="115" height="10" rx="3" fill="none" stroke="#111" strokeWidth="1.5" />
        <line x1="165" y1="463" x2="165" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="180" y1="463" x2="180" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="195" y1="463" x2="195" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="210" y1="463" x2="210" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="225" y1="463" x2="225" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="240" y1="463" x2="240" y2="490" stroke="#111" strokeWidth="1.5" />
        <line x1="255" y1="463" x2="255" y2="490" stroke="#111" strokeWidth="1.5" />

        {/* ── AWNING ── */}
        <path {...zoneProps('awning')} d="M230,510 L470,510 L495,535 L205,535 Z" />
        <path d="M230,510 L470,510 L495,535 L205,535 Z" fill="none" stroke="#111" strokeWidth="2.5" />
        {/* Awning stripes */}
        {[245, 265, 285, 305, 325, 345, 365, 385, 405, 425, 445].map((x, i) => (
          <line key={i} x1={x} y1="510" x2={x - 10} y2="535" stroke="white" strokeWidth="1.5" opacity="0.4" />
        ))}

        {/* ── SIGN BOARD ── */}
        <rect {...zoneProps('sign-board')} x="225" y="535" width="250" height="40" rx="6"
          onClick={(e) => handleClick(e, 'sign-board')}
          onMouseEnter={(e) => handleMouseEnter(e, 'sign-board')}
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => handleMouseLeave(e, 'sign-board')}
          style={{ cursor: 'pointer' }}
        />
        <rect x="225" y="535" width="250" height="40" rx="6" fill="none" stroke="#111" strokeWidth="3" />
        <text x="350" y="562" textAnchor="middle" fontFamily="'Comic Sans MS', cursive" fontSize="18" fontWeight="bold" fill="white" stroke="#111" strokeWidth="1">
          KidSuper World
        </text>

        {/* ── DOOR ── */}
        <rect {...zoneProps('door-frame')} x="293" y="576" width="114" height="74" rx="8" />
        <rect x="293" y="576" width="114" height="74" rx="8" fill="none" stroke="#111" strokeWidth="3.5" />

        <rect {...zoneProps('door-panel')} x="300" y="582" width="46" height="68" rx="4" />
        <rect x="300" y="582" width="46" height="68" rx="4" fill="none" stroke="#111" strokeWidth="2.5" />

        <rect {...zoneProps('door-glass')} x="354" y="582" width="46" height="68" rx="4" />
        <rect x="354" y="582" width="46" height="68" rx="4" fill="none" stroke="#111" strokeWidth="2.5" />

        {/* door knobs */}
        <circle cx="346" cy="617" r="4" fill="#B8860B" stroke="#111" strokeWidth="1.5" />
        <circle cx="354" cy="617" r="4" fill="#B8860B" stroke="#111" strokeWidth="1.5" />

        {/* Door panel details */}
        <rect x="307" y="590" width="32" height="20" rx="2" fill="none" stroke="#111" strokeWidth="1.5" opacity="0.5" />
        <rect x="307" y="618" width="32" height="24" rx="2" fill="none" stroke="#111" strokeWidth="1.5" opacity="0.5" />

        {/* ── PILLARS ── */}
        <rect {...zoneProps('pillar-left')} x="150" y="510" width="30" height="140" rx="4" />
        <rect x="150" y="510" width="30" height="140" rx="4" fill="none" stroke="#111" strokeWidth="2" />
        <rect {...zoneProps('pillar-right')} x="520" y="510" width="30" height="140" rx="4" />
        <rect x="520" y="510" width="30" height="140" rx="4" fill="none" stroke="#111" strokeWidth="2" />

        {/* ── FLOWER POTS ── */}
        <rect {...zoneProps('flower-pot-1')} x="108" y="628" width="28" height="20" rx="4" />
        <rect x="108" y="628" width="28" height="20" rx="4" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="122" cy="622" r="10" fill={colors['flower-pot-1'] || '#FF4444'} stroke="#111" strokeWidth="2" />
        <circle cx="115" cy="618" r="6" fill="#FF6677" />
        <circle cx="129" cy="618" r="6" fill="#FF6677" />
        <circle cx="122" cy="613" r="6" fill="#FF6677" />

        <rect {...zoneProps('flower-pot-2')} x="564" y="628" width="28" height="20" rx="4" />
        <rect x="564" y="628" width="28" height="20" rx="4" fill="none" stroke="#111" strokeWidth="2" />
        <circle cx="578" cy="622" r="10" fill={colors['flower-pot-2'] || '#FF8844'} stroke="#111" strokeWidth="2" />
        <circle cx="571" cy="618" r="6" fill="#FFAA66" />
        <circle cx="585" cy="618" r="6" fill="#FFAA66" />
        <circle cx="578" cy="613" r="6" fill="#FFAA66" />

        {/* ── GRAFFITI (colorable art) ── */}
        <text {...zoneProps('graffiti-1')}
          x="155" y="350" fontSize="22" fontFamily="'Comic Sans MS', cursive" fontWeight="bold"
          style={{ cursor: 'crosshair', userSelect: 'none' }}
        >
          ★ LOVE
        </text>
        <text {...zoneProps('graffiti-2')}
          x="490" y="350" fontSize="18" fontFamily="'Comic Sans MS', cursive" fontWeight="bold"
          style={{ cursor: 'crosshair', userSelect: 'none' }}
        >
          ART!
        </text>
        <text {...zoneProps('graffiti-3')}
          x="490" y="460" fontSize="16" fontFamily="'Comic Sans MS', cursive" fontWeight="bold"
          style={{ cursor: 'crosshair', userSelect: 'none' }}
        >
          NYC ♥
        </text>

        {/* ── FIRE ESCAPE ── */}
        <g fill="none" stroke={colors['fire-escape'] || '#666'} strokeWidth="2">
          <rect x="522" y="395" width="45" height="70" />
          <line x1="522" y1="415" x2="567" y2="415" />
          <line x1="522" y1="435" x2="567" y2="435" />
          <line x1="522" y1="455" x2="567" y2="455" />
          <rect x="522" y="270" width="45" height="100" />
          <line x1="522" y1="290" x2="567" y2="290" />
          <line x1="522" y1="310" x2="567" y2="310" />
          <line x1="522" y1="330" x2="567" y2="330" />
          <line x1="522" y1="350" x2="567" y2="350" />
          {/* ladder between floors */}
          <line x1="544" y1="370" x2="544" y2="395" strokeDasharray="4,3" />
          <line x1="535" y1="465" x2="535" y2="510" strokeDasharray="4,3" />
        </g>
        {/* make fire escape colorable */}
        <rect
          id="fire-escape"
          x="522" y="265" width="50" height="220"
          fill="transparent"
          stroke="none"
          style={{ cursor: 'crosshair' }}
          onClick={(e) => handleClick(e, 'fire-escape')}
          onMouseEnter={(e) => handleMouseEnter(e, 'fire-escape')}
          onMouseMove={handleMouseMove}
          onMouseLeave={(e) => handleMouseLeave(e, 'fire-escape')}
        />

        {/* Window 4 - Floor 2, right side (previously used window-4) */}
        <rect {...zoneProps('window-4')} x="540" y="395" width="0" height="0" />

        {/* ── STEP / STOOP ── */}
        <rect x="260" y="645" width="180" height="10" rx="3" fill="#B0A080" stroke="#111" strokeWidth="1.5" />
        <rect x="270" y="638" width="160" height="10" rx="3" fill="#C0B090" stroke="#111" strokeWidth="1.5" />

        {/* ── SUN ── */}
        <circle cx="80" cy="60" r="35" fill="#FFD700" stroke="#FF8C00" strokeWidth="3" opacity="0.9" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={80 + 40 * Math.cos(rad)}
              y1={60 + 40 * Math.sin(rad)}
              x2={80 + 52 * Math.cos(rad)}
              y2={60 + 52 * Math.sin(rad)}
              stroke="#FF8C00"
              strokeWidth="2.5"
              opacity="0.8"
            />
          );
        })}
      </svg>
    </>
  );
}
