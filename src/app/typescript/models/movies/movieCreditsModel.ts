import { CastModel } from './castModel';
import { CrewModel } from './crewModel';

export class MovieCreditsModel {

  id: number;
  cast: CastModel[];
  crew: CrewModel[];

  constructor(input: any) {
    this.id = input.id;
    this.cast = (input.cast && input.cast.length > 0) ? input.cast : [];
    this.crew = (input.crew && input.crew.length > 0) ? input.crew : [];
  }
}
