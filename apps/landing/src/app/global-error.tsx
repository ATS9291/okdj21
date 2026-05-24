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
          backgroundColor: '#0a0a0a',
          color: '#f5f5f0',
          fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p
            style={{
              fontSize: '0.75rem',
              letterSpacing: '0.25em',
              color: '#555',
              marginBottom: '2.5rem',
              textTransform: 'uppercase',
            }}
          >
            오류 발생
          </p>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 300,
              letterSpacing: '0.12em',
              margin: '0 0 1.5rem',
            }}
          >
            옥된장
          </h1>
          <p
            style={{
              fontSize: '0.9rem',
              color: '#888',
              marginBottom: '3rem',
              lineHeight: 1.9,
            }}
          >
            예기치 않은 오류가 발생했습니다.
            <br />
            잠시 후 다시 시도해 주세요.
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: '0.7rem',
                color: '#444',
                marginBottom: '2.5rem',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
              }}
            >
              {error.digest}
            </p>
          )}
          <button
            onClick={reset}
            style={{
              background: 'transparent',
              border: '1px solid #444',
              color: '#f5f5f0',
              padding: '0.75rem 2.5rem',
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              cursor: 'pointer',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#aaa'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#444'; }}
          >
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
