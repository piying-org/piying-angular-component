import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class TableStatusService {
  expanded = new BehaviorSubject(undefined);

  toggleExpand(value: any) {
    this.expanded.next(value === this.expanded.value ? undefined : value);
  }
}
