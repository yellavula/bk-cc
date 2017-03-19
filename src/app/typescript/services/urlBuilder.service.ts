import { Injectable }     from '@angular/core';
import { Logger}    from  '../shared/logger.service';

import { environment } from '../../../environments/environment';

@Injectable()
export class UrlBuilderService {

  private componentName: string = 'UrlBuilderService> ';
  // the movie db constants
  private baseMovieDbDevUrl: string = 'https://api.themoviedb.org/3';
  private baseMovieDbProdUrl: string = 'https://api.themoviedb.org/3';
  private search: string = 'search';
  private movie: string = 'movie';
  private query: string = 'query';
  private api_key_label: string = 'api_key';
  private api_key_value: string;
  public posterPathUrl: string = 'https://image.tmdb.org/t/p/original/';
  public posterPathThumbnailUrl: string = 'https://image.tmdb.org/t/p/w264_and_h264_bestv2';
  public dummyPosterPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=33&bg=cccccc&txtclr=ff0000';
  public dummyPosterGuessPathUrl: string = 'https://placeholdit.imgix.net/~text?txtsize=68&bg=ff0000&txtclr=cccccc';
  private credits: string = 'credits';
  public tmdbProfilePath: string = 'https://www.themoviedb.org/person/';
  // deck of cards api constants
  private baseDeckOfCardsApiDevUrl: string = 'https://deckofcardsapi.com/api/deck/';
  private baseDeckOfCardsApiProdUrl: string = 'https://deckofcardsapi.com/api/deck/';
  private draw: string = 'draw';
  private count: string = 'count';
  private newDeck: string = 'new';

  constructor (private logger: Logger) {
    this.setApiKey();
  }

  setApiKey() {
    this.api_key_value = environment.themoviedbConfig.api_key;
  }

  private getMovieDbBaseUrl() {
    switch (environment.envName) {
      case 'dev':
        return this.baseMovieDbDevUrl;
      case 'prod':
        return this.baseMovieDbProdUrl;
      default:
        return this.baseMovieDbDevUrl;
    }
  }

  private getDeckOfCardsApiUrl() {
    switch (environment.envName) {
      case 'dev':
        return this.baseDeckOfCardsApiDevUrl;
      case 'prod':
        return this.baseDeckOfCardsApiProdUrl;
      default:
        return this.baseDeckOfCardsApiDevUrl;
    }
  }

  public getMovieInfoUrl (movieTitle: string) {
    // sample: <baseUrl>/search/movie?api_key=:api_key&query=<movieTitle>
    let movieInfoUrl = this.getMovieDbBaseUrl() + '/' + this.search + '/' + this.movie + '?' + this.api_key_label
                       + '=' + this.api_key_value + '&' + this.query + '=' +  movieTitle;
    this.logger.log(this.componentName + 'getMovieInfoUrl()> ', movieInfoUrl);
    return movieInfoUrl;
  }

  public getPosterPathImageSourceUrl (posterPathLocation: string) {
    let posterPathImageSourceUrl = this.posterPathUrl + posterPathLocation;
    this.logger.log(this.componentName + 'getPosterPathImageSourceUrl()> ', posterPathImageSourceUrl);
    return posterPathImageSourceUrl;
  }

  public getMovieCreditsUrl (movieID: string) {
    // sample: <baseUrl>/movie/:movieID/credits?api_key=:api_key
    let movieCreditsUrl = this.getMovieDbBaseUrl() + '/' + this.movie + '/' + movieID + '/' + this.credits + '?' + this.api_key_label
                        + '=' + this.api_key_value;
    this.logger.log(this.componentName + 'getMovieCreditsUrl()> ', movieCreditsUrl);
    return movieCreditsUrl;
  }

  public getDrawCardsUrl (count: number) {
    // sample: <baseUrl>/<<deck_id>>/draw/?count=:count
    let drawCardsUrl = this.getDeckOfCardsApiUrl() + this.newDeck + '/' + this.draw + '/?' + this.count + '=' + count;
    this.logger.log(this.componentName + 'getDrawCardsUrl()> ', drawCardsUrl);
    return drawCardsUrl;
  }
}
