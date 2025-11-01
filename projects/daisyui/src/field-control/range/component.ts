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
@Component({
  selector: 'app-file-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeFCC),
      multi: true,
    },
  ],
})
export class RangeFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  min = input<number>();
  max = input<number>();
  step = input<number>();
}
