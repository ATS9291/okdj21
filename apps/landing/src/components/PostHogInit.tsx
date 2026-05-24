'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

export default function PostHogInit() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';

    if (!key || posthog.__loaded) return;

    posthog.init(key, {
      api_host: host,
      person_profiles: 'always',
      autocapture: true,
    });
  }, []);

  return null;
}
