import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatomoTracker, MatomoInjector } from 'ngx-matomo-revived';

/**
 * Main component of the demo application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  /**
   * Creates an instance of AppComponent.
   *
   * @param matomoInjector Instance of MatomoInjector provided by DI.
   * @param matomoTracker Instance of MatomoTracker provided by DI.
   */
  constructor(private matomoInjector: MatomoInjector, private matomoTracker: MatomoTracker) {
    this.matomoInjector.init();
  }

  /**
   * OnInit lifecycle hook
   */
  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngx-matomo-revived Test');
  }

  /**
   * AfterViewInit lifecycle hook
   */
  ngAfterViewInit() {
    this.matomoTracker.trackPageView('It Works!');
    this.matomoTracker.trackEvent('category', 'action', 'name', 1);

    this.matomoTracker.getUserId().then((userId: string) => console.log('User ID:', userId));
    this.matomoTracker.getVisitorId().then((visitorId: string) => console.log('Visitor ID:', visitorId));
    this.matomoTracker.getVisitorInfo().then((visitorInfo: string[]) => console.log('Visitor Info:', visitorInfo));
    this.matomoTracker.hasCookies().then((hasCookies: boolean) => console.log('Has Cookies:', hasCookies));
  }
}
