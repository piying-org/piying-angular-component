import { NgTemplateOutlet, NgClass } from '@angular/common';
import {
  Component,
  computed,
  input,
  linkedSignal,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
@Component({
  selector: 'app-drawer',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, FormsModule, NgClass],
})
export class DrawerFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  name = `drawer-${DrawerFGC.index++}`;
  templateRef = viewChild.required('templateRef');
  contentClass = input();
  sideClass = input();
  mode = input<'push' | 'side'>();
  position = input<'start' | 'end'>();

  contentFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === 'content';
      });
  });
  sideFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === 'side';
      });
  });
  opened = model(false);
  openChanged(value: boolean) {
    this.opened.set(value);
  }
}
