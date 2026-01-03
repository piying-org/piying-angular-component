import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TableStatusService {
  expanded = new BehaviorSubject(undefined);
  updateIndex$ = signal(0);
  toggleExpand(value: any) {
    this.expanded.next(value === this.expanded.value ? undefined : value);
  }
  needUpdate() {
    this.updateIndex$.update((a) => ++a);
  }
}
