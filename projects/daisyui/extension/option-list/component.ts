import {
  Component,
  computed,
  effect,
  forwardRef,
  inject,
  input,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AttributesDirective,
  BaseControl,
  PI_INPUT_OPTIONS_TOKEN,
  PI_VIEW_FIELD_TOKEN,
  PiyingView,
} from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  SelectOption,
  transformOption,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
@Component({
  selector: 'app-option-list',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    StrOrTemplateComponent,
    SelectorlessOutlet,
    PurePipe,
  ],
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
    this.valueChange(item.value);
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
