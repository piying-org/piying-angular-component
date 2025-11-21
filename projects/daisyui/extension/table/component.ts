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
import { computedWithPrev, isSchema, Size } from '@piying/angular-daisyui/util';
import { range } from 'es-toolkit';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';
import * as v from 'valibot';
import { FormsModule } from '@angular/forms';
import { SortDirection, SortService } from '../../service/sort/sort.service';
import {
  CheckBoxConfig,
  CheckboxService,
} from '../../service/table-checkbox/table-checkbox.service';
import {
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  setComponent,
  setWrappers,
  Writeable,
} from '@piying/view-angular-core';
import { TableRowFGC } from './row/component';
import { TdWC, ThWC } from '@piying/angular-daisyui/wrapper';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
export type ItemCellBase = string | v.BaseSchema<any, any, any>;
export type ItemCell = ItemCellBase | ((rowData: any) => any);
export type DataResolved = [number, any[]];

interface RowItem {
  define: v.TupleSchema<[], undefined>;
  columns?: (string | number)[];
}

interface ColumnDefine {
  head?: ItemCellBase;
  body?: ItemCell;
  foot?: ItemCellBase;
}
type ColumnGroupDefine = { [s: string]: ColumnDefine } | ArrayLike<ColumnDefine>;
export interface TableItemDefine2 {
  row?: {
    head?: RowItem[];
    body?: RowItem[];
    foot?: RowItem[];
  };

  columns: ColumnGroupDefine;
}
function goPage(value: number) {
  return { type: 'go' as const, value };
}
export type TableQueryParams = {
  params: any;
  data: any[] | ((config: any) => Promise<any[]>);
  page: {
    size: number;
    index: number;
  };
  direction: Record<string, SortDirection>;
};

export function createRowDefine() {
  return v.pipe(v.tuple([]), setComponent(TableRowFGC));
}
export function createDefaultColDefine(isHeader: boolean, content: any, context?: any) {
  return v.pipe(
    NFCSchema,
    setComponent(StrOrTemplateComponent),
    patchInputs({ content, context }),
    setWrappers([{ type: isHeader ? ThWC : TdWC }]),
  );
}
export function createDefaultColDefineFn(
  isHeader: boolean,
  content: (item: any) => any,
  context?: any,
) {
  return v.pipe(
    NFCSchema,
    setComponent(StrOrTemplateComponent),
    patchInputs({ context }),
    patchAsyncInputs({
      content: ({ context }) => {
        return computed(() => {
          let item = context['item$']();
          return content(item);
        });
      },
    }),
    setWrappers([{ type: isHeader ? ThWC : TdWC }]),
  );
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
    CssPrefixPipe,
    MergeClassPipe,
  ],
  providers: [SortService, CheckboxService],
})
export class TableNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  sortMultiple = input<boolean>();
  checkboxConfig = input<CheckBoxConfig<any>>();
  define = input<TableItemDefine2>();
  data = input<any[] | ((config: any) => Promise<any[]>)>([]);
  #sortService = inject(SortService);
  #checkboxService = inject(CheckboxService);

  zebra = input<boolean>();
  pin = input<{ rows?: boolean; cols?: boolean }>();
  size = input<Size>();
  params = input<any>();
  page = model<{ size: number; index: number }>({ size: 10, index: 0 });
  pagination = input<{
    sizeOptions?: number[];
    enable: boolean;
    optionsLabel?: (size: number, index: number, count: number) => string;
  }>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return clsx(
      this.zebra() ? this.#theme.addPrefix(`table-zebra`) : undefined,
      this.pin()?.rows ? this.#theme.addPrefix(`table-pin-rows`) : undefined,
      this.pin()?.cols ? this.#theme.addPrefix(`table-pin-cols`) : undefined,
      this.#theme.setSize('table', this.size()),
    );
  });
  columnsList$$ = computed(() => {
    return Object.values(this.define()!.columns);
  });
  headList$$ = computed(() => {
    return this.#toColList('head');
  });
  bodyList$$ = computed(() => {
    return this.#toColList('body');
  });
  footList$$ = computed(() => {
    return this.#toColList('foot');
  });
  #toColList<T extends 'head' | 'body' | 'foot'>(name: T) {
    let define = this.define()!;
    let rowList = define.row?.[name]
      ? define.row[name]
      : [{ define: createRowDefine() } as RowItem];
    let isHeader = name === 'head';
    return rowList
      .map((row) => {
        let colList;
        if (!row.columns) {
          colList = this.columnsList$$().map((item) => item[name]);
        } else {
          colList = row.columns.map((col) => {
            let item = (define.columns as any)[col][name];
            return item;
          });
        }
        colList = colList
          .map((itemDefine) => {
            if (itemDefine) {
              if (isSchema(itemDefine)) {
                return itemDefine;
              } else if (typeof itemDefine === 'function') {
                return createDefaultColDefineFn(isHeader, itemDefine);
              } else {
                return createDefaultColDefine(isHeader, itemDefine);
              }
            }
            return undefined;
          })
          .filter(Boolean);
        if (colList.length) {
          (row.define as Writeable<v.TupleSchema<any, any>>).items.push(...colList);
          return row.define;
        }
        return undefined;
      })
      .filter((a): a is v.TupleSchema<any, undefined> => !!a);
  }
  data$ = resource({
    params: () => {
      let data = this.data();
      let direction = this.#sortService.direction$();
      return {
        params: this.params(),
        data: data,
        page: this.page(),
        direction,
        sortInited: this.#sortService.inited$(),
      };
    },
    loader: async (res) => {
      let { params } = res;
      if (typeof params.data === 'function') {
        return params.data(res).then((data) => {
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
    if (changes.checkboxConfig && this.checkboxConfig()) {
      this.#checkboxService.init(this.checkboxConfig()!);
    }
  }
  constructor() {
    this.#checkboxService.setAllList(() => {
      return this.list$$();
    });
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
