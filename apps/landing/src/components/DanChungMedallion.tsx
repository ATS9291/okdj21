// 단청 원형 메달리온 — 한국 단청 양식 (석청 중심, 능화문 테두리)
const CX = 200, CY = 200;

// 연화문 꽃잎 (타원형 양 끝 뾰족)
function petal(angleDeg: number, r1: number, r2: number, w: number): string {
  const rad  = angleDeg * Math.PI / 180;
  const perp = rad + Math.PI / 2;
  const mid  = (r1 + r2) / 2;
  const sx = CX + r1 * Math.cos(rad),  sy = CY + r1 * Math.sin(rad);
  const ex = CX + r2 * Math.cos(rad),  ey = CY + r2 * Math.sin(rad);
  const mx = CX + mid * Math.cos(rad), my = CY + mid * Math.sin(rad);
  const c1x = mx + (w / 2) * Math.cos(perp), c1y = my + (w / 2) * Math.sin(perp);
  const c2x = mx - (w / 2) * Math.cos(perp), c2y = my - (w / 2) * Math.sin(perp);
  const f = (n: number) => n.toFixed(1);
  return `M${f(sx)},${f(sy)} Q${f(c1x)},${f(c1y)} ${f(ex)},${f(ey)} Q${f(c2x)},${f(c2y)} ${f(sx)},${f(sy)}Z`;
}

// 능화문 마름모 — 방사형 다이아몬드
function diamond(angleDeg: number, r: number, dw: number, dh: number): string {
  const rad  = angleDeg * Math.PI / 180;
  const perp = rad + Math.PI / 2;
  const f = (n: number) => n.toFixed(1);
  const ox = CX + (r + dh / 2) * Math.cos(rad), oy = CY + (r + dh / 2) * Math.sin(rad);
  const ix = CX + (r - dh / 2) * Math.cos(rad), iy = CY + (r - dh / 2) * Math.sin(rad);
  const lx = CX + r * Math.cos(rad) + (dw / 2) * Math.cos(perp),
        ly = CY + r * Math.sin(rad) + (dw / 2) * Math.sin(perp);
  const rx = CX + r * Math.cos(rad) - (dw / 2) * Math.cos(perp),
        ry = CY + r * Math.sin(rad) - (dw / 2) * Math.sin(perp);
  return `M${f(ox)},${f(oy)} L${f(lx)},${f(ly)} L${f(ix)},${f(iy)} L${f(rx)},${f(ry)} Z`;
}

const A8   = [0, 45, 90, 135, 180, 225, 270, 315];
const A8r  = A8.map(a => a + 22.5);
const A16  = Array.from({ length: 16 }, (_, i) => i * 22.5);

// 한국 단청 팔레트
const NAVY  = '#06101E'; // 먹감색 배경
const BLUE  = '#1A4A9A'; // 석청 (石靑)
const LBLUE = '#3A6DC4'; // 청금 (靑金) — 밝은 석청
const RED   = '#9B1B14'; // 주홍 (朱紅)
const GREEN = '#1A5C22'; // 녹청 (綠靑)
const GOLD  = '#C8A040'; // 금 (金)
const CREAM = '#EAD9A4'; // 호분 (胡粉)
const INK   = '#050A0E'; // 먹선 (墨線)

