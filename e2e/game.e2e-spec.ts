import { browser, element, by } from 'protractor';
import { BkCcPage } from './app.po';

import { AppConstants }    from  '../src/app/typescript/app.constants';

describe('Game Component Specs - ', function() {
  let page: BkCcPage;

  beforeEach(() => {
    page = new BkCcPage();
    // navigate to Game component
    let gameTab = element(by.id('md-tab-label-0-1'));
    expect(gameTab.isPresent()).toEqual(true);
    gameTab.click(); // Game tab clicked
  });

  it('should display Game component after clicking Game tab option', () => {
    expect(element(by.id('gameToolBarId')).getText()).toEqual(AppConstants.GAME.CHOOSE_HIGHER_OR_LOWER);
  });

  it('should display Higher button on the initial landing of the Game component', () => {
    let higherButton = element(by.id('higherButtonId'));
    expect(higherButton.isPresent()).toEqual(true);
  });

  it('should display Higher text on Game\'s Higher choice button', () => {
    let higherButton = element(by.id('higherButtonId'));
    expect(higherButton.isPresent()).toEqual(true);
    expect(higherButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.HIGHER);
  });

  it('should display Lower text on Game\'s Lower choice button', () => {
    let lowerButton = element(by.id('lowerButtonId'));
    expect(lowerButton.isPresent()).toEqual(true);
    expect(lowerButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.LOWER);
  });

  it('should NOT display Try Again button on the initial landing of the Game component', () => {
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    expect(tryAgainButton.isPresent()).toEqual(false);
  });

  it('should display Lower button on the initial landing of the Game component', () => {
    let lowerButton = element(by.id('lowerButtonId'));
    expect(lowerButton.isPresent()).toEqual(true);
  });

  it('should display Dealer Card label on the initial landing of the Game component', () => {
    expect(element(by.id('dealerCardLabel')).getText()).toEqual(AppConstants.DECK_OF_CARDS.DEALER_CARD);
  });

  it('should display Dealer Card image on the initial landing of the Game component', () => {
    let dealerCardImage = element(by.id('dealerCardImageId'));
    expect(dealerCardImage.isPresent()).toEqual(true);
  });

  it('should display Dealer Card image source on the initial landing of the Game component', () => {
    let dealerCardImage = element(by.id('dealerCardImageId'));
    expect(dealerCardImage.isPresent()).toEqual(true);
    expect(dealerCardImage.getAttribute('src')).not.toBe(null);
    let dummyPosterPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=33&bg=cccccc&txtclr=ff0000';
    expect(dealerCardImage.getAttribute('src')).not.toBe(dummyPosterPathUrl);
  });

  it('should display Player Card label on the initial landing of the Game component', () => {
    expect(element(by.id('userGuessYourCardLabel')).getText()).toEqual(AppConstants.DECK_OF_CARDS.PLAYER_CARD);
  });

  it('should display Player Card image placeholder on the initial landing of the Game component', () => {
    let playerCardImage = element(by.id('playerCardImageId'));
    expect(playerCardImage.isPresent()).toEqual(true);
  });

  it('should display dummy Player Card image source on the initial landing of the Game component', () => {
    let playerCardImage = element(by.id('playerCardImageId'));
    expect(playerCardImage.isPresent()).toEqual(true);
    let dummyPosterGuessPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=68&bg=ff0000&txtclr=cccccc';
    expect(playerCardImage.getAttribute('src')).toBe(dummyPosterGuessPathUrl);
  });

  it('should display Try Again button after clicking Lower button', () => {
    // make sure Lower button is available
    let lowerButton = element(by.id('lowerButtonId'));
    expect(lowerButton.isPresent()).toEqual(true);
    expect(lowerButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.LOWER);
    // make sure Try Again button is not displayed initially
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    expect(tryAgainButton.isPresent()).toEqual(false);
    // Lower button clicked
    lowerButton.click();
    browser.driver.sleep(500);
    // make sure Try Again button is displayed now
    expect(tryAgainButton.isPresent()).toEqual(true);
    expect(tryAgainButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.TRY_AGAIN);
    tryAgainButton.click(); // to reset the game
  });

  it('should display Try Again button after clicking Higher button', () => {
    // make sure Lower button is available
    let higherButton = element(by.id('higherButtonId'));
    expect(higherButton.isPresent()).toEqual(true);
    expect(higherButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.HIGHER);
    // make sure Try Again button is not displayed initially
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    expect(tryAgainButton.isPresent()).toEqual(false);
    // Higher button clicked
    higherButton.click();
    browser.driver.sleep(500);
    // make sure Try Again button is displayed now
    expect(tryAgainButton.isPresent()).toEqual(true);
    expect(tryAgainButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.TRY_AGAIN);
    tryAgainButton.click(); // to reset the game
  });

  it('should hide Higher button after clicking Try Again button', () => {
    // make sure Higher button is available
    let higherButton = element(by.id('higherButtonId'));
    expect(higherButton.isPresent()).toEqual(true);
    expect(higherButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.HIGHER);
    // make sure Try Again button is not displayed initially
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    expect(tryAgainButton.isPresent()).toEqual(false);
    // Higher button clicked
    higherButton.click();
    browser.driver.sleep(500);
    // make sure Try Again button is displayed now
    expect(tryAgainButton.isPresent()).toEqual(true);
    expect(tryAgainButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.TRY_AGAIN);
    expect(higherButton.isPresent()).toEqual(false); // validating visibility of Higher button
    tryAgainButton.click(); // to reset the game
  });

  it('should hide Lower button after clicking Try Again button', () => {
    // make sure Lower button is available
    let lowerButton = element(by.id('lowerButtonId'));
    expect(lowerButton.isPresent()).toEqual(true);
    expect(lowerButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.LOWER);
    // make sure Try Again button is not displayed initially
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    expect(tryAgainButton.isPresent()).toEqual(false);
    // Lower button clicked
    lowerButton.click();
    browser.driver.sleep(500);
    // make sure Try Again button is displayed now
    expect(tryAgainButton.isPresent()).toEqual(true);
    expect(tryAgainButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.TRY_AGAIN);
    expect(lowerButton.isPresent()).toEqual(false); // validating visibility of Lower button
    tryAgainButton.click(); // to reset the game
  });

  it('should not display dummy Player Card image source after clicking Lower button in the Game', () => {
    // make sure lower button is available
    let lowerButton = element(by.id('lowerButtonId'));
    expect(lowerButton.isPresent()).toEqual(true);
    expect(lowerButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.LOWER);
    // make sure Player card has dummy image initially
    let playerCardImage = element(by.id('playerCardImageId'));
    expect(playerCardImage.isPresent()).toEqual(true);
    let dummyPosterGuessPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=68&bg=ff0000&txtclr=cccccc';
    expect(playerCardImage.getAttribute('src')).toBe(dummyPosterGuessPathUrl);
    lowerButton.click(); // click Lower button
    browser.driver.sleep(500);
    expect(playerCardImage.isPresent()).toEqual(true);
    expect(playerCardImage.getAttribute('src')).not.toBe(dummyPosterGuessPathUrl);
    expect(playerCardImage.getAttribute('src')).not.toBe(null);
    expect(playerCardImage.getAttribute('src')).not.toBe('');
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    tryAgainButton.click(); // reset the game
  });

  it('should not display dummy Player Card image source after clicking Higher button in the Game', () => {
    // make sure Higher button is available
    let higherButton = element(by.id('higherButtonId'));
    expect(higherButton.isPresent()).toEqual(true);
    expect(higherButton.getText()).toEqual(AppConstants.DECK_OF_CARDS.HIGHER);
    // make sure Player card has dummy image initially
    let playerCardImage = element(by.id('playerCardImageId'));
    expect(playerCardImage.isPresent()).toEqual(true);
    let dummyPosterGuessPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=68&bg=ff0000&txtclr=cccccc';
    expect(playerCardImage.getAttribute('src')).toBe(dummyPosterGuessPathUrl);
    higherButton.click(); // click Higher button
    browser.driver.sleep(500);
    expect(playerCardImage.isPresent()).toEqual(true);
    expect(playerCardImage.getAttribute('src')).not.toBe(dummyPosterGuessPathUrl);
    expect(playerCardImage.getAttribute('src')).not.toBe(null);
    expect(playerCardImage.getAttribute('src')).not.toBe('');
    let tryAgainButton = element(by.id('tryAgainButtonId'));
    tryAgainButton.click(); // reset the game
  });

  afterEach(() => {
    browser.executeScript('localStorage.clear();');
  });

});
