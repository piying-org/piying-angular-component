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
} from '@piying-lib/angular-core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 单选框控件
 * 
 * 提供一组选项中的单选功能，支持通过配置项数组动态生成选项列表。
 * 适用于需要在多个互斥选项中选择一个的场景。
 */
@Component({
  selector: 'app-radio',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioFCC),
      multi: true,
    },
  ],
})
export class RadioFCC extends BaseControl {
  static __version = 2;
  static index = 0;
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  name = `radio-${RadioFCC.index++}`;
  /** 选项列表 */
  options = input<SelectOption[], SelectOption[] | undefined>([], {
    transform: (input) => input ?? [],
  });
  /** 选项模板 */
  optionTemplate = input<TemplateRef<any>>();
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });

  resolvedOptions$$ = computed(() => this.transformOptions(this.options()));
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      const resolvedItem: ResolvedOption = {
        label: this.optionConvert().label(option),
        value: this.optionConvert().value(option),
        disabled: this.optionConvert().disabled?.(option) ?? false,
        description: this.optionConvert().description?.(option),
        type: 'option',
        origin: option,
      };
      return resolvedItem;
    });
  }
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('radio', this.color()),
      this.#theme.setSize('radio', this.size()),
    );
  });
}
