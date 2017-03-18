import { Component, ViewEncapsulation } from '@angular/core';

import { AppConstants }    from  './app.constants';

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    '../stylesheets/components/app-component.styles.css'
  ],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = AppConstants.APP_TITLE.TITLE;
}
