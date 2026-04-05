import { computed, Injectable, resource, signal } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
import { RequestFn, TableResourceService } from './table-resource.service';

@Injectable()
export class InfiniteListService extends TableResourceService {
  override setRequest(
    fn: NonNullable<RequestFn>,
    needReset?: (...args: Parameters<NonNullable<RequestFn>>) => boolean,
  ): void {
    return super.setRequest(async (...args: Parameters<NonNullable<RequestFn>>) => {
      const result = await fn(...args);
      if (needReset?.(...args)) {
        return result;
      }
      return [result[0], [...this.list$$().slice(), ...result[1]]];
    });
  }
}
