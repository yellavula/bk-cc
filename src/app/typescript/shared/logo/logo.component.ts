import  {  Component, Input }       from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: 'logo.template.html'
})

export class LogoComponent {

  @Input() appName: string;

}
