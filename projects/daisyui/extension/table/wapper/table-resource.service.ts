import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
export type RequestFn =
  | ((input: any, needUpdate: boolean) => Promise<[number, any[]]> | [number, any[]])
  | undefined;

@Injectable()
export class TableResourceService {
  EMPTY_VALUE = [0, []];
  #requestFn$ = signal<RequestFn>(undefined);
  #queryParams$ = signal({});
  #data$ = resource({
    params: computed(() => {
      const params = this.#queryParams$();
      let requestFn = this.#requestFn$();
      return {
        requestFn,
        params,
        index: this.#updateIndex$(),
      };
    }),
    loader: async (res) => {
      let needUpdate = res.params.index !== this.#preUpdateIndex$();
      if (needUpdate) {
        this.#preUpdateIndex$.set(res.params.index);
      }
      if (!res.params.requestFn) {
        return this.EMPTY_VALUE;
      }

      return res.params.requestFn(res.params.params, needUpdate);
    },
  });
  list$$ = computedWithPrev((value) => {
    return this.#data$.value()?.[1] ?? value ?? [];
  });
  count$$ = computedWithPrev((value) => {
    return this.#data$.value()?.[0] ?? value ?? 0;
  });
  isLoading$$ = computed(() => {
    return this.#data$.isLoading();
  });
  #updateIndex$ = signal(0);
  #preUpdateIndex$ = signal(0);
  needUpdate() {
    this.#updateIndex$.update((a) => ++a);
  }
  setRequest(fn: RequestFn) {
    this.#requestFn$.set(fn);
  }
  setParams(key: string, value: any) {
    this.#queryParams$.update((data) => {
      return {
        ...data,
        [key]: value,
      };
    });
  }
}
