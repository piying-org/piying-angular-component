import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, input, linkedSignal, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe } from '@piying/angular-daisyui/pipe';

import {
  AttributesDirective,
  PiResolvedViewFieldConfig,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-carousel',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, NgClass, CssPrefixPipe],
})
export class CarouselFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  index = CarouselFGC.index++;
  templateRef = viewChild.required('templateRef');
  direction = input<'horizontal' | 'vertical'>();
  scrollAlign = input<'start' | 'center' | 'end'>();
  childIdMap = input((compIndex: number, childIndex: number) => {
    return `carousel-${compIndex}-${childIndex}`;
  });
  ngClass$$ = computed(() => {
    let list = [];
    if (this.direction()) {
      list.push(`carousel-${this.direction()}`);
    }
    if (this.scrollAlign()) {
      list.push(`carousel-${this.scrollAlign()}`);
    }
    return list;
  });
}
