import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
export type QueryParamsOb = { value?: Record<string, any>; loading: boolean };
@Injectable()
export class QueryService {
  registerList$ = new BehaviorSubject<Observable<QueryParamsOb>[]>([]);
  paramsList$$ = this.registerList$.pipe(
    switchMap((list) => {
      return combineLatest(list);
    }),
  );
  isLoading$$ = toSignal(
    this.paramsList$$.pipe(
      map((list) => {
        return list.some((item) => item.loading);
      }),
    ),
  );
  params$$ = toSignal(
    this.paramsList$$.pipe(
      filter((list) => {
        return list.every((item) => !item.loading);
      }),
      map((list) => {
        return list.reduce(
          (obj, item) => {
            obj = { ...obj, ...item.value };
            return obj;
          },
          {} as Record<string, any>,
        );
      }),
    ),
  );
  connect(data: Observable<QueryParamsOb>) {
    this.registerList$.next([...this.registerList$.value, data]);
  }
}
