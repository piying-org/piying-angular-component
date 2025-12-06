import { Component, inject, OnInit, viewChild } from '@angular/core';
import { CheckboxService } from '@piying/angular-daisyui/service';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'app-checkbox-table',
  template: `<ng-template #templateRef>
    <ng-container #fieldComponent></ng-container
  ></ng-template>`,
  providers: [CheckboxService],
})
export class CheckboxTableWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #checkbox = inject(CheckboxService);
  constructor() {
    super();
    this.#checkbox.setAllList(() => {
      // todo 去掉数量
      let data = this.field$$().inputs()['data'];
      return Array.isArray(data) ? data[1] : data.value();
    });
  }
}
