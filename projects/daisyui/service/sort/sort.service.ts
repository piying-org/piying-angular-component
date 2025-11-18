import { Injectable, signal } from '@angular/core';

export type SortDirection = 0 | 1 | -1;
@Injectable()
export class SortService {
  direction$ = signal<Record<string, SortDirection>>({});
  multiple?: boolean;
  inited$ = signal(false);
  pendingCount = 0;

  update(key: string, direction: SortDirection) {
    if (this.multiple) {
      this.direction$.update((d) => {
        return {
          ...d,
          [key]: direction,
        };
      });
    } else {
      this.direction$.set({ [key]: direction });
    }
  }
}
