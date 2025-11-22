import { ResourceLoaderParams } from '@angular/core';
import { dataConvert, DataResolved } from './util';
import { LoadingData } from './type';

export function localData(data: any) {
  let result = dataConvert(data);
  return async (res: LoadingData) => {
    let page = res.params.params?.['page'];
    if (!page) {
      return result;
    }
    let start = page.index * page.size;
    return [result[0], result[1].slice(start, start + page.size)] as DataResolved;
  };
}
