import { inject, Injectable, InjectionToken, signal } from '@angular/core';

export type SortDirection = 0 | 1 | -1;
export const SortMultiToken = new InjectionToken<boolean>('SortMultiToken');
@Injectable()
export class SortService {
  direction$ = signal({});
  multiple = inject(SortMultiToken, { optional: true }) ?? true;

  update(key: string, direction: SortDirection) {
    if (this.multiple) {
      this.direction$.set({
        ...this.direction$(),
        [key]: direction,
      });
    } else {
      this.direction$.set({
        [key]: direction,
      });
    }
    this.#update!(this.direction$());
  }

  #update?: (value: any) => void;
  setUpdate(fn: (value: any) => void) {
    this.update = fn;
  }
}
