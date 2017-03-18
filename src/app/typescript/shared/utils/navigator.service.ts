import { Injectable }     from '@angular/core';

@Injectable()
export class NavigatorService {

  constructor () {}

  isOnline (): boolean {
    return navigator.onLine; // returns true is Network is available and false if offline
  }
}

