# ngx-matomo-revived

[![NPM version](https://img.shields.io/npm/v/ngx-matomo-revived.svg)](https://www.npmjs.com/package/ngx-matomo-revived)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

Wrapper for Matomo (aka. Piwik) analytics tracker for applications based on Angular 11.
This is a fork based on [Arnaud73/ngx-matomo](https://github.com/Arnaud73/ngx-matomo)

## Installation

Use `npm` or `yarn` to add the module to your current project:

```
npm install --save ngx-matomo-revived
```

## Adding Matomo into to your Angular application

You can add Matomo either via script tag or using the MatomoInjector in your root component.

### Using the MatomoInjector

#### Include it in your application

Bootrapping this application is easy. Import `MatomoModule` into your root `NgModule`.

```ts
...
import { MatomoModule, MatomoModuleConfiguration, MATOMO_CONFIGURATION } from 'ngx-matomo-revived';

@NgModule({
  ...
  imports: [MatomoModule, ...],
  providers: [
    {
      provide: MATOMO_CONFIGURATION,
      useValue: {
        trackers: [{ trackerUrl: YOUR_MATOMO_URL, siteId: YOUR_SITE_ID }],
      } as MatomoModuleConfiguration,
    },
  ],
})
export class AppModule {}
```

### Initialize Matomo via root component and MatomoInjector service

To enable Matomo via your root component you can now inject the MatomoInjector in your root component.

```ts
import { Component } from '@angular/core';
import { MatomoInjector } from 'ngx-matomo-revived';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private matomoInjector: MatomoInjector) {
    this.matomoInjector.init();
  }
}
```

Once that's done you can import `MatomoTracker` into any component in your application.

```ts
// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo-revived';

@Component({
  selector: 'app',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private matomoTracker: MatomoTracker) {}

  ngOnInit() {
    this.matomoTracker.setUserId('UserId');
    this.matomoTracker.setDocumentTitle('ngx-matomo-revived Test');
  }
}
```

### Initialize Matomo via Script Tag

To illustrate the set up, here's the code to inject into your header to initialize Matomo in your application. Matomo's [site](https://developer.matomo.org/guides/tracking-javascript-guide) has the detailed documentation on how to set up communication between Matomo and your application.
Make sure you replace the $MATOMO_URL with your Matomo server and $SITE_ID with your site id.

```html
<!-- Matomo -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function () {
    var u = '//$MATOMO_URL/';
    _paq.push(['setTrackerUrl', u + 'matomo.php']);
    _paq.push(['setSiteId', $SIE_ID]);
    var d = document,
      g = d.createElement('script'),
      s = d.getElementsByTagName('script')[0];
    g.type = 'text/javascript';
    g.async = true;
    g.defer = true;
    g.src = u + 'matomo.js';
    s.parentNode.insertBefore(g, s);
  })();
</script>
<!-- End Matomo Code -->
```

## Tracking pages

To track pages automatically use the following code snippet in your `app.component.ts`:

```ts
...
export class AppComponent {

  constructor(
    private matomoTracker: MatomoTracker,
    private matomoInjector: MatomoInjector,
    private router: Router,
  ) {
    this.matomoInjector.init();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.matomoTracker.setCustomUrl(val.urlAfterRedirects);
        this.matomoTracker.trackPageView();
        this.matomoTracker.setReferrerUrl(val.urlAfterRedirects);
      }
    });
  }
}
```

## Tracking events

For now tracking events and actions is manual and is not injected into the html.

```html
<button (click)="whatHappensOnClick(1)"></button>
```

```ts
// component
import { Component } from '@angular/core';
import { MatomoTracker } from 'ngx-matomo-revived';

@Component({
  selector: 'app',
  templateUrl: './myButton.html',
})
export class MyComponent {
  constructor(private matomoTracker: MatomoTracker) {}

  whatHappensOnClick(someVal) {
    /*
     * some code...
     */
    this.matomoTracker.trackEvent('category', 'action', 'name', someVal);
  }
}
```

## Original Source

This module is lousily inspired from [Angular2Piwik](https://github.com/awronka/Angular2Piwik), which was also inspired from [Angulartics 2](https://github.com/angulartics/angulartics2).

## License

[MIT](LICENSE)

## See also

Matomo's [site](https://developer.matomo.org/) has the detailed documentation on how to use Matomo and integrate it in an application.
See also:

- [Single-Page Application Tracking](https://developer.matomo.org/guides/spa-tracking)
- [JavaScript Tracking Client](https://developer.matomo.org/guides/tracking-javascript-guide)
- [JavaScript Tracking Client](https://developer.matomo.org/api-reference/tracking-javascript)
- [Tracking HTTP API](https://developer.matomo.org/api-reference/tracking-api)
