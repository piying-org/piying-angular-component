import { NgClass, NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { ThemeService } from '@piying/angular-daisyui/service';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';

@Component({
  selector: 'app-carousel',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, NgClass, CssPrefixPipe, MergeClassPipe],
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
  #theme = inject(ThemeService);
  ngClass$$ = computed(() => {
    return clsx([
      this.#theme.addPrefix2('carousel', this.direction()),
      this.#theme.addPrefix2('carousel', this.scrollAlign()),
    ]);
  });
}
