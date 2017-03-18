export class CardModel {

  image: string;
  value: string;
  suit: string;
  code: string;

  constructor(input: any) {
    this.image = input.image ? input.image : '';
    this.value = input.value ? input.value : '';
    this.suit = input.suit ? input.suit : '';
    this.code = input.code ? input.code : '';
  }
}
