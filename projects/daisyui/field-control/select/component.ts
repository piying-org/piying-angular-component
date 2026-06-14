import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  Color,
  CommonSelectOptions,
  DefaultOptionConvert,
  OptionConvert,
  Size,
  transformOptions,
} from '@piying-lib/angular-core';
import { NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { deepEqual } from 'fast-equals';
/**
 * 选择器控件
 *
 * 提供下拉选择功能，支持单选、多选以及原生 select 样式。
 * 适用于需要在多个选项中选择一个或多个的场景。
 */
@Component({
  selector: 'app-select',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
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
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 是否多选 */
  multiple = input(false);
  /** 是否使用幽灵样式 */
  ghost = input<boolean>();
  /** 是否使用原生 select 样式 */
  native = input<boolean>();
  /** 选项列表 */
  options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
    transform: (input) => input ?? [],
  });
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  /** 空选项时显示的内容 */
  emptyOptionContent = input<string>('------');
  compareWith = input(deepEqual);
  resolvedOptions$$ = computed(() => transformOptions(this.options(), this.optionConvert()));

  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('select', this.color()),
      this.#theme.setSize('select', this.size()),
      this.ghost() ? this.#theme.addPrefix('select-ghost') : undefined,
      this.native() ? this.#theme.addTwPrefix('appearance-none') : undefined,
    );
  });
}
