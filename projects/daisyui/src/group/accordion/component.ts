import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe/merge-class.pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { useDefaultClass, useTwClass } from '@piying/angular-daisyui/util';

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
  imports: [AttributesDirective, NgTemplateOutlet, PurePipe, MergeClassPipe, CssPrefixPipe],
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
  collapseIcon = input<'arrow' | 'plus'>();
  childClass = input<string>(useTwClass('bg-base-100 border border-base-300'));
  #theme = inject(ThemeService);
  childClass$$ = computed(() => {
    return clsx(
      this.#theme.addPrefix2('collapse', this.collapseIcon()),
      this.childClass(),
      this.joinChild() ? this.#theme.addPrefix('join-item') : undefined,
    );
  });
  childName = (multi: boolean, index: number) => {
    if (multi) {
      return `${this.name}-${index}`;
    }
    return this.name;
  };
}
