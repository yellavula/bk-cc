import { browser, element, by } from 'protractor';

export class BkCcPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.id('appName')).getText();
  }
}
