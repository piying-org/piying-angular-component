import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color, Size } from '@piying-lib/angular-core';
import { AttributesDirective, EventsDirective } from '@piying/view-angular';

/**
 * 徽章组件
 * 用于显示数量标签、状态标记或重要提示，如未读消息数、通知提示等
 * 支持多种样式风格和颜色尺寸配置
 */
@Component({
  selector: 'app-badge',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, SelectorlessOutlet, EventsDirective],
})
export class BadgeNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  /** 样式风格 */
  style = input<'outline' | 'dash' | 'soft' | 'ghost'>();
  /** 颜色主题 */
  color = input<Color>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 内容 */
  content = input('Badge');

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('badge'),
      this.#theme.setColor('badge', this.color()),
      this.#theme.setSize('badge', this.size()),
      this.#theme.setSize('badge', this.style()),
    );
  });
}
