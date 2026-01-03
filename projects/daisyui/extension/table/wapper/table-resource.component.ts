import { Component, computed, inject, resource, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { dataConvert } from '../util';
import { localData } from '../local-data';
import { computedWithPrev } from '@piying-lib/angular-core';
import { TableStatusService } from './status';

@Component({
  selector: 'app-table-resource',
  template: `<ng-template #templateRef> <ng-container insertField></ng-container></ng-template>`,
  imports: [InsertFieldDirective],
})
export class TableResourceWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  #status = inject(TableStatusService);
  props$$ = computed(() => this.field$$().props());
  #data$$ = computed(() => this.field$$().props()['data']);
  rawData$$ = computed(() => {
    const data = this.#data$$();
    this.#status.updateIndex$();
    return Array.isArray(data) || !data
      ? Promise.resolve(localData(data ?? []))
      : data().then((value: any) => {
          if (Array.isArray(value) || !value) {
            return localData(value ?? []);
          }
          return value;
        });
  });
  queryParams$$ = computed(() => {
    return this.field$$().props()['queryParams'];
  });
  data$ = resource({
    params: computed(() => {
      const params = this.queryParams$$();
      return {
        data: this.rawData$$(),
        params,
      };
    }),
    loader: async (res) => {
      const { params } = res;
      let dataResult = await params.data;
      return dataResult(res as any).then((data: any) => {
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