export function DanChungMedallion() {
  return (
    <svg
      viewBox="0 0 400 400"
      style={{ display: 'block', width: '100%', height: '100%' }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── 바탕 원 ───────────────────────────────────── */}
      <circle cx="200" cy="200" r="197" fill={NAVY} stroke={GOLD} strokeWidth="5"/>
      <circle cx="200" cy="200" r="191" fill="none" stroke={INK}  strokeWidth="3"/>
      <circle cx="200" cy="200" r="188" fill="none" stroke={BLUE} strokeWidth="1.5"/>

      {/* ── 능화문 테두리: 16개 방사형 마름모 ────────────── */}
      {A16.map((a, i) => (
        <path key={`dm${i}`} d={diamond(a, 172, 16, 28)}
          fill={i % 2 === 0 ? BLUE : RED}
          stroke={INK} strokeWidth="2.5"
        />
      ))}
      {/* 마름모 내 중앙점 */}
      {A16.map((a, i) => {
        const rad = a * Math.PI / 180;
        return (
          <circle key={`dmd${i}`}
            cx={(CX + 172 * Math.cos(rad)).toFixed(1)}
            cy={(CY + 172 * Math.sin(rad)).toFixed(1)}
            r="4"
            fill={i % 2 === 0 ? CREAM : GOLD}
            opacity="0.85"
          />
        );
      })}

      {/* ── 첫 번째 링 ─────────────────────────────────── */}
      <circle cx="200" cy="200" r="149" fill="none" stroke={GOLD}  strokeWidth="3.5"/>
      <circle cx="200" cy="200" r="144" fill="none" stroke={INK}   strokeWidth="2"/>
      <circle cx="200" cy="200" r="141" fill="none" stroke={LBLUE} strokeWidth="1.5"/>

      {/* ── 외곽 8 배경 꽃잎 (22.5° 회전, 녹청) ─────────── */}
      {A8r.map((a, i) => (
        <path key={`bg1${i}`} d={petal(a, 90, 138, 52)} fill={GREEN} stroke={INK} strokeWidth="2"/>
      ))}

      {/* ── 외곽 8 주 꽃잎 (석청·주홍 교번) ──────────────── */}
      {A8.map((a, i) => (
        <path key={`mp${i}`} d={petal(a, 90, 140, 46)}
          fill={i % 2 === 0 ? BLUE : RED}
          stroke={INK} strokeWidth="2.5"
        />
      ))}

      {/* 꽃잎 내 호분 선묘 */}
      {A8.map((a, i) => {
        const rad = a * Math.PI / 180;
        return (
          <line key={`ml${i}`}
            x1={(CX + 102 * Math.cos(rad)).toFixed(1)} y1={(CY + 102 * Math.sin(rad)).toFixed(1)}
            x2={(CX + 136 * Math.cos(rad)).toFixed(1)} y2={(CY + 136 * Math.sin(rad)).toFixed(1)}
            stroke={CREAM} strokeWidth="1.4" opacity="0.5"
          />
        );
      })}

      {/* 꽃잎 끝 금 강조점 */}
      {A8.map((a, i) => {
        const rad = a * Math.PI / 180;
        return (
          <circle key={`mpt${i}`}
            cx={(CX + 139 * Math.cos(rad)).toFixed(1)}
            cy={(CY + 139 * Math.sin(rad)).toFixed(1)}
            r="5.5" fill={GOLD} stroke={INK} strokeWidth="1.5" opacity="0.9"
          />
        );
      })}

      {/* 링 사이 소 마름모 장식 */}
      {A8r.map((a, i) => (
        <path key={`sd${i}`} d={diamond(a, 153, 7, 10)}
          fill={GOLD} stroke={INK} strokeWidth="1.5"
        />
      ))}

      {/* ── 두 번째 링 ─────────────────────────────────── */}
      <circle cx="200" cy="200" r="89"  fill={NAVY} stroke={GOLD}  strokeWidth="3.5"/>
      <circle cx="200" cy="200" r="84"  fill="none" stroke={INK}   strokeWidth="2"/>
      <circle cx="200" cy="200" r="81"  fill="none" stroke={LBLUE} strokeWidth="1.5"/>

      {/* ── 내부 8 배경 꽃잎 (녹청) ─────────────────────── */}
      {A8r.map((a, i) => (
        <path key={`bg2${i}`} d={petal(a, 50, 74, 28)} fill={GREEN} stroke={INK} strokeWidth="1.5"/>
      ))}

      {/* ── 내부 8 주 꽃잎 (석청·주홍) ──────────────────── */}
      {A8.map((a, i) => (
        <path key={`sp${i}`} d={petal(a, 50, 76, 24)}
          fill={i % 2 === 0 ? BLUE : RED}
          stroke={INK} strokeWidth="2"
        />
      ))}

      {/* 내부 꽃잎 선묘 */}
      {A8.map((a, i) => {
        const rad = a * Math.PI / 180;
        return (
          <line key={`sl${i}`}
            x1={(CX + 57 * Math.cos(rad)).toFixed(1)} y1={(CY + 57 * Math.sin(rad)).toFixed(1)}
            x2={(CX + 73 * Math.cos(rad)).toFixed(1)} y2={(CY + 73 * Math.sin(rad)).toFixed(1)}
            stroke={CREAM} strokeWidth="1" opacity="0.5"
          />
        );
      })}

      {/* ── 세 번째 링 ─────────────────────────────────── */}
      <circle cx="200" cy="200" r="48"  fill={NAVY} stroke={GOLD} strokeWidth="3"/>
      <circle cx="200" cy="200" r="43"  fill="none" stroke={INK}  strokeWidth="2"/>

      {/* ── 중심 연꽃 8 꽃잎 (청금·호분 교번) ───────────── */}
      {A8.map((a, i) => (
        <path key={`cp${i}`} d={petal(a, 20, 40, 16)}
          fill={i % 2 === 0 ? LBLUE : CREAM}
          stroke={INK} strokeWidth="1.5"
        />
      ))}

      {/* ── 중심원 ──────────────────────────────────────── */}
      <circle cx="200" cy="200" r="18" fill={GOLD}  stroke={INK} strokeWidth="2"/>
      <circle cx="200" cy="200" r="13" fill={RED}   stroke={INK} strokeWidth="1.5"/>
      <circle cx="200" cy="200" r="8"  fill={BLUE}/>
      <circle cx="200" cy="200" r="3.5" fill={CREAM}/>
    </svg>
  );
}
