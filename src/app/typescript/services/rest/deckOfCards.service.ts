import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService }     from './base.service';
import { Logger}    from  '../../shared/logger.service';
import { UrlBuilderService}    from  '../urlBuilder.service';
import { NavigatorService}    from  '../../shared/utils/navigator.service';
import { AppConstants }    from  '../../app.constants';

// Models
import { DrawCardModel } from '../../models/deckOfCards/drawCardModel';

@Injectable()
export class DeckOfCardsService extends BaseService {

  componentName = 'DeckOfCardsService> ';
  public APP_CONSTANTS =  AppConstants;

  currentMethod: string;
  // methods
  GET_DRAW_CARDS = 'getDrawCards';

  constructor (public http: Http,
               public logger: Logger,
               public urlBuilder: UrlBuilderService,
               public navigatorService: NavigatorService) {
    super(http, logger, navigatorService);
  }

  getDrawCards (count: number): Promise<DrawCardModel> {
    this.currentMethod = this.GET_DRAW_CARDS;
    this.logger.log(this.componentName, 'calling deckofcardsapi GET cards  http api');
    return this.httpGet(this.urlBuilder.getDrawCardsUrl(count), {})
      .then(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  private extractData (res: Response) {
    let body = res.json();
    this.logger.log(this.componentName + 'extractData() - ' + this.currentMethod +  'response: body > ', JSON.stringify(body));
    if (body) {
      switch (this.currentMethod) {
        case this.GET_DRAW_CARDS:
          return this.processGetMovieInfoResponse(body);
      }
    } else {
      this.logger.error(this.componentName + ' > ' + this.currentMethod +  ' failed. return error message',  'Movie API returned error');
      return Promise.reject('DeckOfCards API returned error');
    }
  }

  processGetMovieInfoResponse (httpResponse: any) {
    if (httpResponse) { // draw a card successful
      if ( httpResponse && httpResponse.success) {
        this.logger.log(this.componentName + ' > get movie info successful. return info', httpResponse);
        let drawCardModel = new DrawCardModel(httpResponse);
        return Promise.resolve(this.buildCardsValue(drawCardModel));
      } else {
        return Promise.reject('Error in Drawing Cards');
      }
    } else {
      this.logger.error(this.componentName + ' > get movie info has a message', 'Error in Drawing Cards');
      return Promise.reject('Error in Drawing Cards');
    }
  }

  buildCardsValue (drawCardModel: DrawCardModel) {
    let drawCardModelToReturn = new DrawCardModel(drawCardModel);
    // for all cards
    if (drawCardModelToReturn && drawCardModelToReturn.cards && drawCardModelToReturn.cards.length > 1) {
      for (let card of drawCardModelToReturn.cards) {
        switch (card.value) {
          case this.APP_CONSTANTS.DECK_OF_CARDS.ACE: // ACE
          case this.APP_CONSTANTS.DECK_OF_CARDS.A: // ACE
            card.value = '1';
            break;
          case this.APP_CONSTANTS.DECK_OF_CARDS.ZERO: // ZERO
          case this.APP_CONSTANTS.DECK_OF_CARDS.TEN: // TEN
            card.value = '10';
            break;
          case this.APP_CONSTANTS.DECK_OF_CARDS.JACK: // JACK
          case this.APP_CONSTANTS.DECK_OF_CARDS.J: // J
            card.value = '11';
            break;
          case this.APP_CONSTANTS.DECK_OF_CARDS.QUEEN: // QUEEN
          case this.APP_CONSTANTS.DECK_OF_CARDS.Q: // Q
            card.value = '12';
            break;
          case this.APP_CONSTANTS.DECK_OF_CARDS.KING: // KING
          case this.APP_CONSTANTS.DECK_OF_CARDS.K: // K
            card.value = '13';
            break;
        }
      }
    }
    return drawCardModelToReturn;
  }
}

