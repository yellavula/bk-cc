import { Http } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

import { Logger}    from  '../../shared/logger.service';
import { NavigatorService}    from  '../../shared/utils/navigator.service';

export class BaseService {

  public logger: Logger;
  public http: Http;
  public  navigatorService: NavigatorService;

  private checkNetworkConnectivityMsg: string = 'Please check your network connectivity.';

  // HTTP STATUS CODES
  public STATUS_CODE_200: number = 200;
  public STATUS_CODE_201: number = 201;
  public STATUS_CODE_500: number = 500;

  constructor(private Http: Http, private plethyLogger: Logger, public navigatorSvc: NavigatorService) {
    this.navigatorService = navigatorSvc;
    this.http = Http;
    this.logger = plethyLogger;
  }

  componentName = 'BaseService';

  public httpPost(url: string, body: any, headers: any) {
    if (this.navigatorService.isOnline()) { // network is available. make the http call
      return this.http.post(url, body, new RequestOptions({ headers: this.buildOptionsHeaders(headers)}))
        .toPromise()
        .then(response => this.extractResponseData(response))
        .catch(error => this.handleResponseError(error));
    } else {
      this.logger.error(this.componentName, ' No network. Show User to check internet connectivity');
      return this.handleError({message: this.checkNetworkConnectivityMsg});
    }
  }

  public httpPut(url: string, body: any, headers: any) {
    if (this.navigatorService.isOnline()) { // network is available. make the http call
      return this.http.put(url, body, new RequestOptions({ headers: this.buildOptionsHeaders(headers)}))
        .toPromise()
        .then(response => this.extractResponseData(response))
        .catch(error => this.handleResponseError(error));
    } else {
      this.logger.error(this.componentName, ' No network. Show User to check internet connectivity');
      return this.handleError({message: this.checkNetworkConnectivityMsg});
    }
  }

  public httpGet(url: string, headers: any) {
    if (this.navigatorService.isOnline()) { // network is available. make the http call
      return this.http.get(url, new RequestOptions({ headers: this.buildOptionsHeaders(headers)}))
        .toPromise()
        .then(response => this.extractResponseData(response))
        .catch(error => this.handleResponseError(error));
    } else {
      this.logger.error(this.componentName, ' No network. Show User to check internet connectivity');
      return this.handleError({message: this.checkNetworkConnectivityMsg});
    }
  }

  public httpDelete(url: string, headers: any) {
    if (this.navigatorService.isOnline()) { // network is available. make the http call
      return this.http.delete(url, new RequestOptions({ headers: this.buildOptionsHeaders(headers)}))
        .toPromise()
        .then(response => this.extractResponseData(response))
        .catch(error => this.handleResponseError(error));
    } else {
      this.logger.error(this.componentName, ' No network. Show User to check internet connectivity');
      return this.handleError({message: this.checkNetworkConnectivityMsg});
    }
  }

  private buildOptionsHeaders(headers: any) {
    return new Headers({'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'});
  }

  private extractResponseData(response: any) {
    return Promise.resolve(response);
  }

  private handleResponseError (error: any) {
    return Promise.resolve(error);
  }

  protected handleError (error: any) {
    let errMsg = error.message ? error.message : 'Internal Server error';
    this.logger.log('BaseService > handleError errMsg',  errMsg);
    return Promise.reject(error.message || error);
  }

  protected processErrorMessage(errorMessage: any) {
    return (errorMessage && errorMessage.length > 0) ? errorMessage : 'Internal Server error';
  }
}
