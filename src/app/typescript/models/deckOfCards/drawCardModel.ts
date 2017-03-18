import { CardModel } from './cardModel';

export class DrawCardModel {

  success: boolean;
  cards: CardModel[];
  deck_id: string;
  remaining: number;

  constructor(input: any) {
    this.success = input.success;
    this.cards = input.cards;
    this.deck_id = input.deck_id ? input.deck_id : '';
    this.remaining = input.id;
  }
}
