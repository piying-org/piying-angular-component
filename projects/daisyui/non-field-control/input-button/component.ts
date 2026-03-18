import { Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttributesDirective, EventsDirective } from '@piying/view-angular';

import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color, Size } from '@piying-lib/angular-core';

/**
 * 表单提交按钮组件
 * 用于表单提交、重置等操作，具有与按钮组件相同的样式特性
 * 常用于表单底部操作区域
 */
@Component({
  selector: 'app-input-button',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, MergeClassPipe, EventsDirective, CssPrefixPipe],
})
export class InputButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  /** 按钮类型 */
  type = input<'reset' | 'submit'>('submit');
  /** 颜色主题 */
  color = input<Color>();
  /** 按钮样式风格 */
  style = input<'outline' | 'dash' | 'soft' | 'ghost' | 'link'>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 形状 */
  shape = input<'wide' | 'block' | 'square' | 'circle'>();
  /** 是否激活状态 */
  active = input<boolean>();
  /** 点击事件处理函数 */
  clicked = input<(event: PointerEvent) => void | Promise<void>>();
  /** 是否禁用 */
  disabled = input(false);
  isLoading$ = signal(false);

  async onClick(event: PointerEvent) {
    this.isLoading$.set(true);
    try {
      await this.clicked()?.(event);
    } catch (error) {
      throw error;
    } finally {
      this.isLoading$.set(false);
    }
  }

  #theme = inject(ThemeService);
  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('btn'),
      this.#theme.setColor('btn', this.color()),
      this.#theme.setSize('btn', this.size()),
      this.style() ? this.#theme.addPrefix(`btn-${this.style()}`) : undefined,
      this.shape() ? this.#theme.addPrefix(`btn-${this.shape()}`) : undefined,
      this.active() ? this.#theme.addPrefix(`btn-active`) : undefined,
    );
  });
}
