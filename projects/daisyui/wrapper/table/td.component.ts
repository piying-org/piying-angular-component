import { Component, OnInit } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'td',
  template: '<ng-container #fieldComponent></ng-container>',
})
export class TdWC extends PiyingViewWrapperBase {}
