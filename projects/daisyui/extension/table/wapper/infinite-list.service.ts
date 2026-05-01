import { computed, Injectable, signal, untracked } from '@angular/core';
import { computedWithPrev } from '@piying-lib/angular-core';
import { TableResourceService } from './table-resource.service';

@Injectable()
export class InfiniteListService extends TableResourceService {
  version$ = signal(0);
  updateVersion() {
    return this.version$.update((a) => a + 1);
  }
  #allList$$ = computedWithPrev<{ version: number; data: any[] }>((input) => {
    const v = untracked(() => this.version$());
    const list = this.list$$();

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
