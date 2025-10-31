import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';
class AccordionItem {
  constructor(field: PiResolvedViewFieldConfig) {}
  isActivated() {}
}
@Component({
  selector: 'app-accordion',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, PurePipe],
})
export class AccordionFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  name = `accordion-${AccordionFGC.index++}`;
  multi = input(false);
  templateRef = viewChild.required('templateRef');

  childTitleFn = input((item: PiResolvedViewFieldConfig) => {
    return item.props()?.['title'] ?? item.keyPath?.slice(-1)[0] ?? '';
  });
  joinChild = input(true);
  childClass = input<string>('collapse-arrow');
  collapseChildClass$$ = computed(() => {
    return this.childClass();
  });

  childName(multi: boolean, index: number) {
    if (multi) {
      return `${this.name}-${index}`;
    }
    return this.name;
  }
}
