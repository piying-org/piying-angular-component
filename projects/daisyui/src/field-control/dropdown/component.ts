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
  selector: 'app-dropdown',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownFCC),
      multi: true,
    },
  ],
})
export class DropdownFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  content = input('Default');
  multiple = input(false);
  /** ---输入--- */
  /** @title 列表
  @default [] */
  options = input<SelectOption[], SelectOption[] | undefined>([], {
    transform: (input) => input ?? [],
  });
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  optionTemplate = input<TemplateRef<any>>();
}
