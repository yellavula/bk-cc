import  { Component, Input, Output, EventEmitter }       from '@angular/core';
import  {  ActivatedRoute   }       from '@angular/router';

import { Logger}    from  '../logger.service';

@Component({
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  @Input() navOptions;
  @Input('selectedNavOption') selectedNavOption;
  @Output() navOptionSelected = new EventEmitter<string>();

  selectedNavOptionIndex: number;

  constructor(public route: ActivatedRoute,
              private logger: Logger) {}

  ngOnInit() {
    this.logger.log('NavigationComponent > ', 'Hello `NavigationComponent` component');
    this.logger.log('NavigationComponent > ngOnInit > navOptions ', this.navOptions);
    this.logger.log('NavigationComponent > ngOnInit > selectedNavOption ', this.selectedNavOption);
    this.selectedNavOptionIndex = this.navOptions.indexOf(this.selectedNavOption);
    this.logger.log('NavigationComponent > ngOnInit > selectedNavOptionIndex ', this.selectedNavOptionIndex);
  }

  navOptionClicked($event) {
    this.selectedNavOptionIndex = $event.index;
    this.logger.log('NavigationComponent > navOptionClicked > selectedNavOptionIndex', this.selectedNavOptionIndex);
    this.selectedNavOption = this.navOptions[this.selectedNavOptionIndex];
    this.logger.log('NavigationComponent > navOptionClicked > selectedNavOption', this.selectedNavOption);
    this.navOptionSelected.emit(this.selectedNavOption);
  }
}
