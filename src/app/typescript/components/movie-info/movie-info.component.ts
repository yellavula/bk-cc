import { Component, Output, EventEmitter }       from '@angular/core';
import { Router   }       from '@angular/router';

import { BaseComponent } from '../baseComponent';

// Services
import { Logger }    from  '../../shared/logger.service';
import { MoviesService } from '../../services/rest/movies.service';
import { UrlBuilderService }    from  '../../services/urlBuilder.service';

// Models
import { MovieInfoModel } from '../../models/movies/movieInfoModel';
import { MovieCreditsModel } from '../../models/movies/movieCreditsModel';

@Component({
  selector: 'movie-info',
  templateUrl: 'movie-info.template.html'
})

export class MovieInfoComponent extends  BaseComponent {

  componentName = 'MovieInfoComponent > ';

  @Output('showToast') showToast = new EventEmitter<string>();

  hideInProgress: boolean = true;
  posterImageSource: string = this.urlBuilderService.dummyPosterPathUrl;
  movieInfo: MovieInfoModel;
  movieCredits: MovieCreditsModel;

  constructor(public logger: Logger,
              public router: Router,
              private movieService: MoviesService,
              private urlBuilderService: UrlBuilderService) {
    super(logger, router);
    this.movieInfo = new MovieInfoModel({});
    this.movieCredits = new MovieCreditsModel({});
  }

  ngOnInit() {
    this.logger.log(this.componentName, 'Hello `Movie Info` component');
    this.getMovieInfo();
  }

  getMovieInfo() {
    this.logger.log(this.componentName + ' > ', 'call Movie Service getMovieInfo');
    this.hideInProgress = false;
    this.movieService
      .getMovieInfo(this.APP_CONSTANTS.MOVIE.MOVIE_NAME)
      .then(result  => this.checkMovieInfo(result))
      .catch(error => {
        this.handleGetMovieInfoError(error);
      });
  }

  checkMovieInfo(movieInfo: MovieInfoModel) {
    this.logger.log(this.componentName + ' > checkMovieInfo: movieInfo > ', JSON.stringify(movieInfo));
    this.movieInfo = movieInfo;
    this.buildMovieImageSource(this.movieInfo.poster_path);
    this.hideInProgress = true;
    this.getMovieCredits();
  }

  handleGetMovieInfoError (error: any) {
    this.logger.error(this.componentName + ' > moviesService.getMovieInfo error:: ', JSON.stringify(error));
    this.showToastMessage(error);
    this.hideInProgress = true;
  }

  buildMovieImageSource(poster_path: string) {
    this.posterImageSource = this.urlBuilderService.getPosterPathImageSourceUrl(poster_path);
  }

  getMovieCredits() {
    this.logger.log(this.componentName + ' > ', 'call Movie Service GET movie credits');
    this.hideInProgress = false;
    this.movieService
      .getMovieCredits(this.APP_CONSTANTS.MOVIE.MOVIE_ID)
      .then(response  => this.checkMovieCreditsResponse(response))
      .catch(error => {
        this.handleGetMovieCreditsError(error);
      });
  }

  checkMovieCreditsResponse(movieCredits: MovieCreditsModel) {
    this.logger.log(this.componentName + ' > checkMovieCreditsResponse: movieInfo > ', JSON.stringify(movieCredits));
    this.movieCredits = movieCredits;
    this.hideInProgress = true;
  }

  handleGetMovieCreditsError (error: any) {
    this.logger.error(this.componentName + ' > moviesService.getMovieCredits error:  ', JSON.stringify(error));
    this.showToastMessage(error);
    this.hideInProgress = true;
  }

  showToastMessage (toastMessage: string) {
    this.showToast.emit(toastMessage);
  }
}
