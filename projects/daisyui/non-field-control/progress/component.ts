import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Color } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 进度条组件
 * 用于显示操作完成的进度或数据加载的百分比
 * 支持自定义颜色和进度值显示
 */
@Component({
  selector: 'app-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe, PurePipe],
})
export class ProgressNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  /** 颜色主题 */
  color = input<Color>();
  /** 进度值 */
  value = input<number | undefined>();
  /** 最大值 */
  max = input(100);
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setColor('progress', this.color()));
  });

  isNumber(value: any) {
    return typeof value === 'number';
  }
}
