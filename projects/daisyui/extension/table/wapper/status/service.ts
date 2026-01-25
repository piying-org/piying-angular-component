import { SelectionModel } from '@angular/cdk/collections';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { BehaviorSubject, filter, map, shareReplay, switchMap, tap } from 'rxjs';

@Injectable()
export class TableExpandService {
  #sm = new BehaviorSubject<SelectionModel<unknown> | undefined>(undefined);

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

  init(
    input: {
      _multiple?: boolean | undefined;
      initiallySelectedValues?: unknown[] | undefined;
      _emitChanges?: boolean | undefined;
      compareWith?: ((o1: unknown, o2: unknown) => boolean) | undefined;
    } = {},
  ) {
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
    tap((value) => {
      if (!value) {
        throw new Error(`TableStatusService not call init`);
      }
    }),
    switchMap((sm) => sm!.changed),
    map(() => {
      return this.#sm.value!;
    }),
    takeUntilDestroyed(),
    shareReplay(1),
  );
}
