export class CrewModel {

  credit_id: string;
  department: string;
  id: number;
  job: string;
  name: string;
  profile_path: string;
  tmdbProfilePath: string;

  constructor(input: any) {
    this.credit_id = input.cast_id ? input.cast_id : '';
    this.department = input.department ? input.department : '';
    this.id = input.id;
    this.job = input.job ? input.job : '';
    this.name = input.name ? input.name : '';
    this.profile_path = input.profile_path ? input.profile_path : '';
  }
}
