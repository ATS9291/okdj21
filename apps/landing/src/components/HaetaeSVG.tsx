// 해태(獬豸) — 전통 수호 신수, 올리브 팔레트
export function HaetaeSVG({ size = 72, flipped = false }: { size?: number; flipped?: boolean }) {
  const h = Math.round(size * 126 / 72);
  return (
    <svg
      width={size} height={h}
      viewBox="0 0 72 126"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={flipped ? { transform: 'scaleX(-1)', display: 'block' } : { display: 'block' }}
    >
      {/* ── 뿔 ─────────────────────────────────────────── */}
      <polygon points="36,0 41,15 31,15" fill="#8A9C35"/>
      <polygon points="36,2 38.5,9 33.5,9" fill="#9AB040" opacity="0.55"/>
      <line x1="36" y1="3" x2="36" y2="14" stroke="#a0b845" strokeWidth="1" opacity="0.4"/>

      {/* ── 갈기 외곽 (불꽃·구름 형태) ─────────────────── */}
      <path d="
        M36 20 C29 11 18 12 15 20
        C9 15 5 24 10 32
        C3 30 1 41 9 47
        C13 53 24 55 36 53
        C48 55 59 53 63 47
        C71 41 69 30 62 32
        C67 24 63 15 57 20
        C54 12 43 11 36 20 Z
      " fill="#28380E"/>

      {/* ── 갈기 내곽 ──────────────────────────────────── */}
      <path d="
        M36 22 C30 15 21 16 18 23
        C13 19 10 27 14 34
        C8 33 7 42 13 47
        C17 52 27 53 36 52
        C45 53 55 52 59 47
        C65 42 64 33 58 34
        C62 27 59 19 54 23
        C51 16 42 15 36 22 Z
      " fill="#374818"/>

      {/* ── 머리 ───────────────────────────────────────── */}
      <ellipse cx="36" cy="44" rx="19" ry="17" fill="#4B5520"/>

      {/* 이마 주름 */}
      <path d="M21 37 Q36 31 51 37" stroke="#5C6D25" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <path d="M24 34 Q27 29 32 28" stroke="#5C6D25" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M48 34 Q45 29 40 28" stroke="#5C6D25" strokeWidth="1.2" fill="none" strokeLinecap="round"/>

      {/* ── 눈썹 (역V) ─────────────────────────────────── */}
      <path d="M17 41 L23 35 L29 38" stroke="#7A8C2E" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M55 41 L49 35 L43 38" stroke="#7A8C2E" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

      {/* ── 눈 ─────────────────────────────────────────── */}
      <ellipse cx="26" cy="44" rx="6" ry="5" fill="#7A8C2E"/>
      <ellipse cx="46" cy="44" rx="6" ry="5" fill="#7A8C2E"/>
      <circle cx="27" cy="44" r="3.3" fill="#151E08"/>
      <circle cx="47" cy="44" r="3.3" fill="#151E08"/>
      {/* 눈 하이라이트 */}
      <circle cx="28.2" cy="42.8" r="1.3" fill="#9AB040" opacity="0.8"/>
      <circle cx="48.2" cy="42.8" r="1.3" fill="#9AB040" opacity="0.8"/>

      {/* ── 코 ─────────────────────────────────────────── */}
      <path d="M30 52 Q33 50 36 50 Q39 50 42 52 Q40 55 36 55.5 Q32 55 30 52Z" fill="#283210"/>
      <circle cx="32" cy="51.5" r="2.4" fill="#1C280C"/>
      <circle cx="40" cy="51.5" r="2.4" fill="#1C280C"/>

      {/* ── 입 (열린 입, 이빨, 엄니) ──────────────────── */}
      <path d="M17 58 C23 71 49 71 55 58 Z" fill="#181E08"/>
      <path d="M17 58 C23 68 49 68 55 58" fill="#101608"/>
      {/* 이빨 */}
      <rect x="25" y="58" width="4"   height="6.5" rx="1.5" fill="#DDD4A0"/>
      <rect x="31" y="58" width="4"   height="7"   rx="1.5" fill="#DDD4A0"/>
      <rect x="37" y="58" width="4"   height="7"   rx="1.5" fill="#DDD4A0"/>
      <rect x="43" y="58" width="3.5" height="6"   rx="1"   fill="#DDD4A0"/>
      {/* 엄니 */}
      <polygon points="17,58 21.5,58 19,67" fill="#DDD4A0"/>
      <polygon points="55,58 50.5,58 53,67" fill="#DDD4A0"/>

      {/* ── 턱 수염 / 갈기 아래 ────────────────────────── */}
      <ellipse cx="36" cy="68" rx="11" ry="6.5" fill="#374818"/>

      {/* ── 몸통 ───────────────────────────────────────── */}
      <path d="M11 80 C5 94 5 110 12 120
               C18 125 36 126 36 126
               C36 126 54 125 60 120
               C67 110 67 94 61 80
               C55 70 46 66 36 66
               C26 66 17 70 11 80 Z" fill="#4B5520"/>

      {/* ── 비늘 문양 ──────────────────────────────────── */}
      <path d="M17 84 C26 78 46 78 55 84" stroke="#6B7A28" strokeWidth="1.7" fill="none"/>
      <path d="M11 96 C22 89 50 89 61 96" stroke="#6B7A28" strokeWidth="1.7" fill="none"/>
      <path d="M11 108 C22 101 50 101 61 108" stroke="#6B7A28" strokeWidth="1.7" fill="none"/>
      <path d="M12 119 C23 112 49 112 60 119" stroke="#6B7A28" strokeWidth="1.5" fill="none"/>
      {/* 비늘 중심 장식 */}
      <circle cx="36" cy="85"  r="2.3" fill="#6B7A28" opacity="0.5"/>
      <circle cx="24" cy="91"  r="1.7" fill="#6B7A28" opacity="0.42"/>
      <circle cx="48" cy="91"  r="1.7" fill="#6B7A28" opacity="0.42"/>
      <circle cx="36" cy="103" r="2.3" fill="#6B7A28" opacity="0.5"/>
      <circle cx="24" cy="114" r="1.7" fill="#6B7A28" opacity="0.42"/>
      <circle cx="48" cy="114" r="1.7" fill="#6B7A28" opacity="0.42"/>

      {/* ── 앞다리 ─────────────────────────────────────── */}
      <path d="M12 114 C6 119 4 123 6 126"  stroke="#3A4518" strokeWidth="10" strokeLinecap="round" fill="none"/>
      <path d="M60 114 C66 119 68 123 66 126" stroke="#3A4518" strokeWidth="10" strokeLinecap="round" fill="none"/>
      {/* 발바닥 */}
      <ellipse cx="6"  cy="124" rx="7" ry="4" fill="#3A4518"/>
      <ellipse cx="66" cy="124" rx="7" ry="4" fill="#3A4518"/>
      {/* 발톱 (좌) */}
      <path d="M1 122 L0 126 M4 124 L3.5 126 M7 125 L7 126 M10 124 L10.5 126" stroke="#8A9C35" strokeWidth="1.3" strokeLinecap="round"/>
      {/* 발톱 (우) */}
      <path d="M71 122 L72 126 M68 124 L68.5 126 M65 125 L65 126 M62 124 L61.5 126" stroke="#8A9C35" strokeWidth="1.3" strokeLinecap="round"/>

      {/* ── 꼬리 (오른쪽으로 감아올림) ─────────────────── */}
      <path d="M57 84 C67 72 70 55 64 41 C60 33 53 31 51 39"
            stroke="#506020" strokeWidth="4.5" fill="none" strokeLinecap="round"/>
      <path d="M51 39 C47 29 51 20 57 27"
            stroke="#6B7A28" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M57 27 C63 20 67 27 63 35"
            stroke="#7A8C2E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* 꼬리 끝 털 */}
      <ellipse cx="65" cy="37" rx="5.5" ry="4"   fill="#6B7A28" opacity="0.65"/>
      <ellipse cx="63" cy="32" rx="4"   ry="3"   fill="#7A8C2E" opacity="0.75"/>
      <ellipse cx="61" cy="28" rx="3"   ry="2.5" fill="#8A9C35" opacity="0.7"/>

      {/* ── 패드 (전통 장식 느낌 — 발 위 팔찌) ────────── */}
      <path d="M8 116 Q12 113 16 116"  stroke="#8A9C35" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
      <path d="M56 116 Q60 113 64 116" stroke="#8A9C35" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  );
}
