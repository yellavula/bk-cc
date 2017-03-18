import { browser, element, by } from 'protractor';
import { BkCcPage } from './app.po';

import { AppConstants }    from  '../src/app/typescript/app.constants';

describe('Movie Component Specs - ', function() {
  let page: BkCcPage;

  beforeEach(() => {
    page = new BkCcPage();
  });

  it('should display MOVIE component on the initial landing of the page', () => {
    page.navigateTo();
    expect(element(by.id('movieInfoToolBarId')).getText()).toEqual(AppConstants.MOVIE.MOVIE_INFO_TAB_HEADER);
  });

  it('should display Movie name in the Movie Info component', () => {
    page.navigateTo();
    expect(element(by.id('movieName')).getText()).toEqual(AppConstants.MOVIE.MOVIE_NAME_ACTUAL);
  });

  it('should display Movie release year in the Movie Info component', () => {
    page.navigateTo();
    expect(element(by.id('movieReleaseYear')).getText()).not.toBe(null);
  });

  it('should display Movie overview in the Movie Info component', () => {
    page.navigateTo();
    expect(element(by.id('movieOverview')).getText()).not.toBe(null);
  });

});
