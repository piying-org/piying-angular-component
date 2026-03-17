import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 分割线组件
 * 用于在内容之间添加视觉分隔，支持水平/垂直方向和内容位置调整
 * 常用于表单、列表、段落之间的分隔
 */
@Component({
  selector: 'app-divider',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class DividerNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Color>();
  direction = input<'horizontal' | 'vertical'>();
  contentPosition = input<'start' | 'end'>();

  content = input('Default');
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setColor('divider', this.color()),
      this.#theme.addPrefix2('divider', this.direction()),
      this.#theme.addPrefix2('divider', this.contentPosition()),
    );
  });
}
