import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Size } from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { range } from 'es-toolkit';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-rating',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingFCC),
      multi: true,
    },
  ],
})
export class RatingFCC extends BaseControl {
  static index = 0;
  name = `rating-${RatingFCC.index++}`;
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();

  min = input<number>(1);
  max = input<number>(5);
  half = input<boolean>();
  type = input<'star' | 'star-2' | 'heart'>('star');
  list = computed(() => {
    return range(this.min(), this.max());
  });
  itemClass$$ = computed(() => {
    return this.#theme.addPrefix2('mask', this.type());
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('rating', this.size()));
  });
}
