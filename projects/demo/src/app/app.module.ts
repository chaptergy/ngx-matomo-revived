import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatomoModule, MatomoModuleConfiguration, MATOMO_CONFIGURATION } from 'ngx-matomo-revived';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatomoModule],
  providers: [
    {
      provide: MATOMO_CONFIGURATION,
      useValue: {
        trackers: [{ siteId: 1, trackerUrl: 'http://ngx.matomo.cloud/' }],
        scriptUrl: '//cdn.matomo.cloud/ngx.matomo.cloud/matomo.js',
      } as MatomoModuleConfiguration,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
