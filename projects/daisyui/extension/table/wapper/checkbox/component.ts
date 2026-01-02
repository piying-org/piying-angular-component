import { Component, computed, inject, viewChild } from '@angular/core';
import { CheckboxService } from '@piying/angular-daisyui/service';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

@Component({
  selector: 'app-checkbox-table',
  template: `<ng-template #templateRef> <ng-container insertField></ng-container></ng-template>`,
  providers: [CheckboxService],
  imports: [InsertFieldDirective],
})
export class CheckboxTableWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #checkbox = inject(CheckboxService);
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  constructor() {
    this.#checkbox.setAllList(() => {
      // todo 去掉数量
      const data = this.field$$().inputs()['data'];
      return Array.isArray(data) ? data[1] : data.value();
    });
  }
}
