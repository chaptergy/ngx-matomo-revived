import { InjectionToken } from '@angular/core';

/**
 * Matomo module configuration interface.
 */
export interface MatomoModuleConfiguration {
  /**
   * Array of trackers, each one of them being described by its URL and site id.
   */
  trackers: Tracker[];
  /**
   * URL of the Matomo JS script to execute. If none is given, the url of the first tracker will be used.
   */
  scriptUrl?: string;
  /**
   * If set to true, automatically track the app being started.
   */
  trackAppStarting?: boolean;
  /**
   * If set to true, link will be automatically tracked on the first page (if enabled).
   */
  enableLinkTracking?: boolean;
  /**
   * When link tracking has been enabled, this sets the value to the call to `enableLinkTracking`
   */
  enableLinkTrackingValue?: boolean;
  /**
   * If set to true, user consent is required.
   */
  isConsentRequired?: boolean;
}

/**
 * Representing a Matomo instance
 */
export interface Tracker {
  trackerUrl: string;
  siteId: number;
}

/**
 * Injection token for Matomo configuration.
 */
export const MATOMO_CONFIGURATION = new InjectionToken<MatomoModuleConfiguration>('MATOMO_CONFIGURATION');

/**
 * Default configuration for the Matomo module.
 */
export const defaultConfiguration: Partial<MatomoModuleConfiguration> = {
  trackers: [],
  trackAppStarting: true,
  enableLinkTracking: true,
  enableLinkTrackingValue: false,
  isConsentRequired: false,
};
