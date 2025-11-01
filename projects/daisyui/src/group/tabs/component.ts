import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-tabs',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet, AttributesDirective, MatIcon, NgClass],
})
export class TabsFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  name = `pc-tabs-${TabsFGC.index++}`;
  activatedIndex = input(0);
  type = input<'box' | 'border' | 'lift' | undefined>();
  placement = input<'top' | 'bottom'>();
  activatedIndex$ = linkedSignal(this.activatedIndex);
  toggleActivate(index: number) {
    this.activatedIndex$.set(index);
  }
  wrapperClass$$ = computed(() => {
    let list: string[] = [];
    if (this.type()) {
      list.push(`tabs-${this.type()}`);
    }
    if (this.placement()) {
      list.push(`tabs-${this.placement()}`);
    }
    return clsx(list);
  });
}
