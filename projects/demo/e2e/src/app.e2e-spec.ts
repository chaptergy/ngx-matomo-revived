import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('ngx-matomo-revived App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the demo page', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Matomo Tracker Test');
  });
});
