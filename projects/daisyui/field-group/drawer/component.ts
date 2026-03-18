import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, model, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
/**
 * 抽屉组
 *
 * 用于将表单字段组织成可侧边抽屉展开/收起的布局，支持覆盖和侧边两种模式。
 * 适合次要或辅助性的字段组，如筛选条件、详细信息、操作面板等。
 */
@Component({
  selector: 'app-drawer',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, FormsModule, CssPrefixPipe, MergeClassPipe],
})
export class DrawerFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  name = `drawer-${DrawerFGC.index++}`;
  templateRef = viewChild.required('templateRef');
  /** 抽屉内容区域 CSS 类名 */
  contentClass = input<string>();
  /** 侧边栏区域 CSS 类名 */
  sideClass = input<string>();
  /** 遮罩层 CSS 类名 */
  overlayClass = input<string>();
  /** 抽屉模式 */
  mode = input<'over' | 'side'>('over');
  /** 抽屉位置 */
  position = input<'start' | 'end'>();
  contentFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === 'content';
      });
  });
  sideFiled$$ = computed(() => {
    return this.field$$()
      .children?.()
      .find((field) => {
        return field.keyPath?.slice(-1)[0] === 'side';
      });
  });
  opened = model(false);
  openChanged(value: boolean) {
    this.opened.set(value);
  }
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.mode() === 'side' && this.opened() ? this.#theme.addPrefix('drawer-open') : undefined,
      this.position() === 'end' ? this.#theme.addPrefix2('drawer', this.position()) : undefined,
    );
  });
}
