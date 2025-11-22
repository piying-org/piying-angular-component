import { dataConvert, DataResolved } from './util';
import { LoadingData } from './type';

export function localData(data: any) {
  let result = dataConvert(data);
  return async (res: LoadingData) => {
    let page = res.params.params?.['page'];
    let list: any[];
    if (!page) {
      list = result;
    } else {
      let start = page.index * page.size;
      list = result[1].slice(start, start + page.size);
    }
    let direction = res.params.params?.['direction'] as { key: string; value: 1 | -1 }[];
    if (direction) {
      for (const item of direction) {
        list = list.sort((a, b) => {
          let result = a[item.key] > b[item.key] ? 1 : -1;
          return item.value === 1 ? result : -result;
        });
      }
    }
    return [result[0], list] as DataResolved;
  };
}
