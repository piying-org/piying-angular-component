import { computed, Injectable, resource, signal } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
import { firstValueFrom, Subject } from 'rxjs';
export type RequestFn =
  | ((
      input: any,
      needUpdate: boolean,
    ) => Promise<readonly [number, any[]]> | readonly [number, any[]])
  | undefined;

@Injectable()
export class TableResourceService {
  EMPTY_VALUE = [0, []];
  #requestFn$ = signal<RequestFn>(undefined);
  #queryParams$ = signal({});
  #nextSubject?: Subject<void>;
  #data$ = resource({
    params: computed(() => {
      const nextPromise = this.#nextSubject;
      const params = this.#queryParams$();
      const requestFn = this.#requestFn$();
      return {
        requestFn,
        params,
        index: this.#updateIndex$(),
        nextPromise,
      };
    }),
    loader: async (res) => {
      const needUpdate = res.params.index !== this.#preUpdateIndex$();
      if (needUpdate) {
        this.#preUpdateIndex$.set(res.params.index);
      }
      if (!res.params.requestFn) {
        return this.EMPTY_VALUE;
      }

      const result = await res.params.requestFn(res.params.params, needUpdate);
      res.params.nextPromise!.next();
      res.params.nextPromise!.complete();

      return result;
    },
  });
  list$$ = computedWithPrev<any[]>((value) => {
    return (this.#data$.value()?.[1] as any[]) ?? value ?? [];
  });
  count$$ = computedWithPrev<number>((value) => {
    return (this.#data$.value()?.[0] as number) ?? value ?? 0;
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
    this.#nextSubject = this.#nextSubject?.observed ? this.#nextSubject : new Subject<void>();
    this.#queryParams$.update((data) => {
      return {
        ...data,
        [key]: value,
      };
    });
    return firstValueFrom(this.#nextSubject);
  }
}
