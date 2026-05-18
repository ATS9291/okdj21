'use client';

import { useEffect, useState, useTransition } from 'react';
import type { Reservation } from '@/lib/supabase';
import { supabase } from '@/lib/supabase';
import { updateReservationStatus } from '@/app/actions';

const STATUS_LABEL: Record<string, string> = { pending: '대기', confirmed: '확정', cancelled: '취소' };
const STATUS_COLOR: Record<string, string> = { pending: '#c8a96e', confirmed: '#6ec87a', cancelled: '#e06060' };

const cell: React.CSSProperties = {
  padding: '14px 16px',
  fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
  color: 'rgba(255,255,255,0.75)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
  verticalAlign: 'middle',
};
const input: React.CSSProperties = {
  padding: '9px 12px', background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,169,110,0.25)', borderRadius: 3,
  color: '#fff', fontFamily: "'Noto Sans KR', sans-serif", fontSize: 13,
  outline: 'none', colorScheme: 'dark' as React.CSSProperties['colorScheme'],
};

export default function ReservationsPage() {
  const [rows, setRows] = useState<Reservation[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [isPending, startTransition] = useTransition();

  const load = async (date: string) => {
    let q = supabase.from('reservations').select('*').order('date').order('time');
    if (date) q = q.eq('date', date);
    const { data } = await q;
    setRows(data ?? []);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      let q = supabase.from('reservations').select('*').order('date').order('time');
      if (dateFilter) q = q.eq('date', dateFilter);
      const { data } = await q;
      if (!cancelled) setRows(data ?? []);
    })();
    return () => { cancelled = true; };
  }, [dateFilter]);

  const changeStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    startTransition(async () => {
      await updateReservationStatus(id, status);
      await load(dateFilter);
    });
  };

  return (
    <>
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: 11, letterSpacing: '0.3em', color: '#c8a96e', marginBottom: 8 }}>RESERVATIONS</p>
        <h1 style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 24, fontWeight: 300, color: '#fff' }}>예약 관리</h1>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 28 }}>
        <input type="date" value={dateFilter} onChange={e => setDateFilter(e.target.value)} style={input} />
        {dateFilter && (
          <button onClick={() => setDateFilter('')} style={{
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.35)', fontSize: 12, cursor: 'pointer',
            fontFamily: "'Noto Sans KR', sans-serif",
          }}>
            초기화
          </button>
        )}
        <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.3)', marginLeft: 'auto' }}>
          총 {rows.length}건
        </span>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 4 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
              {['날짜', '시간', '이름', '연락처', '인원', '상태', '요청사항', '관리'].map(h => (
                <th key={h} style={{
                  ...cell, color: 'rgba(255,255,255,0.3)', fontSize: 11,
                  letterSpacing: '0.1em', fontWeight: 400, textAlign: 'left',
                  borderBottom: '1px solid rgba(200,169,110,0.15)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ ...cell, textAlign: 'center', padding: 56, color: 'rgba(255,255,255,0.2)' }}>
                  예약 없음
                </td>
              </tr>
            ) : rows.map(r => (
              <tr key={r.id} style={{ transition: 'background 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={cell}>{r.date}</td>
                <td style={cell}>{r.time}</td>
                <td style={cell}>{r.name}</td>
                <td style={cell}>{r.phone}</td>
                <td style={cell}>{r.party_size}명</td>
                <td style={cell}>
                  <span style={{ color: STATUS_COLOR[r.status], fontSize: 12, fontWeight: 600 }}>
                    {STATUS_LABEL[r.status]}
                  </span>
                </td>
                <td style={{ ...cell, maxWidth: 200, color: 'rgba(255,255,255,0.4)' }}>{r.notes ?? '-'}</td>
                <td style={cell}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {r.status !== 'confirmed' && (
                      <button onClick={() => changeStatus(r.id, 'confirmed')} disabled={isPending} style={{
                        padding: '4px 10px', background: 'rgba(110,200,122,0.1)',
                        border: '1px solid rgba(110,200,122,0.35)', color: '#6ec87a',
                        fontSize: 11, cursor: 'pointer', borderRadius: 2,
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}>확정</button>
                    )}
                    {r.status !== 'cancelled' && (
                      <button onClick={() => changeStatus(r.id, 'cancelled')} disabled={isPending} style={{
                        padding: '4px 10px', background: 'rgba(224,96,96,0.1)',
                        border: '1px solid rgba(224,96,96,0.35)', color: '#e06060',
                        fontSize: 11, cursor: 'pointer', borderRadius: 2,
                        fontFamily: "'Noto Sans KR', sans-serif",
                      }}>취소</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
