/*
 LocalStorage Service which manages CURD operations of variables in the Local Storage
 */

import { Injectable }     from '@angular/core';

@Injectable()
export class LocalStorageService {

  LAST_DASHBOARD_TAB_SELECTED = 'lastDashboardTabSelected';

  constructor() {}

  private set(item, data) {
    localStorage.setItem(item, data);
  }

  private get(item) {
    return localStorage.getItem(item);
  }

  private remove(item) {
    localStorage.removeItem(item);
  }

  public saveItem(name, data) {
    this.set(name, data);
  }

  public getItem(name) {
    return this.get(name);
  }

  public removeItem(name) {
    this.remove(name);
  }
}
