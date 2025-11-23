import { Component, computed, inject, isSignal, OnInit, resource, viewChild } from '@angular/core';
import { SortService } from '@piying/angular-daisyui/service';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { dataConvert } from '../util';
import { localData } from '../local-data';
import { computedWithPrev } from '@piying/angular-daisyui/util';

@Component({
  selector: 'app-table-resource',
  template: `<ng-template #templateRef>
    <ng-container #fieldComponent></ng-container
  ></ng-template>`,
})
export class TableResourceWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  rawData$$ = computed(() => {
    let data = this.field$$().props()['data'];
    return Array.isArray(data) ? localData(data) : data;
  });
  queryParams$$ = computed(() => {
    return this.field$$().props()['queryParams'];
  });
  data$ = resource({
    params: computed(() => {
      let params = this.queryParams$$();
      return {
        data: this.rawData$$(),
        params,
      };
    }),
    loader: async (res) => {
      let { params } = res;
      return params.data(res as any).then((data: any) => {
        return dataConvert(data);
      });
    },
  });
  list$$ = computedWithPrev((value) => {
    return this.data$.value()?.[1] ?? value;
  });
  count$$ = computedWithPrev((value) => {
    return this.data$.value()?.[0] ?? value;
  });
  constructor() {
    super();
    this.field$$().inputs.update((inputs) => {
      return {
        ...inputs,
        data: this.list$$,
      };
    });
    this.field$$().props.update((props) => {
      return {
        ...props,
        count$$: this.count$$,
      };
    });
  }
}
