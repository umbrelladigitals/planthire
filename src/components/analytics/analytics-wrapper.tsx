import { getGoogleAnalyticsSettings } from "@/lib/settings";
import { GoogleAnalytics } from "./google-analytics";

/**
 * Analytics servisleri için bir wrapper komponent.
 * Server component olduğu için veritabanından ayarları doğrudan alabilir.
 */
export async function AnalyticsWrapper() {
  const { trackingId, enabled } = await getGoogleAnalyticsSettings();
  
  // Google Analytics etkin değilse veya ID yoksa gösterme
  if (!enabled || !trackingId) {
    return null;
  }
  
  return <GoogleAnalytics trackingId={trackingId} />;
} 