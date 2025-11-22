import { ResourceLoaderParams } from '@angular/core';
import { dataConvert, DataResolved } from './util';
import { LoadingData } from './type';

export function localData(data: any) {
  let result = dataConvert(data);
  return async (res: LoadingData) => {
    let params = res.params.params?.['page'];
    if (!params) {
      return result;
    }

    let start = params.page.index * params.page.size;

    return [result[0], result[1].slice(start, start + params.page.size)] as DataResolved;
  };
}
