import { Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { SortMultiToken, SortService } from './sort.service';

@Component({
  selector: 'app-sort-table',
  template: `<ng-template #templateRef> <ng-container insertField></ng-container></ng-template>`,
  providers: [SortService, { provide: SortMultiToken, useValue: false }],
  imports: [InsertFieldDirective],
})
export class SortTablehWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #sort = inject(SortService);
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  constructor() {
    this.#sort.setUpdate((value) => {
      this.field$$().props.update((data) => {
        return {
          ...data,
          sortQueryParams: ((this.props$$()['sortList'] ?? Object.keys(value)) as string[])
            .map((key) => {
              return value[key] ? { key: key, value: value[key] } : undefined;
            })
            .filter(Boolean),
        };
      });
    });
  }
}
