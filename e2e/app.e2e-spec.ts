import { browser, element, by } from 'protractor';
import { BkCcPage } from './app.po';

import { AppConstants }    from  '../src/app/typescript/app.constants';

describe('App component Specs - ', function() {
  let page: BkCcPage;

  beforeEach(() => {
    page = new BkCcPage();
  });

  it('should have app name on the browser title', function() {
    page.navigateTo();
    expect(browser.getTitle()).toEqual(AppConstants.APP_TITLE.TITLE);
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual(AppConstants.APP_TITLE.TITLE);
  });

  it('should display MOVIE tab option in the app tool bar', () => {
    page.navigateTo();
    let tabOption1 = element(by.id('md-tab-label-0-0'));
    expect(tabOption1.isPresent()).toEqual(true);
    expect(tabOption1.getText()).toEqual(AppConstants.NAV_OPTIONS.MOVIE);
  });

  it('should display GAME tab option in the app tool bar', () => {
    page.navigateTo();
    let tabOption2 = element(by.id('md-tab-label-0-1'));
    expect(tabOption2.isPresent()).toEqual(true);
    expect(tabOption2.getText()).toEqual(AppConstants.NAV_OPTIONS.GAME);
  });

  it('should display GAME component on the click of GAME tab option', () => {
    page.navigateTo();
    let tabOption2 = element(by.id('md-tab-label-0-1'));
    expect(tabOption2.isPresent()).toEqual(true);
    tabOption2.click();
    browser.driver.sleep(500);
    expect(element(by.id('gameToolBarId')).getText()).toEqual(AppConstants.GAME.CHOOSE_HIGHER_OR_LOWER);
    browser.executeScript('localStorage.clear();');
  });

  it('should display Movie component after clicking Game tab and again clicking on Movie tab', () => {
    page.navigateTo();
    let tabOption2 = element(by.id('md-tab-label-0-1'));
    expect(tabOption2.isPresent()).toEqual(true);
    tabOption2.click();
    browser.driver.sleep(500);
    expect(element(by.id('gameToolBarId')).getText()).toEqual(AppConstants.GAME.CHOOSE_HIGHER_OR_LOWER);
    browser.executeScript('localStorage.clear();');
    page.navigateTo();
    browser.driver.sleep(500);
    expect(element(by.id('movieInfoToolBarId')).getText()).toEqual(AppConstants.MOVIE.MOVIE_INFO_TAB_HEADER);
  });

  it('should display SELECT APP THEME option in the app tool bar', () => {
    page.navigateTo();
    let themeSelection = element(by.id('selectThemeId'));
    expect(themeSelection.isPresent()).toEqual(true);
    expect(themeSelection.getText()).toEqual(AppConstants.APP_THEMES.SELECT_APP_THEME);
  });

  it('should display MOVIE component on the initial landing of the page', () => {
    page.navigateTo();
    expect(element(by.id('movieInfoToolBarId')).getText()).toEqual(AppConstants.MOVIE.MOVIE_INFO_TAB_HEADER);
  });

});
