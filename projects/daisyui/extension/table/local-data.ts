import { dataConvert, DataResolved } from './util';
import { LoadingData } from './type';
function defaultCompare(key: string) {
  return (a: any, b: any) => {
    return a[key] > b[key] ? 1 : -1;
  };
}

// query=>sort=>page
export interface LocalSearchOptions {
  filterFn?: (item: any, queryParams: Record<string, any>) => boolean;
  sortCompareMap?: Record<string, (a: any, b: any) => number>;
}
export function localData(data: any, options?: LocalSearchOptions) {
  const result = dataConvert(data);
  return async (res: LoadingData) => {
    let list = result[1];
    if (options?.filterFn) {
      list = list.filter((item) => options.filterFn!(item, res.params.params?.['filter']));
    }

    const direction = res.params.params?.['direction'] as { key: string; value: 1 | -1 }[];
    if (direction) {
      for (const item of direction) {
        let compareFn = options?.sortCompareMap
          ? options.sortCompareMap[item.key]
          : defaultCompare(item.key);
        list = list.sort((a, b) => {
          const result = compareFn(a, b);
          return item.value === 1 ? result : -result;
        });
      }
    }
    const page = res.params.params?.['page'];
    if (!page) {
      list = list;
    } else {
      const start = page.index * page.size;
      list = list.slice(start, start + page.size);
    }
    return [result[0], list] as DataResolved;
  };
}
