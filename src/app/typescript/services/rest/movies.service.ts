import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';

import { BaseService }     from './base.service';
import { Logger}    from  '../../shared/logger.service';
import { UrlBuilderService}    from  '../urlBuilder.service';
import { NavigatorService}    from  '../../shared/utils/navigator.service';

// Models
import { MovieInfoModel } from '../../models/movies/movieInfoModel';
import { MovieCreditsModel } from '../../models/movies/movieCreditsModel';

@Injectable()
export class MoviesService extends BaseService {

  componentName = 'MovieService> ';
  currentMethod: string;
  // methods
  GET_MOVIE_INFO = 'getMovieInfo';
  GET_MOVIE_CREDITS = 'getMovieCredits';

  constructor (public http: Http,
               public logger: Logger,
               public urlBuilder: UrlBuilderService,
               public navigatorService: NavigatorService) {
    super(http, logger, navigatorService);
  }

  getMovieInfo (movieName: string): Promise<MovieInfoModel> {
    this.currentMethod = this.GET_MOVIE_INFO;
    this.logger.log(this.componentName, 'calling themovieDb GET movie info  http api');
    return this.httpGet(this.urlBuilder.getMovieInfoUrl(movieName), {})
      .then(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  getMovieCredits (movieId: string): Promise<MovieCreditsModel> {
    this.currentMethod = this.GET_MOVIE_CREDITS;
    this.logger.log(this.componentName, 'calling themovieDb GET movie credits  http api');
    return this.httpGet(this.urlBuilder.getMovieCreditsUrl(movieId), {})
      .then(response => this.extractData(response))
      .catch(error => this.handleError(error));
  }

  private extractData (res: Response) {
    let body = res.json();
    this.logger.log(this.componentName + 'extractData() - ' + this.currentMethod +  'response: body > ', JSON.stringify(body));
    if (body) {
      switch (this.currentMethod) {
        case this.GET_MOVIE_INFO:
          return this.processGetMovieInfoResponse(body);
        case this.GET_MOVIE_CREDITS:
          return this.processGetMovieCreditsResponse(body);
      }
    } else {
      this.logger.error(this.componentName + ' > ' + this.currentMethod +  ' failed. return error message',  'Movie API returned error');
      return Promise.reject('Movie API returned error');
    }
  }

  processGetMovieInfoResponse(httpResponse: any) {
    if (httpResponse) { // get movie info successful
      this.logger.log(this.componentName + ' > get movie info successful. return info', httpResponse);
      if ( httpResponse && httpResponse.results && httpResponse.results[0]) {
        this.logger.log(this.componentName + ' > httpResponse.results[0] ', httpResponse.results[0]);
        return Promise.resolve(new MovieInfoModel(httpResponse.results[0])); // parsing just the first item in the result array
      } else {
        return Promise.reject('Error in fetching Movie Info');
      }
    } else {
      this.logger.error(this.componentName + ' > get movie info has a message', 'Error in fetching Movie Info');
      return Promise.reject('Error in fetching Movie Info');
    }
  }

  processGetMovieCreditsResponse(httpResponse: any) {
    if (httpResponse) { // get movie credits successful
      this.logger.log(this.componentName + ' processGetMovieCreditsResponse> httpResponse', httpResponse);
      let movieCredits = new MovieCreditsModel(httpResponse);
      return Promise.resolve(this.buildProfilePaths(movieCredits));
    } else {
      this.logger.error(this.componentName + ' > get movie info has a message', 'Error in fetching Movie Info');
      return Promise.reject('Error in fetching Movie Info');
    }
  }

  buildProfilePaths (movieCredits: MovieCreditsModel) {
    let movieCreditsToReturn = new MovieCreditsModel(movieCredits);
    // for all cast profiles
    if (movieCreditsToReturn && movieCreditsToReturn.cast && movieCreditsToReturn.cast.length > 0) {
      for (let cast of movieCreditsToReturn.cast) {
        cast.profile_path = (cast.profile_path && cast.profile_path.length > 0) ?
          this.urlBuilder.posterPathThumbnailUrl + cast.profile_path :
          this.urlBuilder.buildDummyPosterPathUrlWithText(this.buildInitials(cast.name));
        cast.tmdbProfilePath = cast.id ? this.urlBuilder.tmdbProfilePath + cast.id : '';
      }
    }
    // for all crew profiles
    if (movieCreditsToReturn && movieCreditsToReturn.crew && movieCreditsToReturn.crew.length > 0) {
      for (let crew of movieCreditsToReturn.crew) {
        crew.profile_path = (crew.profile_path && crew.profile_path.length > 0) ?
          this.urlBuilder.posterPathThumbnailUrl + crew.profile_path :
          this.urlBuilder.buildDummyPosterPathUrlWithText(this.buildInitials(crew.name));
        crew.tmdbProfilePath = crew.id ? this.urlBuilder.tmdbProfilePath + crew.id : '';
      }
    }
    return movieCreditsToReturn;
  }

  buildInitials (name: string) {
    if (name && name.length > 0) {
      let nameArray = name.split(" ");
      if (nameArray.length > 0) {
        return (nameArray.length === 1) ?
                nameArray[0].charAt(0).toUpperCase() :
                nameArray[0].charAt(0).toUpperCase() + nameArray[ nameArray.length -1 ].charAt(0).toUpperCase();
      }
    } else {
      return '';
    }
  }
}

