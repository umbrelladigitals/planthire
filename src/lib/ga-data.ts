'use server';

import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { getSetting, SETTINGS_KEYS } from './settings';

interface AnalyticsData {
  activeUsers: string;
  screenPageViews: string;
  lastUpdated: string;
}

interface GaError {
  error: string;
  message?: string; 
}

// JSON credentials'ın yapısını tanımla
interface ServiceAccountCredentials {
  client_email: string;
  private_key: string;
}

async function getGoogleAnalyticsData(): Promise<AnalyticsData | GaError> {
  try {
    const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;
    const propertyId = await getSetting(SETTINGS_KEYS.GOOGLE_ANALYTICS_ID);
    const gaEnabled = await getSetting(SETTINGS_KEYS.GOOGLE_ANALYTICS_ENABLED);

    if (gaEnabled !== 'true') {
      return { error: 'Google Analytics is not enabled in settings.' };
    }

    if (!rawCredentials) {
      console.error('Google service account credentials are not set in environment variables.');
      return { error: 'Google service account credentials are not set.' };
    }

    if (!propertyId) {
      console.error('Google Analytics Property ID (GA4) is not set in settings.');
      return { error: 'Google Analytics Property ID (GA4) is not set in settings.' };
    }

    let credentialsObj: ServiceAccountCredentials;
    try {
      credentialsObj = JSON.parse(rawCredentials) as ServiceAccountCredentials;
      // JSON.parse sonrası private_key'deki \n karakterlerini gerçek newline'a çevir
      credentialsObj.private_key = credentialsObj.private_key.replace(/\\n/g, '\n');
    } catch (e) {
      console.error('Failed to parse Google service account credentials:', e);
      return { error: 'Failed to parse Google service account credentials.' };
    }

    const analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: {
        client_email: credentialsObj.client_email,
        private_key: credentialsObj.private_key,
      },
    });

    const [response] = await analyticsDataClient.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [
        {
          startDate: '7daysAgo',
          endDate: 'today',
        },
      ],
      metrics: [
        {
          name: 'activeUsers',
        },
        {
          name: 'screenPageViews',
        },
      ],
    });

    let activeUsers = '0';
    let screenPageViews = '0';

    response.rows?.forEach(row => {
      if (row.metricValues && row.metricValues[0]) {
        activeUsers = row.metricValues[0].value || '0';
      }
      if (row.metricValues && row.metricValues[1]) {
        screenPageViews = row.metricValues[1].value || '0';
      }
    });
    
    // GA4 API bazen tek bir satırda tüm metrikleri dönebilir, bu yüzden ilk satırı kontrol etmek yeterli olabilir.
    // Ancak, API'nin gelecekteki davranışlarına karşı daha esnek olmak için yukarıdaki döngüsel yaklaşım daha güvenlidir.
    // Eğer response.rows boş veya tanımsızsa, değerler '0' olarak kalacaktır.
    // Metriklerin sırası önemli. activeUsers ilk metrik, screenPageViews ikinci metrik varsayımıyla.
    if (response.rows && response.rows.length > 0 && response.rows[0].metricValues) {
        activeUsers = response.rows[0].metricValues[0]?.value ?? '0';
        screenPageViews = response.rows[0].metricValues[1]?.value ?? '0';
    }


    return {
      activeUsers,
      screenPageViews,
      lastUpdated: new Date().toLocaleTimeString('tr-TR'),
    };

  } catch (error: unknown) {
    console.error('Error fetching Google Analytics data:', error);
    // İzinlerle ilgili yaygın hataları yakalamaya çalışalım
    if (error instanceof Error && error.message) {
      if (error.message.includes('User does not have sufficient permissions')) {
        return {
          error: 'Permission Denied',
          message: 'The service account does not have sufficient permissions for the Google Analytics property. Please grant \'Viewer\' role to the service account in GA4 property settings.'
        };
      }
      if (error.message.includes('Google Analytics Data API has not been used in project') || error.message.includes('API not enabled')) {
        return {
          error: 'API Not Enabled',
          message: 'Google Analytics Data API v1 is not enabled for your Google Cloud project or has not been used yet. Please enable it in the Google Cloud Console.'
        };
      }
    }
    return { 
        error: 'Error fetching Google Analytics data.',
        message: error instanceof Error ? error.message : 'An unknown error occurred.'
    };
  }
}

export { getGoogleAnalyticsData }; 