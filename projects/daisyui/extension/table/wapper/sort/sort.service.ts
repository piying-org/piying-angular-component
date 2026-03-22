import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, map, shareReplay } from 'rxjs';

export type SortDirection = 0 | 1 | -1;
export type SortList = { key: string; value: SortDirection }[];
@Injectable()
export class SortService {
  #direction$ = new BehaviorSubject<Record<string, SortDirection>>({});
  #restore$ = new BehaviorSubject<Record<string, SortDirection>>({});

  #restore$$ = this.#restore$.pipe(takeUntilDestroyed(), shareReplay());
  sortList = signal<string[] | undefined>(undefined);

  value$$ = this.#direction$.pipe(
    map((value) => {
      return (this.sortList() ?? Object.keys(value))
        .map((key) => {
          return value[key] ? { key: key, value: value[key] } : undefined;
        })
        .filter(Boolean) as unknown as SortList;
    }),
    takeUntilDestroyed(),
    shareReplay(1),
  );
  valueS$$ = toSignal(this.value$$);
  multiple = signal(true);

  /** 设置初始值 */
  setInitValue(object: Record<string, SortDirection>) {
    this.#restore$.next(object);
    this.#direction$.next(object);
  }
  update(key: string, direction: SortDirection) {
    if (this.multiple()) {
      let data = this.#direction$.value;
      if (direction === 0) {
        data = { ...data };
        delete data[key];
      } else {
        data = {
          ...data,
          [key]: direction,
        };
      }
      this.#direction$.next(data);
    } else {
      const data = this.#direction$.value;
      if (direction === 0) {
        if (key in data) {
          this.#direction$.next({});
          return;
        }
      } else {
        Object.keys(this.#direction$.value).forEach((k) => {
          if (k === key) {
            return;
          }
          this.#restore$.next({ [key]: 0 });
        });
        this.#direction$.next({
          [key]: direction,
        });
      }
    }
  }

  listenChange(key: string) {
    return this.#restore$$.pipe(
      map((item) => item[key]),
      filter(Boolean),
    );
  }
}
