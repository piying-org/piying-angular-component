import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  transformOptions,
  useTwClass,
} from '@piying/angular-daisyui/util';
import { NgTemplateOutlet, NgClass } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-dropdown',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
  ],
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
  align = input<'start' | 'center' | 'end'>();
  position = input<'top' | 'bottom' | 'left' | 'right'>();
  triggerAction = input<'hover' | 'open'>();
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
  optionsClass = input(useTwClass('bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm'));
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      'dropdown',
      this.align() ? this.#theme.addPrefix(`dropdown-${this.align()}`) : undefined,
      this.position() ? this.#theme.addPrefix(`dropdown-${this.position()}`) : undefined,
      this.triggerAction() ? this.#theme.addPrefix(`dropdown-${this.triggerAction()}`) : undefined,
    );
  });
}
