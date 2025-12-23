import { JsonPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Injector,
  input,
  linkedSignal,
  model,
  resource,
  ResourceRef,
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

import { NFCSchema, setComponent, actions, Writeable } from '@piying/view-angular-core';
import { TableRowFGC } from './row/component';
import { TdWC, ThWC } from '@piying/angular-daisyui/wrapper';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { TABLE_STATUS_TOKEN } from './token';
// import { QueryService } from './query.service';
import { localData } from './local-data';
import { LoadingData } from './type';

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

export function createRowDefine() {
  return v.pipe(v.tuple([]), setComponent(TableRowFGC));
}
export function createDefaultColDefine(isHeader: boolean, content: any, context?: any) {
  return v.pipe(
    NFCSchema,
    setComponent(StrOrTemplateComponent),
    actions.inputs.patch({ content, context }),
    actions.wrappers.set([{ type: isHeader ? ThWC : TdWC }]),
  );
}
export function createDefaultColDefineFn(
  isHeader: boolean,
  content: (item: any, index: number) => any,
  context?: any,
) {
  return v.pipe(
    NFCSchema,
    setComponent(StrOrTemplateComponent),
    actions.inputs.patch({ context }),
    actions.inputs.patchAsync({
      content: ({ context }) => {
        return computed(() => {
          let item = context['item$']();
          return content(item, context['index']);
        });
      },
    }),
    actions.wrappers.set([{ type: isHeader ? ThWC : TdWC }]),
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
})
export class TableNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  define = input<TableItemDefine2>();
  // todo待修改
  data = input<any[] | Signal<any[]>>([]);
  injector = inject(Injector);
  data$$ = computed(() => {
    let data = this.data();
    return Array.isArray(data) ? data : data();
  });
  #status = inject(TABLE_STATUS_TOKEN, { optional: true });
  zebra = input<boolean>();
  pin = input<{ rows?: boolean; cols?: boolean }>();
  size = input<Size>();
  trackBy = input((key: number, value: any) => {
    return key;
  });

  pagination = input<{
    sizeOptions?: number[];
    enable: boolean;
    optionsLabel?: (size: number, index: number, count: number) => string;
  }>();
  type = input<'category'>();
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
    let rowList = (define.row?.[name] ?? [{}]).map((item) => {
      return 'define' in item ? (item as RowItem) : { ...item, define: createRowDefine() };
    });

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

  dataConvert(data: any[]): DataResolved {
    if (data.length === 2 && typeof data[0] === 'number' && Array.isArray(data[1])) {
      return data as any;
    }
    return [data.length, data];
  }

  isFunction(input: any) {
    return typeof input === 'function';
  }

  selectorlessInput = (content: any, context?: any) => {
    let obj: Record<string, any> = { content: computed(() => content) };
    if (context) {
      obj['context'] = computed(() => {
        return { ...context, status: this.#status };
      });
    }
    return obj;
  };

  #itemDataMap = new Map<unknown, WritableSignal<any>>();
  getItemData = (id: unknown, value: any) => {
    return untracked(() => {
      let data = this.#itemDataMap.get(id) ?? signal(undefined);
      data.set(value);
      this.#itemDataMap.set(id, data);
      return data;
    });
  };

  isSchema = isSchema;
  categoryHeadData = (data: Signal<any>) => {
    return computed(() => {
      return data()[0];
    });
  };
  categoryBodyData = (data: Signal<any>, index: number) => {
    return computed(() => {
      return data()[1][index];
    });
  };
}
