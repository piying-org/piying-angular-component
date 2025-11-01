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
import clsx from 'clsx';
@Component({
  selector: 'app-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleFCC),
      multi: true,
    },
  ],
})
export class ToggleFCC extends BaseControl {
  static __version = 2;

  templateRef = viewChild.required('templateRef');
  indeterminate = input<boolean>();
}
