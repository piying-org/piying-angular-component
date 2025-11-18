import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
  resource,
  Signal,
  signal,
  SimpleChange,
  untracked,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { computedWithPrev, isSchema } from '@piying/angular-daisyui/util';
import { range } from 'es-toolkit';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';
import * as v from 'valibot';
import { FormsModule } from '@angular/forms';
import { SortService } from '../../service/sort/sort.service';
export type ItemCellBase = string | v.BaseSchema<any, any, any>;
export type ItemCell = ItemCellBase | ((node: any) => ItemCellBase);
export type DataResolved = [number, any[]];
export interface TableItemDefine {
  head: ItemCellBase;
  body: ItemCell;
  foot: ItemCellBase;
}
function goPage(value: number) {
  return { type: 'go' as const, value };
}
@Component({
  selector: 'app-table',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    PurePipe,
    SelectorlessOutlet,
    StrOrTemplateComponent,
    JsonPipe,
    FormsModule,
  ],
  providers: [SortService],
})
export class TableNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  sortMultiple = input<boolean>();
  defineList = input<TableItemDefine[]>();
  data = input<any[] | ((config: any) => Promise<any[]>)>([]);
  #sortService = inject(SortService);

  zebra = input<boolean>();
  params = input<any>();
  page = model<{ size: number; index: number }>({ size: 10, index: 0 });
  pagination = input<{
    sizeOptions?: number[];
    enable: boolean;
    optionsLabel?: (size: number, index: number, count: number) => string;
  }>();
  data$ = resource({
    params: () => {
      let data = this.data();
      let direction = this.#sortService.direction$();
      return {
        params: this.params(),
        data: data,
        page: this.page(),
        direction,
      };
    },
    loader: async ({ params }) => {
      if (typeof params.data === 'function') {
        return params.data(params.params).then((data) => {
          return this.dataConvert(data);
        });
      }
      let start = params.page.index * params.page.size;
      let result = this.dataConvert(params.data);
      result[1] = result[1].slice(start, start + params.page.size);

      return result;
    },
  });
  ngOnChanges(changes: Record<keyof TableNFCC, SimpleChange>): void {
    if (changes.sortMultiple) {
      this.#sortService.multiple = this.sortMultiple();
    }
  }
  dataConvert(data: any[]): DataResolved {
    if (data.length === 2 && typeof data[0] === 'number' && Array.isArray(data[1])) {
      return data as any;
    }
    return [data.length, data];
  }
  list$$ = computedWithPrev<any[]>((prev) => {
    return this.data$.value()?.[1] ?? prev!;
  });
  count$$ = computedWithPrev<number>((prev) => {
    return this.data$.value()?.[0] ?? prev!;
  });
  maxPageCount$$ = computed(() => {
    return Math.ceil(this.count$$() / this.page().size);
  });
  // currentPage$ = signal(0);
  pageRange$$ = computed(() => {
    let list = [];
    let current = this.page().index;
    let fullStart = current - 4 < 0;
    let fullEnd = current + 5 > this.maxPageCount$$();
    if (fullStart) {
      let index = current - 1;
      while (index !== -1) {
        list.unshift(goPage(index));
        index--;
      }
    } else {
      let index = current - 1;
      while (index !== -1 && current - index !== 2) {
        list.unshift(goPage(index));
        index--;
      }
      list.push({ type: 'prev', value: 5 });
    }
    list.push(goPage(current));

    if (fullEnd) {
      let index = current + 1;
      while (index < this.maxPageCount$$()) {
        list.push(goPage(index));
        index++;
      }
    } else {
      let index = current + 1;

      while (index < this.maxPageCount$$() && index - current !== 2) {
        list.push(goPage(index));
        index++;
      }
      list.push({ type: 'next', value: 5 });
    }

    return list;
  });
  isFunction(input: any) {
    return typeof input === 'function';
  }

  selectorlessInput = (content: any, context?: any) => {
    let obj: Record<string, any> = { content: computed(() => content) };
    if (context) {
      obj['context'] = computed(() => {
        return context;
      });
    }
    return obj;
  };
  gotoPage(value: number) {
    this.page.update((data) => {
      return { ...data, index: value };
    });
  }
  #itemDataMap = new Map<number, WritableSignal<any>>();
  getItemData = (index: number, item: any) => {
    return untracked(() => {
      let data = this.#itemDataMap.get(index) ?? signal(undefined);
      data.set(item);
      this.#itemDataMap.set(index, data);
      return data;
    });
  };
  isSchema = isSchema;
  pageSizeChange(value: number) {
    this.page.update((item) => {
      return { ...item, size: value };
    });
  }
}
