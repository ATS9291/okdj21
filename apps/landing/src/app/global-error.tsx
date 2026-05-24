'use client';

import { useEffect, useRef } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reported = useRef(false);

  useEffect(() => {
    if (reported.current) return;
    reported.current = true;

    fetch('/api/error-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        digest: error.digest,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    }).catch(() => {});
  }, [error]);

  return (
    <html lang="ko">
      <body
        style={{
          margin: 0,
          backgroundColor: '#fffdf9',
          color: '#1a1a1a',
          fontFamily: "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '420px', width: '100%' }}>

          {/* 경고 아이콘 */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              backgroundColor: '#fff3cd',
              border: '2px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 2rem',
              fontSize: '28px',
              lineHeight: 1,
            }}
          >
            ⚠️
          </div>

          <p
            style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#d97706',
              marginBottom: '0.75rem',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            오류 발생
          </p>

          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: '0 0 1rem',
              color: '#111',
            }}
          >
            옥된장
          </h1>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#555',
              marginBottom: '2.5rem',
              lineHeight: 1.8,
            }}
          >
            예기치 않은 오류가 발생했습니다.
            <br />
            불편을 드려 죄송합니다.
          </p>

          {error.digest && (
            <p
              style={{
                fontSize: '0.7rem',
                color: '#aaa',
                marginBottom: '2rem',
                fontFamily: 'monospace',
                backgroundColor: '#f5f5f5',
                padding: '6px 12px',
                borderRadius: '4px',
                display: 'inline-block',
              }}
            >
              {error.digest}
            </p>
          )}

          <button
            onClick={reset}
            style={{
              background: '#f59e0b',
              border: 'none',
              color: '#fff',
              padding: '0.8rem 2.5rem',
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              fontWeight: 600,
              cursor: 'pointer',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#d97706'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f59e0b'; }}
          >
            다시 시도
          </button>

        </div>
      </body>
    </html>
  );
}
