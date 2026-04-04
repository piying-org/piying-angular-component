import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService, useTwClass } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

/**
 * 卡片组
 *
 * 用于将表单字段组织成卡片式布局，支持标题、图片和操作区的自定义。
 * 适合需要突出显示每组字段、创建美观表单界面的场景，如用户资料编辑、表单 Wizard 等。
 */
@Component({
  selector: 'app-card',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class CardFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 边框样式 */
  border = input<'border' | 'dash'>();
  /** 尺寸大小 */
  size = input<Size>();

  /** 内容区域 CSS 类名 */
  bodyClass = input<string>();
  /** 图片区域 CSS 类名 */
  figureClass = input<string>();
  /** 操作区域 CSS 类名 */
  actionsClass = input(useTwClass('justify-end'));
  /** 标题字段键名 */
  titleKey = input('title');
  /** 图片字段键名 */
  figureKey = input('figure');
  /** 操作字段键名 */
  actionsKey = input('actions');
  bodyKey = input('body');
  titleFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.titleKey();
      });
  });
  figureFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.figureKey();
      });
  });
  actionsFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.actionsKey();
      });
  });
  bodyChildren$$ = computed(() => {
    let item = this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === this.bodyKey();
      });
    return item
      ? [item]
      : this.field$$()
          .children?.()
          .filter((field) => {
            const key = field.keyPath?.slice(-1)[0];
            return !(
              key === this.titleKey() ||
              key === this.figureKey() ||
              key === this.actionsKey()
            );
          });
  });
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('card', this.size()),
      this.#theme.addPrefix2('card', this.border()),
    );
  });
}
