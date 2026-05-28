'use client';

import { useEffect, useRef, useState, useTransition } from 'react';
import SiteNav from '@/components/SiteNav';
import { NORIGAE_CURSOR } from '@/lib/cursor';
import { submitReservation } from '@/app/actions/reservation';

const TIME_SLOTS = [
  '11:00', '11:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
];

const PARTY_SIZES = Array.from({ length: 19 }, (_, i) => i + 2);

const inputBase: React.CSSProperties = {
  width: '100%', padding: '16px 18px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,169,110,0.25)',
  borderRadius: 3, color: '#fff',
  fontFamily: "'Noto Sans KR', sans-serif",
  outline: 'none', boxSizing: 'border-box',
  transition: 'border-color 0.2s',
};

const labelBase: React.CSSProperties = {
  fontFamily: "'Noto Sans KR', sans-serif",
  color: 'rgba(255,255,255,0.45)',
  letterSpacing: '0.08em', marginBottom: 10, display: 'block',
};

const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = 'rgba(200,169,110,0.7)');
const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = 'rgba(200,169,110,0.25)');

export default function ReservationPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toast, setToast]   = useState<{ msg: string; ok: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();
  const [phone, setPhone] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const t = new Date();
    setMinDate(t.toISOString().split('T')[0]);
    const d = new Date(t);
    d.setMonth(d.getMonth() + 2);
    setMaxDate(d.toISOString().split('T')[0]);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.startsWith('010')) {
      if (digits.length > 7) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
      } else if (digits.length > 3) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      }
    }
    setPhone(formatted);
  };

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(id);
  }, [toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    startTransition(async () => {
      const result = await submitReservation(fd);
      if (result.success) {
        setToast({ msg: '예약이 접수되었습니다. 확인 후 연락드리겠습니다.', ok: true });
        setPhone('');
        formRef.current?.reset();
      } else {
        setToast({ msg: result.error ?? '오류가 발생했습니다.', ok: false });
      }
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
          fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14,
          borderRadius: 3, zIndex: 1000, whiteSpace: 'nowrap',
          animation: 'fadein 0.3s ease',
        }}>
          {toast.msg}
        </div>
      )}

      {/* ── 페이지 래퍼 ─────────────────────────────── */}
      <div className="rsv-wrap">

        {/* ── 헤더 ─────────────────────────────────── */}
        <div className="rsv-header">
          <p style={{
            fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.35em',
            color: '#c8a96e', marginBottom: 16,
          }}>
            RESERVATION
          </p>
          <h1 style={{
            fontFamily: "'Noto Sans KR', sans-serif",
            fontSize: 'clamp(30px, 4.5vw, 52px)',
            fontWeight: 300, color: '#fff', marginBottom: 28, lineHeight: 1.2,
          }}>
            예약
          </h1>

          {/* 부가 설명 */}
          <div style={{ borderLeft: '2px solid rgba(200,169,110,0.5)', paddingLeft: 20 }}>
            <p className="rsv-subtitle" style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              color: '#c8a96e', lineHeight: 2.1,
              letterSpacing: '0.03em', margin: 0,
            }}>
              영업시간: 11:00 ~ 22:00 (쉬는시간 없읍니다)<br />
              예약은 방문시간 외 불가합니다<br />
              <span style={{ color: 'rgba(200,169,110,0.6)' }}>단체예약은 전화문의바랍니다</span>
            </p>
          </div>
        </div>

        {/* 구분선 */}
        <div style={{
          width: '100%', height: 1,
          background: 'linear-gradient(90deg, rgba(200,169,110,0.35) 0%, rgba(200,169,110,0.08) 60%, transparent 100%)',
          margin: 'clamp(40px, 6vh, 80px) 0',
        }} />

        {/* ── 2단 그리드 ──────────────────────────── */}
        <div className="rsv-grid">

          {/* ── 예약 폼 ─────────────────────────────── */}
          <form ref={formRef} onSubmit={handleSubmit} className="rsv-form">
            <div>
              <label className="rsv-label" style={labelBase}>이름 *</label>
              <input name="name" required
                className="rsv-input" style={inputBase}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>

            <div>
              <label className="rsv-label" style={labelBase}>연락처 *</label>
              <input
                name="phone" required type="tel"
                placeholder="숫자만 입력하세요"
                value={phone} onChange={handlePhoneChange}
                className="rsv-input" style={inputBase}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>

            <div className="rsv-dt-row">
              <div>
                <label className="rsv-label" style={labelBase}>방문 날짜 *</label>
                <input name="date" required type="date"
                  min={minDate}
                  max={maxDate}
                  className="rsv-input" style={{ ...inputBase, colorScheme: 'dark' }}
                  onFocus={onFocus} onBlur={onBlur}
                />
              </div>
              <div>
                <label className="rsv-label" style={labelBase}>방문 시간 *</label>
                <select name="time" required
                  className="rsv-input" style={{ ...inputBase, cursor: NORIGAE_CURSOR }}
                >
                  <option value="" style={{ background: '#1a1a1a' }}>시간 선택</option>
                  {TIME_SLOTS.map(t => (
                    <option key={t} value={t} style={{ background: '#1a1a1a' }}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="rsv-label" style={labelBase}>인원 *</label>
              <select name="party_size" required
                className="rsv-input" style={{ ...inputBase, cursor: NORIGAE_CURSOR }}
              >
                <option value="" style={{ background: '#1a1a1a' }}>인원 선택</option>
                {PARTY_SIZES.map(n => (
                  <option key={n} value={n} style={{ background: '#1a1a1a' }}>{n}명</option>
                ))}
              </select>
            </div>

            <div>
              <label className="rsv-label" style={labelBase}>요청 사항</label>
              <textarea name="notes" rows={5}
                placeholder="알레르기, 기념일 등"
                className="rsv-input" style={{ ...inputBase, resize: 'vertical' }}
                onFocus={onFocus} onBlur={onBlur}
              />
            </div>

            <button
              type="submit" disabled={isPending}
              style={{
                marginTop: 8, padding: '18px',
                background: isPending ? 'rgba(200,169,110,0.4)' : '#c8a96e',
                color: '#000', fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 15, fontWeight: 700, border: 'none', borderRadius: 2,
                cursor: isPending ? 'wait' : NORIGAE_CURSOR,
                letterSpacing: '0.12em', transition: 'background 0.2s', width: '100%',
              }}
            >
              {isPending ? '접수 중...' : '예약 신청'}
            </button>
          </form>

          {/* ── 찾아오는 길 ──────────────────────────── */}
          <div className="rsv-location">
            <div style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em',
                color: '#c8a96e', marginBottom: 12,
              }}>
                LOCATION
              </p>
              <h2 style={{
                fontFamily: "'Noto Sans KR', sans-serif",
                fontSize: 'clamp(20px, 2.5vw, 30px)',
                fontWeight: 300, color: '#fff', margin: 0,
              }}>
                찾아오는 길
              </h2>
            </div>

            {/* 구글맵 */}
            <div className="rsv-map" style={{
              borderRadius: 4, overflow: 'hidden',
              border: '1px solid rgba(200,169,110,0.2)',
              marginBottom: 28,
            }}>
              <iframe
                src="https://maps.google.com/maps?q=37.4857761,127.0310138&output=embed&z=18&hl=ko"
                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                title="옥된장 양재점 지도"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* 주소 정보 카드 */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 18,
              padding: '24px 22px',
              border: '1px solid rgba(200,169,110,0.12)',
              borderRadius: 4,
              background: 'rgba(255,255,255,0.02)',
            }}>
              {[
                { label: '주소',   value: '서울 서초구 서운로 6길 29, 1층' },
                { label: '영업시간', value: '11:00 ~ 22:00 (쉬는시간 없읍니다)' },
                { label: '주차',   value: '양지주차장 이용(유료주차) 주차가 불가합니다' },
                { label: '문의',   value: '070-8657-2499' },
              ].map(({ label, value }) => (
                <div key={label} className="rsv-info-row">
                  <span className="rsv-info-label" style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    color: '#c8a96e', flexShrink: 0,
                    letterSpacing: '0.05em',
                  }}>
                    {label}
                  </span>
                  <span className="rsv-info-value" style={{
                    fontFamily: "'Noto Sans KR', sans-serif",
                    color: 'rgba(255,255,255,0.65)', lineHeight: 1.65,
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
        /* ── 기본(데스크탑) ──────────────────────── */
        .rsv-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: clamp(100px, 12vh, 140px) clamp(48px, 9vw, 140px) 140px;
        }
        .rsv-header { margin-bottom: clamp(40px, 6vh, 72px); }
        .rsv-subtitle { font-size: 19px; }

        .rsv-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: clamp(60px, 10vw, 160px);
          align-items: start;
        }
        .rsv-form {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .rsv-dt-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .rsv-location {
          display: flex;
          flex-direction: column;
        }
        .rsv-map {
          width: 100%;
          aspect-ratio: 16 / 10;
        }
        .rsv-input  { font-size: 24px; }
        .rsv-label  { font-size: 22px; }
        .rsv-info-row {
          display: flex;
          gap: 20px;
          align-items: baseline;
        }
        .rsv-info-label { font-size: 18px; min-width: 76px; }
        .rsv-info-value { font-size: 19px; }

        /* ── 태블릿 (≤ 900px) ─────────────────── */
        @media (max-width: 900px) {
          .rsv-grid {
            grid-template-columns: 1fr;
            gap: 64px;
          }
          .rsv-map { aspect-ratio: 4 / 3; }
        }

        /* ── 모바일 (≤ 640px) ─────────────────── */
        @media (max-width: 640px) {
          .rsv-wrap {
            padding: 88px 20px 80px;
          }
          .rsv-subtitle { font-size: 14px; }
          .rsv-form     { gap: 24px; }
          /* 16px 미만이면 iOS Safari가 자동 줌 — 최소 16px 유지 */
          .rsv-input    { font-size: 16px !important; padding: 13px 14px !important; }
          .rsv-label    { font-size: 13px !important; margin-bottom: 8px !important; }
          .rsv-info-label { font-size: 13px; min-width: 60px; }
          .rsv-info-value { font-size: 14px; }
          .rsv-map { aspect-ratio: 4 / 3; }
        }

        /* ── 소형 모바일 (≤ 400px) ────────────── */
        @media (max-width: 400px) {
          .rsv-dt-row {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .rsv-info-row { flex-direction: column; gap: 4px; }
          .rsv-info-label { min-width: unset; }
        }

        /* ── 공통 ─────────────────────────────── */
        @keyframes fadein {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
        select option { background: #1a1a1a; }
      `}</style>
    </main>
  );
}
