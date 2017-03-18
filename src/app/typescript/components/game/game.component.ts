import { Component, Output, EventEmitter }       from '@angular/core';
import { Router   }       from '@angular/router';

// Services
import { Logger }    from  '../../shared/logger.service';
import { DeckOfCardsService } from '../../services/rest/deckOfCards.service';

// Models
import { DrawCardModel } from '../../models/deckOfCards/drawCardModel';

import { BaseComponent } from '../baseComponent';

// Services
import { UrlBuilderService }    from  '../../services/urlBuilder.service';
import {CardModel} from "../../models/deckOfCards/cardModel";


@Component({
  selector: 'game-component',
  templateUrl: 'game.template.html'
})

export class GameComponent extends  BaseComponent {

  componentName = 'GameComponent > ';

  @Output('showToast') showToast = new EventEmitter<string>();

  hideInProgress: boolean = true;
  drawCardModel: DrawCardModel;
  cards: CardModel[];
  dealerCardImageSource: string;
  playerCardImageSource: string;
  showTryAgainButton: boolean = false;

  constructor(public logger: Logger,
              public router: Router,
              private deckOfCardsService: DeckOfCardsService,
              private urlBuilderService: UrlBuilderService) {
    super(logger, router);
    this.drawCardModel = new DrawCardModel({});
  }

  ngOnInit() {
    this.logger.log(this.componentName, 'Hello `Game` component');
    this.drawAnyTwoCards();
  }

  resetCards () {
    this.dealerCardImageSource = this.urlBuilderService.dummyPosterPathUrl;
    this.playerCardImageSource = this.urlBuilderService.dummyPosterGuessPathUrl;
  }

  drawAnyTwoCards() {
    this.logger.log(this.componentName + ' > ', 'call DeckOfCards GET: drawCards API');
    this.resetCards();
    this.hideInProgress = false;
    this.showTryAgainButton = false;
    this.deckOfCardsService
      .getDrawCards(this.APP_CONSTANTS.DECK_OF_CARDS.COUNT)
      .then(result  => this.checkDrawCardsResponse(result))
      .catch(error => {
        this.handleGetMovieInfoError(error);
      });
  }

  checkDrawCardsResponse(drawCardModel: DrawCardModel) {
    this.logger.log(this.componentName + ' > checkDrawCardsResponse: drawCardModel > ', JSON.stringify(drawCardModel));
    if (this.cardsAreDifferent(drawCardModel)) {
      this.drawCardModel = drawCardModel;
      this.cards = this.drawCardModel.cards;
      this.dealerCardImageSource = this.drawCardModel.cards[0].image;
      this.hideInProgress = true;
    } else {
      this.drawAnyTwoCards();
    }
  }

  cardsAreDifferent (drawCardModel: DrawCardModel) {
    if (drawCardModel && drawCardModel.cards && drawCardModel.cards.length > 1) {
      return drawCardModel.cards[0].value != drawCardModel.cards[1].value;
    } else {
      return false;
    }
  }

  handleGetMovieInfoError (error: any) {
    this.logger.error(this.componentName + ' > deckOfCardsService.getDrawCards error:: ', JSON.stringify(error));
    this.showToastMessage(error);
    this.hideInProgress = true;
  }

  higherOrLowerClicked (selection: string) {
    this.logger.log(this.componentName + ' > higherOrLowerClicked. selection is:: ', selection);
    let playerWins = (selection === this.APP_CONSTANTS.DECK_OF_CARDS.HIGHER) ?
                      Number(this.cards[1].value) > Number(this.cards[0].value) : // Player guessed 'Higher'
                      Number(this.cards[0].value) > Number(this.cards[1].value); // Player guessed 'Lower'
    if (playerWins) {
      this.playerWinsTheGuess();
    } else {
      this.playerLoosesTheGuess();
    }
    this.playerCardImageSource = this.cards[1].image;
    this.showTryAgainButton = true;
  }

  playerWinsTheGuess () {
    this.showToastMessage(this.APP_CONSTANTS.DECK_OF_CARDS.YOU_WIN);
  }

  playerLoosesTheGuess () {
    this.showToastMessage(this.APP_CONSTANTS.DECK_OF_CARDS.BETTER_LUCK_NEXT_TIME);
  }

  tryAgainClicked () {
    this.logger.log(this.componentName, ' tryAgainClicked. refresh cards');
    this.drawAnyTwoCards();
  }

  showToastMessage (toastMessage: string) {
    this.showToast.emit(toastMessage);
  }
}
