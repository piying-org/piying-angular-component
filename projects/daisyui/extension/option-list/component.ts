import { Component, forwardRef, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseControl, PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  SelectOption,
  transformOption,
} from '@piying-lib/angular-core';
import { NgTemplateOutlet } from '@angular/common';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-option-list',
  templateUrl: './component.html',
  imports: [FormsModule, NgTemplateOutlet, SelectorlessOutlet, PurePipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OptionListFCC),
      multi: true,
    },
  ],
})
export class OptionListFCC extends BaseControl {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  options = input<SelectOption[], SelectOption[] | undefined>([], {
    transform: (input) => input ?? [],
  });
  optionTemplate = input<Record<string, any>>();
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  // listFilter=computed(() => {
  //   return this.field$$().props()['filter']
  // })
  transformOption = transformOption;
  optionInput = (content: any) => {
    return {
      content: signal(content),
    };
  };
  selectOption(item: ResolvedOption) {
    this.valueAndTouchedChange(item.value);
  }

  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  getInput$$ = (schema: any) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    } as any;
  };
  activateClass = (a: any, b: any) => {
    return a === b ? 'menu-active' : '';
  };
}

// 加item/group和注册
