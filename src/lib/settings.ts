import { db } from "./db";
import { AuditLogAction } from "./audit-types";
import { createAuditLog } from "./audit";

// Keys for site settings
export const SETTINGS_KEYS = {
  // Google Analytics
  GOOGLE_ANALYTICS_ID: "google_analytics_id",
  GOOGLE_ANALYTICS_ENABLED: "google_analytics_enabled",
  
  // General site information
  SITE_NAME: "site_name",
  SITE_DESCRIPTION: "site_description",
  
  // Contact information
  CONTACT_EMAIL: "contact_email",
  CONTACT_PHONE: "contact_phone",
  CONTACT_ADDRESS: "contact_address",
  
  // Social media
  SOCIAL_FACEBOOK: "social_facebook",
  SOCIAL_INSTAGRAM: "social_instagram",
  SOCIAL_TWITTER: "social_twitter",
  SOCIAL_LINKEDIN: "social_linkedin",
};

export type SettingKey = keyof typeof SETTINGS_KEYS;
export type SettingCategory = "analytics" | "general" | "contact" | "social";

/**
 * Get a specific setting
 */
export async function getSetting(key: string): Promise<string | null> {
  // Build sırasında veritabanı erişimini atlamak için ortam değişkenini kontrol et
  if (process.env.SKIP_DATABASE_ACCESS_ON_BUILD === 'true') {
    // Build sırasında sahte veya varsayılan değerler döndür (isteğe bağlı)
    // Eğer build sırasında bu ayarların gerçek değerlerine ihtiyacınız YOKSA
    // Örnek: Sadece metadata için placeholder değerler döndür
    switch (key) {
      case SETTINGS_KEYS.SITE_NAME:
        return "Varsayılan Site Adı";
      case SETTINGS_KEYS.SITE_DESCRIPTION:
        return "Varsayılan Site Açıklaması";
      // Diğer ayarlar için varsayılan null veya başka bir değer
      default:
        return null;
    }
  }

  // Normal çalışma zamanında veritabanından çek
  const setting = await db.siteSettings.findUnique({
    where: { key },
  });

  return setting?.value || null;
}

/**
 * Get settings by category
 */
export async function getSettingsByCategory(category: SettingCategory): Promise<Record<string, string | null>> {
  const settings = await db.siteSettings.findMany({
    where: { category },
  });
  
  // Explicitly type accumulator and setting parameters
  return settings.reduce<Record<string, string | null>>((acc: Record<string, string | null>, setting: { key: string; value: string | null }) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
}

/**
 * Update or create a setting
 */
export async function upsertSetting(key: string, value: string, description?: string, category?: SettingCategory) {
  const result = await db.siteSettings.upsert({
    where: { key },
    update: { value, description, category },
    create: { key, value, description, category },
  });

  // Tek bir ayar güncellendiğinde audit log oluştur
  await createAuditLog({
    action: AuditLogAction.SETTINGS_UPDATED,
    details: { 
      category: category || 'general',
      key,
      newValue: value
    }
  });

  return result;
}

/**
 * Update multiple settings
 */
export async function updateSettings(settings: { key: string; value: string; description?: string; category?: SettingCategory }[]) {
  const updates = settings.map(setting => 
    db.siteSettings.upsert({
      where: { key: setting.key },
      update: { 
        value: setting.value,
        description: setting.description,
        category: setting.category 
      },
      create: { 
        key: setting.key, 
        value: setting.value,
        description: setting.description,
        category: setting.category 
      },
    })
  );
  
  const results = await Promise.all(updates);

  // Çoklu ayar güncellendiğinde audit log oluştur
  if (settings.length > 0) {
    await createAuditLog({
      action: AuditLogAction.SETTINGS_UPDATED,
      details: { 
        category: settings[0].category || 'multiple',
        settingsChanged: settings.map(s => s.key)
      }
    });
  }
  
  return results;
}

// --- Google Analytics Settings --- 
/**
 * Helper functions for Google Analytics
 */
export async function getGoogleAnalyticsSettings() {
  const [trackingId, enabled] = await Promise.all([
    getSetting(SETTINGS_KEYS.GOOGLE_ANALYTICS_ID),
    getSetting(SETTINGS_KEYS.GOOGLE_ANALYTICS_ENABLED),
  ]);
  
  return {
    trackingId,
    enabled: enabled === 'true',
  };
}

/**
 * Update Google Analytics settings
 */
export async function updateGoogleAnalyticsSettings(trackingId: string, enabled: boolean) {
  await updateSettings([
    {
      key: SETTINGS_KEYS.GOOGLE_ANALYTICS_ID,
      value: trackingId,
      description: "Google Analytics Measurement ID",
      category: "analytics",
    },
    {
      key: SETTINGS_KEYS.GOOGLE_ANALYTICS_ENABLED,
      value: String(enabled),
      description: "Is Google Analytics enabled?",
      category: "analytics",
    },
  ]);
}

// --- General Site Settings --- 
export async function getGeneralSettings() {
  const [siteName, siteDescription] = await Promise.all([
    getSetting(SETTINGS_KEYS.SITE_NAME),
    getSetting(SETTINGS_KEYS.SITE_DESCRIPTION),
  ]);
  return { siteName, siteDescription };
}

export async function updateGeneralSettings(siteName: string, siteDescription: string) {
  await updateSettings([
    {
      key: SETTINGS_KEYS.SITE_NAME,
      value: siteName,
      description: "The name of the website, displayed in the title bar and other places.",
      category: "general",
    },
    {
      key: SETTINGS_KEYS.SITE_DESCRIPTION,
      value: siteDescription,
      description: "A brief description of the website for SEO and metadata.",
      category: "general",
    },
  ]);
}

// --- Social Media Settings --- 
export async function getSocialMediaSettings() {
  const [facebook, instagram, twitter, linkedin] = await Promise.all([
    getSetting(SETTINGS_KEYS.SOCIAL_FACEBOOK),
    getSetting(SETTINGS_KEYS.SOCIAL_INSTAGRAM),
    getSetting(SETTINGS_KEYS.SOCIAL_TWITTER),
    getSetting(SETTINGS_KEYS.SOCIAL_LINKEDIN),
  ]);
  return { facebook, instagram, twitter, linkedin };
}

export async function updateSocialMediaSettings(urls: {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}) {
  const settingsToUpdate = [];
  if (urls.facebook !== undefined) settingsToUpdate.push({
    key: SETTINGS_KEYS.SOCIAL_FACEBOOK,
    value: urls.facebook,
    description: "URL of the Facebook page.",
    category: "social" as SettingCategory,
  });
  if (urls.instagram !== undefined) settingsToUpdate.push({
    key: SETTINGS_KEYS.SOCIAL_INSTAGRAM,
    value: urls.instagram,
    description: "URL of the Instagram profile.",
    category: "social" as SettingCategory,
  });
  if (urls.twitter !== undefined) settingsToUpdate.push({
    key: SETTINGS_KEYS.SOCIAL_TWITTER,
    value: urls.twitter,
    description: "URL of the Twitter profile.",
    category: "social" as SettingCategory,
  });
  if (urls.linkedin !== undefined) settingsToUpdate.push({
    key: SETTINGS_KEYS.SOCIAL_LINKEDIN,
    value: urls.linkedin,
    description: "URL of the LinkedIn profile.",
    category: "social" as SettingCategory,
  });

  if (settingsToUpdate.length > 0) {
    await updateSettings(settingsToUpdate.map(s => ({...s, value: s.value || ''})));
  }
} 