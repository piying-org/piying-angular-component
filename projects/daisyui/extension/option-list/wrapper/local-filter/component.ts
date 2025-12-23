import { Component, computed, effect, inject, OnInit, signal, viewChild } from '@angular/core';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { FilterOptionNFCC } from './filter-option/component';
import * as v from 'valibot';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
@Component({
  selector: 'app-local-filter',
  template: `<ng-template #templateRef> <ng-container insertField></ng-container></ng-template>`,
  imports: [InsertFieldDirective],
})
export class OptionListLocalFilterWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  searchContent = signal('');
  fileterOption = { type: 'local-filter' };
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  constructor() {
    this.field$$().props.update((a) => {
      return { ...a, searchContent: this.searchContent };
    });
    let localFilterDefine =
      this.props$$()['filterDefine'] ?? v.pipe(NFCSchema, setComponent(FilterOptionNFCC));
    this.field$$().inputs.update((a) => {
      return {
        ...a,
        optionTemplate: {
          ...a?.['optionTemplate'],
          'local-filter': v.pipe(
            localFilterDefine,
            actions.props.patch({ seachContent: this.searchContent }),
          ),
        },
        options: [],
      };
    });
    let filterWith =
      this.field$$().props()['filterWith'] ??
      ((list: any[], content: string) => list.filter((item: any) => item.includes(content)));
    effect(() => {
      let content = this.searchContent();
      let list = this.field$$().props()['options'];
      let filterList = list;
      if (content) {
        filterList = filterWith(list, content);
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
