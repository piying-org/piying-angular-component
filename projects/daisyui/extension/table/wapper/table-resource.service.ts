import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
export type RequestFn = ((input: any) => Promise<[number, any[]]> | [number, any[]]) | undefined;
@Injectable()
export class TableResourceService {
  #requestFn$ = signal<RequestFn>(undefined);
  #queryParams$ = signal({});
  #data$ = resource({
    params: computed(() => {
      const params = this.#queryParams$();
      let requestFn = this.#requestFn$();
      this.#updateIndex$();
      return {
        requestFn,
        params,
        index: this.#updateIndex$(),
      };
    }),
    loader: async (res) => {
      if (!res.params.requestFn) {
        return [0, []];
      }
      return res.params.requestFn(res.params.params);
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
