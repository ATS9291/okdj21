'use client';

import { useState } from 'react';

export function ErrorTrigger() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (process.env.NODE_ENV !== 'development') return null;

  if (shouldThrow) {
    throw new Error('글로벌 에러 바운더리 테스트');
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 28,
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.25)',
        color: 'rgba(255,255,255,0.5)',
        padding: '0.5rem 1.2rem',
        fontSize: '0.7rem',
        letterSpacing: '0.12em',
        cursor: 'pointer',
        fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
        zIndex: 300,
        transition: 'border-color 0.2s, color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
        e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
      }}
    >
      에러 테스트
    </button>
  );
}
