import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe/merge-class.pipe';
import { ThemeService } from '@piying/angular-daisyui/service';
import { useDefaultClass } from '@piying/angular-daisyui/util';

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
  childClass = input<string>(useDefaultClass('collapse-arrow bg-base-100 border border-base-300'));

  childName(multi: boolean, index: number) {
    if (multi) {
      return `${this.name}-${index}`;
    }
    return this.name;
  }
}
