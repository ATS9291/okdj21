'use client';

import posthog from 'posthog-js';
import { useEffect } from 'react';

interface Props {
  apiKey: string;
  apiHost: string;
}

export default function PostHogInit({ apiKey, apiHost }: Props) {
  useEffect(() => {
    if (!apiKey || posthog.__loaded) return;
    posthog.init(apiKey, {
      api_host: apiHost,
      person_profiles: 'always',
      autocapture: true,
    });
  }, [apiKey, apiHost]);

  return null;
}
