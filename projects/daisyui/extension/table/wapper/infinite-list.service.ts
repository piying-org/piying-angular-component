import { computed, Injectable, resource, Signal, signal, untracked } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
import { RequestFn, TableResourceService } from './table-resource.service';

@Injectable()
export class InfiniteListService extends TableResourceService {
  version$ = signal(0);
  updateVersion() {
    return this.version$.update((a) => a + 1);
  }
  #allList$$ = computedWithPrev<{ version: number; data: any[] }>((input) => {
    let v = untracked(() => this.version$());
    let list = this.list$$();

    if (input?.version !== v) {
      return {
        version: v,
        data: list,
      };
    }
    return {
      version: v,
      data: input.data.slice().concat(list),
    };
  });
  allList$$ = computed(() => {
    return this.#allList$$().data;
  });
}
