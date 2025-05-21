'use client';

import { GoogleTagManager } from '@next/third-parties/google';

interface GoogleAnalyticsProps {
  trackingId: string;
}

/**
 * Google Analytics entegrasyonu için bileşen
 */
export function GoogleAnalytics({ trackingId }: GoogleAnalyticsProps) {
  if (!trackingId) return null;
  
  // Google Tag Manager (GTM) kullanıyoruz - daha modern ve esnek
  return <GoogleTagManager gtmId={trackingId} />;
} 