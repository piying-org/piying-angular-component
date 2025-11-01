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
  selector: 'app-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFCC),
      multi: true,
    },
  ],
})
export class InputFCC extends BaseControl {
  static __version = 2;
  type = input<
    | 'text'
    | 'password'
    | 'email'
    | 'number'
    | 'date'
    | 'datetime-local'
    | 'week'
    | 'month'
    | 'tel'
    | 'url'
    | 'search'
    | 'time'
  >('text');
  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');

  wrapperClass$$ = computed(() => {
    let list = [];
    if (this.ghost()) {
      list.push(`input-ghost`);
    }
    return clsx(list);
  });
}
