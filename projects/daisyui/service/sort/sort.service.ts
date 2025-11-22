import { inject, Injectable, InjectionToken, signal } from '@angular/core';
import { QueryParamsOb, QueryService } from '../../extension/table/query.service';
import { BehaviorSubject, Subject } from 'rxjs';

export type SortDirection = 0 | 1 | -1;
export const SortMultiToken = new InjectionToken<boolean>('SortMultiToken');
@Injectable()
export class SortService {
  direction$ = new BehaviorSubject<QueryParamsOb>({ value: {}, loading: false });
  multiple = inject(SortMultiToken, { optional: true }) ?? true;

  update(key: string, direction: SortDirection) {
    if (this.multiple) {
      this.direction$.next({
        ...this.direction$.value,
        value: {
          ...this.direction$.value.value,
          [key]: direction,
        },
      });
    } else {
      this.direction$.next({
        ...this.direction$.value,
        value: {
          [key]: direction,
        },
      });
    }
  }

  #query = inject(QueryService);
  constructor() {
    this.#query.connect(this.direction$);
  }
}
