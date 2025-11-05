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
  Color,
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  SelectOption,
  Size,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import clsx from 'clsx';
import { ThemeService } from '@piying/angular-daisyui/service/theme.service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
@Component({
  selector: 'app-select',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
  ],
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
  color = input<Color>();
  size = input<Size>();
  multiple = input(false);
  ghost = input<boolean>();
  native = input<boolean>();
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
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('select', this.color()),
      this.#theme.setSize('select', this.size()),
      this.ghost() ? this.#theme.addPrefix('select-ghost	') : undefined,
      this.native() ? this.#theme.addTwPrefix('appearance-none') : undefined,
    );
  });
}
