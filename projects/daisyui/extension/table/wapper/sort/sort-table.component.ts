import { Component, inject, OnInit, viewChild } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { SortMultiToken, SortService } from './sort.service';

@Component({
  selector: 'app-sort-table',
  template: `<ng-template #templateRef>
    <ng-container #fieldComponent></ng-container
  ></ng-template>`,
  providers: [SortService, { provide: SortMultiToken, useValue: false }],
})
export class SortTablehWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #sort = inject(SortService);

  constructor() {
    super();
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
