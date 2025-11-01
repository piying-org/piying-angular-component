import { NgClass } from '@angular/common';
import { Component, computed, input, viewChild } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import clsx from 'clsx';
@Component({
  selector: 'app-divider',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass],
})
export class DividerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input('Default');
  direction = input<'horizontal' | 'vertical'>();
  contentPosition = input<'start' | 'end'>();
  wrapperClass$$ = computed(() => {
    let list = [];
    if (this.direction()) {
      list.push(`divider-${this.direction()}`);
    }
    if (this.contentPosition()) {
      list.push(`divider-${this.contentPosition()}`);
    }
    return clsx(list);
  });
}
