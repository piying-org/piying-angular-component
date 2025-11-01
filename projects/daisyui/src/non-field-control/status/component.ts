import { NgClass } from '@angular/common';
import { Component, computed, input, viewChild } from '@angular/core';
import { Color, Size } from '@piying/angular-daisyui/util';
import { AttributesDirective } from '@piying/view-angular';
import clsx from 'clsx';
@Component({
  selector: 'app-status',
  templateUrl: './component.html',
  imports: [AttributesDirective],
})
export class StatusNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input('Default');
  color = input<Color>('primary');
  size = input<Size>('md');
  animatePing = input<boolean>();
  animateBounce = input<boolean>();
  statusClass$$ = computed(() => {
    let list = [];
    if (this.color()) {
      list.push(`status-${this.color()}`);
    }
    if (this.size()) {
      list.push(`status-${this.size()}`);
    }
    return clsx(list);
  });
}
