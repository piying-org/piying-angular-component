import * as v from 'valibot';

export type ItemCellBase = string | v.BaseSchema<any, any, any>;
export type ItemCell = ItemCellBase | ((rowData: any, index: number) => any);
export type DataResolved = [number, any[]];

export interface RowItem<Key extends string | number = string | number> {
  define: v.TupleSchema<[], undefined>;
  columns?: Key[];
}
export interface ColumnDefine {
  head?: ItemCellBase;
  body?: ItemCell;
  foot?: ItemCellBase;
}

type FilterKeys<T, DefineProp extends keyof ColumnDefine> = T extends readonly any[]
  ? {
      [K in keyof T]: T[K] extends { [P in DefineProp]?: any }
        ? K extends `${infer N extends number}`
          ? N
          : never
        : never;
    }[number]
  : {
      [K in keyof T]: T[K] extends { [P in DefineProp]?: any }
        ? K extends string
          ? K
          : never
        : never;
    }[keyof T];

type RowItemFactory<Keys extends string | number> = Partial<RowItem<Keys>>[];

export type CreateTableReturn<T> = {
  head?: RowItemFactory<FilterKeys<T, 'head'>>;
  body?: RowItemFactory<FilterKeys<T, 'body'>>;
  foot?: RowItemFactory<FilterKeys<T, 'foot'>>;
};

export function tableInputDefine<
  const Schema extends { [s: string]: ColumnDefine } | readonly ColumnDefine[],
>(schema: Schema) {
  return (fn: () => CreateTableReturn<Schema>) => {
    return {
      row: fn(),
      columns: schema,
    };
  };
}
export type TableItemDefine2 = ReturnType<ReturnType<typeof tableInputDefine>>;
