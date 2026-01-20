import { computed, effect, inject, Injectable, Injector, untracked } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { Subject } from 'rxjs';
export type CheckBoxConfig<D> =
  | boolean
  | {
      config: {
        key: string;
        selected?: D[];
        multiple: boolean;
        compareWith?: (o1: D, o2: D) => boolean;
      }[];
      autoDataBind?: boolean;
    };
const defaultKey = 'default';
@Injectable()
export class CheckboxService<D = any> {
  #selectModelMap = new Map<string, SelectionModel<D>>();
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  #data$$ = computed(() => {
    return this.#field$$().inputs()['data'];
  });
  #injector = inject(Injector);

  #defaultDataBind() {
    effect(
      () => {
        const data = this.#data$$();
        untracked(() => {
          this.setAllList(() => {
            return Array.isArray(data) ? data : data();
          });
        });
      },
      { injector: this.#injector },
    );
  }
  init(define: CheckBoxConfig<D>) {
    this.#selectModelMap.clear();
    if (typeof define === 'boolean') {
      this.#selectModelMap.set(defaultKey, new SelectionModel(define));
      this.#allEvent.set(defaultKey, new Subject());
      this.#defaultDataBind();
    } else {
      define.config.forEach((item) => {
        this.#selectModelMap.set(
          item.key,
          new SelectionModel(item.multiple, item.selected, false, item.compareWith),
        );
        this.#allEvent.set(item.key, new Subject());
      });
      if (define.autoDataBind) {
        this.#defaultDataBind();
      }
    }
  }
  toggle(key = defaultKey, value: any) {
    const result = this.#selectModelMap.get(key);
    result!.toggle(value);
  }
  set(key = defaultKey, value: any, selected: boolean) {
    const result = this.#selectModelMap.get(key);
    if (selected) {
      result!.select(value);
    } else {
      result!.deselect(value);
    }
  }
  #fn: (() => D[]) | undefined;
  /** 用来设置一个获得所有列表数据的方法 */
  setAllList(fn: () => D[]) {
    this.#fn = fn;
  }
  #allEvent = new Map<string, Subject<boolean>>();
  selectAll(key = defaultKey) {
    const list = this.#fn!();
    const result = this.#selectModelMap.get(key)!;
    const isAllSelect = list.every((item) => {
      return result.isSelected(item);
    });
    let event$ = this.#allEvent.get(key)!;
    if (isAllSelect) {
      result.clear();
    } else {
      list.forEach((item) => {
        result.select(item);
      });
    }

    event$.next(!isAllSelect);
  }
  listenAllSelect(modelKey = defaultKey) {
    return this.#allEvent.get(modelKey)!;
  }
}
