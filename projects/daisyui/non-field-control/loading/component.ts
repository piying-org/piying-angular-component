import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 加载指示器组件
 * 用于在数据加载、请求处理等异步操作期间显示加载状态
 * 提供多种样式类型（-spinner、dots、ring 等）供选择
 */
@Component({
  selector: 'app-loading',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class LoadingNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();
  type = input<'spinner' | 'dots' | 'ring' | 'ball' | 'bars' | 'infinity'>();
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.setSize('loading', this.size()),
      this.type() ? this.#theme.addPrefix(`loading-${this.type()}`) : undefined,
    );
  });
}
