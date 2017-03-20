import { Router   }       from '@angular/router';

import { Logger}    from  '../shared/logger.service';
import { LocalStorageService}    from  '../shared/localStorage.service';
import { AppConstants }    from  '../app.constants';

export class BaseComponent {

  public logger: Logger;
  public router: Router;
  public localStorage: LocalStorageService;
  public APP_CONSTANTS =  AppConstants;
  public NAV_OPTIONS: any = this.APP_CONSTANTS.NAV_OPTIONS;


  constructor(private loggerSvc: Logger, public routerInput: Router) {
    this.logger = loggerSvc;
    this.localStorage = new LocalStorageService();
    this.router = routerInput;
  }

}
