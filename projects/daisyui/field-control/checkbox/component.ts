import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 复选框控件
 * 
 * 提供单个复选框的勾选功能，支持确定、不确定两种状态。
 * 常用于需要选择多个选项的场景。
 */
@Component({
  selector: 'app-checkbox',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxFCC),
      multi: true,
    },
  ],
})
export class CheckboxFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 是否为不确定状态 */
  indeterminate = input<boolean>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('checkbox', this.color()),
      this.#theme.setSize('checkbox', this.size()),
    );
  });
}
