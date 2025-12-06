import { computed, inject, Injectable, InjectionToken, signal } from '@angular/core';
import { filter, shareReplay, Subject, tap } from 'rxjs';

export type SortDirection = 0 | 1 | -1;
export const SortMultiToken = new InjectionToken<boolean>('SortMultiToken');
@Injectable()
export class SortService {
  direction$ = signal<Record<string, 1 | -1>>({});
  multiple = inject(SortMultiToken, { optional: true }) ?? true;

  update(key: string, direction: SortDirection) {
    if (this.multiple) {
      this.direction$.update((data) => {
        if (direction === 0) {
          data = { ...data };
          delete data[key];
          return data;
        }
        return {
          ...data,
          [key]: direction,
        };
      });
    } else {
      if (direction === 0) {
        if (key in this.direction$()) {
          this.direction$.set({});
        }
      } else {
        Object.keys(this.direction$()).forEach((k) => {
          if (k === key) {
            return;
          }
          this.#restore$.next({ key: k, value: 0 });
        });
        this.direction$.set({
          [key]: direction,
        });
      }
    }
    this.#update!(this.direction$());
  }

  #update?: (value: any) => void;
  setUpdate(fn: (value: any) => void) {
    this.#update = fn;
  }
  #restore$ = new Subject<{ key: string; value: SortDirection }>();
  listenRestore(key: string) {
    return this.#restore$.pipe(filter((a) => a.key === key));
  }
}
