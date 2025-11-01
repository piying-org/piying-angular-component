import { Component, computed, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import clsx from 'clsx';
@Component({
  selector: 'app-textarea',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaFCC),
      multi: true,
    },
  ],
})
export class TextareaFCC extends BaseControl {
  static __version = 2;

  ghost = input<boolean>();
  templateRef = viewChild.required('templateRef');

  wrapperClass$$ = computed(() => {
    let list = [];
    if (this.ghost()) {
      list.push(`textarea-ghost`);
    }
    return clsx(list);
  });
}
