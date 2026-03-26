import { logEvent as firebaseLogEvent, setUserProperties } from 'firebase/analytics';
import { analytics } from '../firebase';

/**
 * Logs a custom event to Google Analytics 4.
 * Safely handles the async initialization of the Analytics SDK.
 */
export const logAnalyticsEvent = async (eventName: string, eventParams?: Record<string, unknown>) => {
  try {
    const instance = await analytics;
    if (instance) {
      firebaseLogEvent(instance, eventName, eventParams);
      if (import.meta.env.DEV) {
        console.log(`[GA4 EVENT] ${eventName}`, eventParams);
      }
    }
  } catch (error) {
    // Fail silently in production, log in dev
    if (import.meta.env.DEV) {
      console.error('GA4 Event failed:', error);
    }
  }
};

/**
 * Sets user properties for the current session.
 */
export const setAnalyticsUserProperty = async (properties: Record<string, unknown>) => {
  try {
    const instance = await analytics;
    if (instance) {
      setUserProperties(instance, properties);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('GA4 User Property failed:', error);
    }
  }
};
