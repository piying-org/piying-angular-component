import { SelectionModel } from '@angular/cdk/collections';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, map, shareReplay, switchMap } from 'rxjs';

@Injectable()
export class TableStatusService {
  #sm = new BehaviorSubject<SelectionModel<unknown> | undefined>(undefined);
  updateIndex$ = signal(0);
  toggleExpand(value: any) {
    this.#sm.value!.toggle(value);
  }
  selectExpand(value: any) {
    this.#sm.value!.select(value);
  }
  deselectExpand(value: any) {
    this.#sm.value!.deselect(value);
  }
  clearExpand() {
    this.#sm.value!.clear();
  }
  needUpdate() {
    this.updateIndex$.update((a) => ++a);
  }
  setSelectionModel(input: any = {}) {
    this.#sm.next(
      new SelectionModel(
        input._multiple,
        input.initiallySelectedValues,
        input._emitChanges,
        input.compareWith,
      ),
    );
  }
  selectionModel$$ = this.#sm.pipe(
    switchMap((sm) => sm!.changed),
    map(() => {
      return this.#sm.value!;
    }),
    takeUntilDestroyed(),
    shareReplay(1),
  );
}
