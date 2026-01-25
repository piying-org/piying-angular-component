import { computed, effect, inject, Injectable, Injector, untracked } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { Subject } from 'rxjs';
export type CheckBoxConfig<D> = {
  config: {
    key: string;
    selected?: D[];
    multiple: boolean;
    compareWith?: (o1: D, o2: D) => boolean;
  }[];
  autoDataBind?: boolean;
  dataChangeClear?: boolean;
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

  #defaultDataBind(dataChangeClear: boolean = false) {
    effect(
      () => {
        const data1 = this.#data$$();
        let data2 = Array.isArray(data1) ? data1 : data1?.();

        untracked(() => {
          this.setAllList(() => {
            return data2;
          });
          if (dataChangeClear) {
            this.clear();
          }
        });
      },
      { injector: this.#injector },
    );
  }
  init(define?: CheckBoxConfig<D>) {
    this.#selectModelMap.clear();
    if (!define) {
      this.#selectModelMap.set(defaultKey, new SelectionModel(true));
      this.#allEvent.set(defaultKey, new Subject());
      this.#defaultDataBind(true);
    } else {
      define.config.forEach((item) => {
        this.#selectModelMap.set(
          item.key,
          new SelectionModel(item.multiple, item.selected, false, item.compareWith),
        );
        this.#allEvent.set(item.key, new Subject());
      });
      if (define.autoDataBind) {
        this.#defaultDataBind(define.dataChangeClear);
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
  selectAll(checked: boolean, key = defaultKey) {
    const list = this.#fn!();
    const result = this.#selectModelMap.get(key)!;
    let event$ = this.#allEvent.get(key)!;
    if (checked) {
      list.forEach((item) => {
        result.select(item);
      });
    } else {
      result.clear();
    }

    event$.next(checked);
  }
  listenAllSelect(key = defaultKey) {
    let result = this.#allEvent.get(key);
    if (!result) {
      throw new Error('CheckboxService not call init');
    }
    return result;
  }

  getSelected(key = defaultKey) {
    return this.#selectModelMap.get(key)!.selected;
  }
  clear() {
    this.#selectModelMap.forEach((item) => {
      item.clear();
    });
    this.#allEvent.forEach((item) => {
      item.next(false);
    });
  }
}
