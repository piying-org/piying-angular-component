import { Component, computed, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgTemplateOutlet } from '@angular/common';
import { range } from 'es-toolkit';
@Component({
  selector: 'app-rating',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
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
  min = input<number>(1);
  max = input<number>(5);
  half = input<boolean>();
  type = input<'star' | 'star-2' | 'heart'>('star');
  list = computed(() => {
    return range(this.min(), this.max());
  });
  itemClass$$ = computed(() => {
    return `mask-${this.type()}`;
  });
}
