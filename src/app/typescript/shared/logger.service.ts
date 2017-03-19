/*
   Logger class to print console logs
*/

import { Injectable }     from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class Logger {

  dev = !environment.production ? true : false;

  public log(componentName, msg) {
    if (this.dev) {
      console.log(componentName, msg);
    } else {
      return;
    }
  }

  public error(componentName, msg) {
    if (this.dev) {
      console.error(componentName, msg);
    } else {
      return;
    }
  }

  public warn(componentName, msg) {
    if (this.dev) {
      console.warn(componentName, msg);
    } else {
      return;
    }
  }
}
