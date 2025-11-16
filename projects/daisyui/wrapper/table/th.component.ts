import { Component, OnInit } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'th',
  template: '<ng-container #fieldComponent></ng-container>',
})
export class ThWC extends PiyingViewWrapperBase {}
