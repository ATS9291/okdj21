'use client';

import { useState, useTransition } from 'react';
import { adminLogin } from '@/app/actions/admin';

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(200,169,110,0.3)',
  borderRadius: 3, color: '#fff',
  fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
};

export default function AdminLoginPage() {
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await adminLogin(fd);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <main style={{
      background: '#0a0a0a', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ width: '100%', maxWidth: 360, padding: '0 24px' }}>
        <h1 style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 22, fontWeight: 500, color: '#c8a96e',
          marginBottom: 8, textAlign: 'center',
        }}>
          옥된장 어드민
        </h1>
        <p style={{
          fontFamily: "'Noto Sans KR', sans-serif",
          fontSize: 12, color: 'rgba(255,255,255,0.3)',
          textAlign: 'center', marginBottom: 40,
        }}>
          관리자 전용 페이지
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            name="password" type="password" required
            placeholder="비밀번호"
            style={inputStyle}
          />
          {error && (
            <p style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 12, color: '#e06060' }}>
              {error}
            </p>
          )}
          <button type="submit" disabled={isPending} style={{
            padding: '14px', background: '#c8a96e', color: '#000',
            fontFamily: "'Noto Sans KR', sans-serif", fontSize: 14, fontWeight: 700,
            border: 'none', cursor: isPending ? 'wait' : 'pointer',
            borderRadius: 3,
          }}>
            {isPending ? '확인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </main>
  );
}
