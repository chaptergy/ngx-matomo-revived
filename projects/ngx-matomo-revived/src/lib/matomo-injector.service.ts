import { Inject, Injectable } from '@angular/core';
import { MatomoModuleConfiguration, MATOMO_CONFIGURATION } from './matomo-configuration';

/**
 * Access to the global window variable.
 */
declare const window: {
  [key: string]: any;
  _paq: any[];
  prototype: Window;
  new (): Window;
};

/**
 * Service for injecting the Matomo tracker in the application.
 * This service shall no longer be used directly within an application.
 */
@Injectable()
export class MatomoInjector {
  /**
   * Creates an instance of MatomoInjector.
   *
   * @param configuration Matomo configuration provided by DI.
   */
  constructor(@Inject(MATOMO_CONFIGURATION) private readonly configuration: MatomoModuleConfiguration) {
    try {
      window._paq = window._paq || [];
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Injects the Matomo tracker in the DOM.
   */
  init() {
    try {
      if (this.configuration?.isConsentRequired === true) {
        this.pushOrOverwrite('requireConsent', []);
      }
      if (this.configuration?.trackAppStarting === true) {
        this.pushOrOverwrite('trackPageView', []);
        if (this.configuration?.enableLinkTracking === true) {
          setTimeout(() => {
            this.pushOrOverwrite('enableLinkTracking', [this.configuration?.enableLinkTrackingValue ?? false]);
          }, 0);
        }
      }
      switch (this.configuration.trackers.length) {
        case 0:
          throw new Error('No Matomo trackers were specified! At least one is required.');
        case 1:
          const mainTracker = this.configuration.trackers[0];
          this.validateTracker(mainTracker, 0);
          this.pushOrOverwrite('setTrackerUrl', [mainTracker.trackerUrl]);
          this.pushOrOverwrite('setSiteId', [mainTracker.siteId.toString()]);
        // falls through
        default:
          this.configuration.trackers.slice(1).forEach((tracker, index) => {
            this.validateTracker(tracker, index + 1);
            window._paq.push(['addTracker', tracker.trackerUrl, tracker.siteId.toString()]);
          });
      }
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = this.configuration.scriptUrl;
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Validate, that a tracker contains valid data
   * @param tracker The tracker to check
   * @param index The index of the tracker used for the error message
   */
  private validateTracker(tracker: MatomoModuleConfiguration['trackers'][0], index: number = 0) {
    // If the tracker is falsy, it is invalid
    if (!tracker.trackerUrl) {
      throw new Error(`Matomo tracker at index ${index} has the invalid url '${tracker.trackerUrl}'`);
    }
    // If the site id is nullish, it is invalid
    if (tracker.siteId == null) {
      throw new Error(`Matomo tracker at index ${index} has the invalid site id '${tracker.siteId}'`);
    }
  }

  /**
   * Push a value to _paq or overwrite it if it already exists
   */
  private pushOrOverwrite(key: string, args: any[]) {
    // Find an existing value and delete it if it exists
    const existingIndex = window._paq.findIndex((value: any[]) => value[0] === key);
    if (existingIndex !== -1) {
      window._paq.splice(existingIndex, 1);
    }

    window._paq.push([key, ...args]);
  }
}
