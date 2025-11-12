import { Component, OnInit, viewChild } from '@angular/core';
import { AttributesDirective, PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'app-div',
  template: `<ng-template #templateRef let-attr="attributes">
    <div [attributes]="attr()"><ng-container #fieldComponent></ng-container></div>
  </ng-template>`,
  imports: [AttributesDirective],
})
export class DivWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
