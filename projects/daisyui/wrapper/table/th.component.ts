import { Component } from '@angular/core';
import { InsertFieldDirective } from '@piying/view-angular';

@Component({
  selector: 'th',
  template: '<ng-container insertField></ng-container>',
  imports: [InsertFieldDirective],
})
export class ThWC {}
