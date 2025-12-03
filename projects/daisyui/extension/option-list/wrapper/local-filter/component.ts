import { Component, computed, effect, OnInit, signal, viewChild } from '@angular/core';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { NFCSchema, patchProps, setComponent } from '@piying/view-angular-core';
import { FilterOptionNFCC } from './filter-option/component';
import * as v from 'valibot';
@Component({
  selector: 'app-local-filter',
  template: `<ng-template #templateRef>
    <ng-container #fieldComponent></ng-container
  ></ng-template>`,
})
export class OptionListLocalFilterWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  searchContent = signal('');
  fileterOption = { type: 'local-filter' };
  constructor() {
    super();
    this.field$$().props.update((a) => {
      return { ...a, searchContent: this.searchContent };
    });
    this.field$$().inputs.update((a) => {
      return {
        ...a,
        optionTemplate: {
          ...a?.['optionTemplate'],
          'local-filter': v.pipe(
            NFCSchema,
            setComponent(FilterOptionNFCC),
            patchProps({ seachContent: this.searchContent }),
          ),
        },
        options: [],
      };
    });
    effect(() => {
      let content = this.searchContent();
      let list = this.field$$().props()['options'];
      let filterList = list;
      if (content) {
        // todo custom filter
        filterList = list.filter((item: any) => item.includes(content));
      }

      this.field$$().inputs.update((a) => {
        return {
          ...a,
          options: [this.fileterOption, ...filterList],
        };
      });
    });
  }
}
