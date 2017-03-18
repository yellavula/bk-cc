export class MovieInfoModel {

  poster_path: string;
  adult: boolean;
  overview: string;
  release_date: string;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  vote_average: number;

  constructor(input: any) {
    this.poster_path = input.poster_path ? input.poster_path : '';
    this.adult = input.adult ? input.adult : false;
    this.overview = input.overview ? input.overview : '';
    this.release_date = input.release_date;
    this.id = input.id ? input.id : '';
    this.original_title = input.original_title ? input.original_title : '';
    this.title = input.title ? input.title : '';
    this.backdrop_path = input.backdrop_path ? input.backdrop_path : '';
    this.popularity = input.popularity;
    this.vote_count = input.vote_count;
    this.vote_average = input.vote_average;
  }
}
