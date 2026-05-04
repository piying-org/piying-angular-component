import { Component, computed, forwardRef, inject, input, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { Color, Size } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

/**
 * 数字输入控件
 *
 * 在 input 基础上提供带 +/- 按钮的数字输入功能，支持自定义 step 步进值。
 */
@Component({
  selector: 'app-input-number',
  templateUrl: './component.html',
  imports: [FormsModule, NgTemplateOutlet, AttributesDirective, CssPrefixPipe, MergeClassPipe],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberFCC),
      multi: true,
    },
  ],
})
export class InputNumberFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 最小值 */
  min = input<number>(0);
  /** 最大值 */
  max = input<number>(10);
  /** 步进值 */
  step = input<number>(1);
  /** 按钮位置: 'both' 两边 | 'right' 右侧 */
  buttonPosition = input<'both' | 'right'>('right');

  #theme = inject(ThemeService);

  inputClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('input', this.color()),
      this.#theme.setSize('input', this.size()),
    );
  });

  buttonClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('btn', this.size()),
      this.#theme.setColor('btn', this.color()),
    );
  });

  increment() {
    const step = this.step() ?? 1;
    this.value$.set((this.value$() ?? 0) + step);
    this.applyLimits();
  }

  decrement() {
    const step = this.step() ?? 1;
    this.value$.set((this.value$() ?? 0) - step);
    this.applyLimits();
  }

  onInput(value: number) {
    this.value$.set(value);
    this.applyLimits();
  }

  onBlur() {
    this.touchedChange();
  }

  private applyLimits() {
    const min = this.min();
    const max = this.max();
    if (min !== undefined && this.value$() < min) {
      this.value$.set(min);
    }
    if (max !== undefined && this.value$() > max) {
      this.value$.set(max);
    }
    this.valueChange(this.value$());
  }
}
