'use client';

import { useRef, useState, useTransition } from 'react';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { submitReservation } from '@/app/actions/reservation';

const TIME_SLOTS = Array.from({ length: 20 }, (_, i) => {
  const totalMinutes = 11 * 60 + 30 + i * 30;
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
});

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: 3, color: '#fff',
  fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelStyle: React.CSSProperties = {
  fontFamily: "'Noto Sans KR', sans-serif",
  fontSize: 12, color: 'rgba(255,255,255,0.5)',
  letterSpacing: '0.1em', marginBottom: 8, display: 'block',
};

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = 'rgba(200,169,110,0.7)');
const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = 'rgba(200,169,110,0.25)');

export default function ReservationPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toast, setToast]   = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(formRef.current!);
    startTransition(async () => {
      const result = await submitReservation(fd);
      if (result.success) {
        setToast({ msg: '예약이 접수되었습니다. 확인 후 연락드리겠습니다.', ok: true });
        formRef.current?.reset();
      } else {
        setToast({ msg: result.error ?? '오류가 발생했습니다.', ok: false });
      }
      setTimeout(() => setToast(null), 4000);
    });
  };

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', cursor: NORIGAE_CURSOR }}>
      <SiteNav />

      {/* 토스트 */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
          background: toast.ok ? 'rgba(200,169,110,0.95)' : 'rgba(180,60,60,0.95)',
          color: '#000', padding: '14px 28px',
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
          borderRadius: 3, zIndex: 1000,
          animation: 'fadein 0.3s ease',
        }}>
          {toast.msg}
        </div>
      )}

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '120px 32px 100px' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 12 }}>
          RESERVATION
        </p>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 300, color: '#fff', marginBottom: 16, lineHeight: 1.3,
        }}>
          예약
        </h1>
        <p style={{
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
          color: 'rgba(255,255,255,0.4)', marginBottom: 64, lineHeight: 1.8,
        }}>
          예약 접수 후 담당자가 확인하여 연락드립니다.<br />
          영업시간: 11:30 – 21:00 (매주 월요일 휴무)
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          {/* 예약 폼 */}
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={labelStyle}>이름 *</label>
              <input name="name" required style={inputStyle}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            <div>
              <label style={labelStyle}>연락처 *</label>
              <input name="phone" required type="tel" placeholder="010-0000-0000" style={inputStyle}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label style={labelStyle}>방문 날짜 *</label>
                <input name="date" required type="date"
                  min={new Date().toISOString().split('T')[0]}
                  style={{ ...inputStyle, colorScheme: 'dark' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(200,169,110,0.7)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(200,169,110,0.25)')}
                />
              </div>
              <div>
                <label style={labelStyle}>방문 시간 *</label>
                <select name="time" required style={{ ...inputStyle, cursor: NORIGAE_CURSOR }}>
                  <option value="" style={{ background: '#1a1a1a' }}>시간 선택</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t} style={{ background: '#1a1a1a' }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label style={labelStyle}>인원 *</label>
              <select name="party_size" required style={{ ...inputStyle, cursor: NORIGAE_CURSOR }}>
                <option value="" style={{ background: '#1a1a1a' }}>인원 선택</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n}명</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>요청 사항</label>
              <textarea name="notes" rows={4}
                placeholder="알레르기, 기념일, 좌석 요청 등"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>
            <button
              type="submit"
              disabled={isPending}
              style={{
                padding: '16px', background: isPending ? 'rgba(200,169,110,0.4)' : '#c8a96e',
                color: '#000', fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 14, fontWeight: 700, border: 'none',
                cursor: isPending ? 'wait' : NORIGAE_CURSOR,
                letterSpacing: '0.1em', transition: 'background 0.2s',
              }}
            >
              {isPending ? '접수 중...' : '예약 신청'}
            </button>
          </form>

          {/* 찾아오는 길 */}
          <div>
            <h2 style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 18, fontWeight: 500, color: '#fff', marginBottom: 24,
            }}>
              찾아오는 길
            </h2>

            {/* 카카오맵 iframe — 실제 주소로 교체 */}
            <div style={{
              width: '100%', aspectRatio: '4/3',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(200,169,110,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 24,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13 }}>
                지도 (주소 입력 후 카카오맵 iframe 삽입)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: '주소', value: '서울시 OO구 OO로 OO' },
                { label: '영업시간', value: '11:30 – 21:00 (월요일 휴무)' },
                { label: '주차', value: '건물 지하 주차장 이용 가능' },
                { label: '문의', value: '010-0000-0000' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 16 }}>
                  <span style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 12, color: '#c8a96e',
                    minWidth: 64, letterSpacing: '0.05em',
                  }}>
                    {label}
                  </span>
                  <span style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6,
                  }}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadein { from { opacity: 0; transform: translateX(-50%) translateY(10px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        select option { background: #1a1a1a; }
      `}</style>
    </main>
  );
}
