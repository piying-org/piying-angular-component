import { Component, computed, forwardRef, input, TemplateRef, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  SelectOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import clsx from 'clsx';
@Component({
  selector: 'app-select',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet, NgClass],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectFCC),
      multi: true,
    },
  ],
})
export class SelectFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  multiple = input(false);
  type = input<'ghost' | 'native'>();

  /** ---输入--- */
  /** @title 列表
  @default [] */
  options = input<SelectOption[], SelectOption[] | undefined>([], {
    transform: (input) => input ?? [],
  });
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  emptyOptionContent = input<string>('------');

  resolvedOptions$$ = computed(() => this.transformOptions(this.options()));
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      const resolvedItem: ResolvedOption = {
        label: this.optionConvert().label(option),
        value: this.optionConvert().value(option),
        disabled: this.optionConvert().disabled?.(option) ?? false,
        type: 'option',
      };
      return resolvedItem;
    });
  }
  wrapperClass$$ = computed(() => {
    let list = [];
    if (this.type()) {
      list.push(this.type() === 'native' ? 'appearance-none' : `select-${this.type()}`);
    }
    return clsx(list);
  });
}
