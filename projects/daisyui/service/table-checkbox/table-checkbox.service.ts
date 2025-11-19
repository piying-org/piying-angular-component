import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
export type CheckBoxConfig<D> =
  | boolean
  | {
      key: string;
      selected?: D[];
      multiple: boolean;
      compareWith?: (o1: D, o2: D) => boolean;
    }[];
const defaultKey = 'default';
@Injectable()
export class CheckboxService<D = any> {
  #selectModelMap = new Map<string, SelectionModel<D>>();
  init(define: CheckBoxConfig<D>) {
    this.#selectModelMap.clear();
    if (Array.isArray(define)) {
      define.forEach((item) => {
        this.#selectModelMap.set(
          item.key,
          new SelectionModel(item.multiple, item.selected, false, item.compareWith),
        );
      });
    } else {
      this.#selectModelMap.set(defaultKey, new SelectionModel(define));
    }
  }
  toggle(key = defaultKey, value: any) {
    let result = this.#selectModelMap.get(key);
    result?.toggle(value);
  }
  #fn: (() => D[]) | undefined;
  setAllList(fn: () => D[]) {
    this.#fn = fn;
  }

  selectAll(key = defaultKey) {
    let list = this.#fn!();
    let result = this.#selectModelMap.get(key)!;
    let isAll = list.every((item) => {
      return result.isSelected(item);
    });
    for (const item of list) {
      if (isAll) {
        result.deselect(item);
      } else {
        result.select(item);
      }
    }
  }
}
