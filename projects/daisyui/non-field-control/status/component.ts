import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color, Size } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 状态指示器组件
 * 用于显示对象的当前状态（如在线、离线、完成等），常用于列表项或卡片中
 * 支持多种动画效果（ping、bounce）增强视觉提示
 */
@Component({
  selector: 'app-status',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, TwPrefixPipe, MergeClassPipe],
})
export class StatusNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 内容 */
  content = input('Default');
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 是否启用 ping 动画效果 */
  animatePing = input<boolean>();
  /** 是否启用 bounce 动画效果 */
  animateBounce = input<boolean>();

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.animatePing() ? this.#theme.addPrefix('animate-ping') : undefined,
      this.animateBounce() ? this.#theme.addPrefix('animate-bounce') : undefined,
      this.#theme.setColor('status', this.color()),
      this.#theme.setSize('status', this.size()),
    );
  });
}
