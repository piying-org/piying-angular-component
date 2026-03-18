import { Component, computed, inject, input, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AttributesDirective } from '@piying/view-angular';

import { NgClass } from '@angular/common';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';

/**
 * 下拉菜单组件
 * 用于在有限空间内展示多个操作选项或列表项
 * 支持悬停或点击触发，可配置菜单对齐方式和显示位置
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    TwPrefixPipe,
    SelectorlessOutlet,
  ],
})
export class DropdownNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  /** 标题内容 */
  title = input('Default');
  /** 标题 CSS 类名 */
  titleClass = input<string>();
  /** 对齐方式 */
  align = input<'start' | 'center' | 'end'>();
  /** 位置 */
  position = input<'top' | 'bottom' | 'left' | 'right'>();
  /** 触发动作 */
  triggerAction = input<'hover' | 'open'>();
  /** 内容 */
  content = input();
  /** 内容 CSS 类名 */
  contentClass = input<string>();
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('dropdown'),
      this.align() ? this.#theme.addPrefix(`dropdown-${this.align()}`) : undefined,
      this.position() ? this.#theme.addPrefix(`dropdown-${this.position()}`) : undefined,
      this.triggerAction() ? this.#theme.addPrefix(`dropdown-${this.triggerAction()}`) : undefined,
    );
  });
}
