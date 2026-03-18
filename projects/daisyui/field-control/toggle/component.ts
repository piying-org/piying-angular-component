import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/**
 * 开关控件
 * 
 * 提供开/关状态切换功能，支持确定和不确定两种状态。
 * 适用于功能开关、选项启用/禁用等场景。
 */
@Component({
  selector: 'app-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleFCC),
      multi: true,
    },
  ],
})
export class ToggleFCC extends BaseControl {
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
      this.#theme.setColor('toggle', this.color()),
      this.#theme.setSize('toggle', this.size()),
    );
  });
}
