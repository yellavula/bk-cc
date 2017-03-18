export class CastModel {

  cast_id: number;
  character: string;
  credit_id: string;
  id: number;
  name: string;
  original_language: string;
  order: number;
  profile_path: string;
  tmdbProfilePath: string;

  constructor(input: any) {
    this.cast_id = input.cast_id;
    this.character = input.character ? input.character : '';
    this.credit_id = input.credit_id ? input.credit_id : '';
    this.id = input.id;
    this.name = input.name ? input.name : '';
    this.original_language = input.original_language ? input.original_language : '';
    this.order = input.original_title;
    this.profile_path = input.profile_path ? input.profile_path : '';
  }
}
