import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '옥된장 어드민', template: '%s | 옥된장 어드민' },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
