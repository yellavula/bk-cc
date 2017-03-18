import { Component }  from '@angular/core';
import { Router    }  from '@angular/router';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { Logger }    from  '../../shared/logger.service';

import { BaseComponent } from '../baseComponent';
import { AppConstants }    from  '../../app.constants';

@Component({
  selector: 'main-component',
  templateUrl: 'main.template.html'
})

export class MainComponent extends  BaseComponent {

  componentName = 'MainComponent > ';
  NAV_OPTIONS: any = AppConstants.NAV_OPTIONS;
  navOptions: Array<string> = [];
  selectedNavOption: string;
  mode = '';
  constructor(public logger: Logger,
              public router: Router,
              public snackBar: MdSnackBar) {
    super(logger, router);
  }

  ngOnInit() {
    this.logger.log(this.componentName, 'Hello `Main` component');
    this.setDashboardState();
  }

  navOptionClicked(navOption: string) {
    this.logger.log('NavigationComponent navOptionClicked > ', navOption);
    this.selectedNavOption = navOption;
    this.logger.log('NavigationComponent > ngOnInit > selectedNavOption', this.selectedNavOption);
  }

  lastDashboardModeExists() {
    let lastDashboardMode: string = this.localStorage.getItem(this.localStorage.LAST_DASHBOARD_TAB_SELECTED);
    this.logger.log(this.componentName + ' > lastDashboardModeExists: lastDashboardMode ', lastDashboardMode);
    return (lastDashboardMode != null && lastDashboardMode.length > 0);
  }

  setDashboardState() {
    this.setNavOptions();
    if (this.lastDashboardModeExists()) {
      let lastDashboardMode = this.localStorage.getItem(this.localStorage.LAST_DASHBOARD_TAB_SELECTED);
      this.logger.log(this.componentName + ' > lastDashboardModeExists - last selected tab is ', lastDashboardMode);
      this.setDashboardMode(lastDashboardMode); // setting last known state of dashboard
    } else {
      this.setDashboardMode(this.NAV_OPTIONS.MOVIE); // Movie
    }
  }

  setNavOptions() {
    for (let property in this.NAV_OPTIONS) {
      if (this.NAV_OPTIONS.hasOwnProperty(property)) {
        this.navOptions.push(this.NAV_OPTIONS[property]);
      }
    }
  }

  setDashboardMode(initialMode: string) {
    this.selectedNavOption = initialMode;
    switch (initialMode) {
      case this.NAV_OPTIONS.MOVIE: // Movie
        this.mode = this.NAV_OPTIONS.MOVIE;
        break;
      case this.NAV_OPTIONS.GAME: // Game
        this.mode = this.NAV_OPTIONS.GAME;
        break;
    }
    this.saveCurrentState(this.mode);
    this.logger.log(this.componentName + ' Mode> ', this.mode);
  }

  saveCurrentState(currentMode: string) {
    this.logger.log(this.componentName + ' > saveCurrentState: currentMode ', currentMode);
    this.localStorage.saveItem(this.localStorage.LAST_DASHBOARD_TAB_SELECTED, currentMode);
  }

  navOptionSelected(selectedNavOption: string) {
    this.logger.log(this.componentName + ' selectedNavOptionMode > ', selectedNavOption);
    this.setDashboardMode(selectedNavOption);
  }

  showToast (toastMessage: string) {
    if (toastMessage && toastMessage.length > 0) {
      this.logger.log(this.componentName + 'show toast message', toastMessage);
      this.snackBar.open(toastMessage, 'Done', {});
    }
  }
}
