import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatomoModule, MATOMO_CONFIGURATION } from 'ngx-matomo-revived';

describe('Demo App', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.overrideProvider(MATOMO_CONFIGURATION, {
        useValue: {
          trackAppStarting: true,
          isConsentRequired: false,
          enableLinkTracking: true,
          enableLinkTrackingValue: false,
          trackers: [],
        },
      });
      TestBed.configureTestingModule({
        imports: [MatomoModule],
        declarations: [AppComponent],
      }).compileComponents();
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Matomo Tracker Test');
  });

  it(`should have a Matomo injector`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.matomoInjector).toBeTruthy();
  });

  it(`should have a Matomo tracker`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.matomoTracker).toBeTruthy();
  });
});
