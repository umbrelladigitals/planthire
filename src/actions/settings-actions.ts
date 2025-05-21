'use server';

import { revalidatePath } from "next/cache";
import {
  getGoogleAnalyticsSettings,
  updateGoogleAnalyticsSettings,
  getGeneralSettings,
  updateGeneralSettings,
  getSocialMediaSettings,
  updateSocialMediaSettings,
  SETTINGS_KEYS
} from "@/lib/settings";
import { AuditLogAction } from "@/lib/audit-types";
import { createAuditLog } from "@/lib/audit";

/**
 * Server action to get Google Analytics settings
 */
export async function getGoogleAnalyticsSettingsAction() {
  try {
    const settings = await getGoogleAnalyticsSettings();
    return { 
      success: true, 
      data: settings 
    };
  } catch (error) {
    console.error("Error fetching Google Analytics settings:", error);
    return { 
      success: false, 
      error: "Error fetching settings."
    };
  }
}

/**
 * Server action to update Google Analytics settings
 */
export async function updateGoogleAnalyticsSettingsAction(formData: FormData) {
  try {
    const trackingId = formData.get('trackingId') as string;
    const enabled = formData.get('enabled') === 'true';
    
    await updateGoogleAnalyticsSettings(trackingId, enabled);
    
    await createAuditLog({
      action: AuditLogAction.SETTINGS_UPDATED,
      details: { 
        category: 'Analytics', 
        updatedKeys: [SETTINGS_KEYS.GOOGLE_ANALYTICS_ID, SETTINGS_KEYS.GOOGLE_ANALYTICS_ENABLED],
        trackingId, 
        enabled 
      }
    });

    revalidatePath('/panel/settings');
    revalidatePath('/');
    
    return { 
      success: true 
    };
  } catch (error) {
    console.error("Error updating Google Analytics settings:", error);
    return { 
      success: false, 
      error: "Error updating settings."
    };
  }
}

/**
 * Server action to get general settings
 */
export async function getGeneralSettingsAction() {
  try {
    const settings = await getGeneralSettings();
    return { 
      success: true, 
      data: settings 
    };
  } catch (error) {
    console.error("Error fetching general settings:", error);
    return { 
      success: false, 
      error: "Error fetching general settings."
    };
  }
}

/**
 * Server action to update general settings
 */
export async function updateGeneralSettingsAction(formData: FormData) {
  try {
    const siteName = formData.get('siteName') as string;
    const siteDescription = formData.get('siteDescription') as string;
    
    await updateGeneralSettings(siteName, siteDescription);

    await createAuditLog({
      action: AuditLogAction.SETTINGS_UPDATED,
      details: { 
        category: 'General', 
        updatedKeys: [SETTINGS_KEYS.SITE_NAME, SETTINGS_KEYS.SITE_DESCRIPTION],
        siteName, 
        siteDescription 
      }
    });
    
    revalidatePath('/panel/settings');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Error updating general settings:", error);
    return { 
      success: false, 
      error: "Error updating general settings."
    };
  }
}

/**
 * Server action to get social media settings
 */
export async function getSocialMediaSettingsAction() {
  try {
    const settings = await getSocialMediaSettings();
    return { 
      success: true, 
      data: settings 
    };
  } catch (error) {
    console.error("Error fetching social media settings:", error);
    return { 
      success: false, 
      error: "Error fetching social media settings."
    };
  }
}

/**
 * Server action to update social media settings
 */
export async function updateSocialMediaSettingsAction(formData: FormData) {
  try {
    const facebook = formData.get('facebook') as string;
    const instagram = formData.get('instagram') as string;
    const twitter = formData.get('twitter') as string;
    const linkedin = formData.get('linkedin') as string;
    
    await updateSocialMediaSettings({ facebook, instagram, twitter, linkedin });

    await createAuditLog({
      action: AuditLogAction.SETTINGS_UPDATED,
      details: { 
        category: 'Social Media', 
        updatedKeys: [
          SETTINGS_KEYS.SOCIAL_FACEBOOK, 
          SETTINGS_KEYS.SOCIAL_INSTAGRAM, 
          SETTINGS_KEYS.SOCIAL_TWITTER, 
          SETTINGS_KEYS.SOCIAL_LINKEDIN
        ],
        urls: { facebook, instagram, twitter, linkedin } 
      }
    });
    
    revalidatePath('/panel/settings');
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error("Error updating social media settings:", error);
    return { 
      success: false, 
      error: "Error updating social media settings."
    };
  }
} 