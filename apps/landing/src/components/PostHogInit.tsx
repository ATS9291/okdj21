'use client';

import posthog from 'posthog-js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, Suspense } from 'react';

// 모듈 레벨 플래그 — posthog.__loaded(비공개 내부 API)보다 안정적
let posthogInitialized = false;

function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // 이전 경로를 기억해 실제 이동이 없는 경우(초기 마운트, Strict Mode 재마운트) 건너뜀
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    if (prevPathRef.current === currentPath) return;
    prevPathRef.current = currentPath;
    if (!posthogInitialized) return;
    posthog.capture('$pageview', { $current_url: window.location.href });
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key || posthogInitialized) return;

    posthogInitialized = true;
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      person_profiles: 'always',
      autocapture: true,
      capture_pageview: false,
    });

    posthog.capture('$pageview');
  }, []);

  return (
    <Suspense fallback={null}>
      <PageViewTracker />
    </Suspense>
  );
}
