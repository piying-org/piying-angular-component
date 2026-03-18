import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import clsx from 'clsx';
/**
 * 走马灯组
 *
 * 用于横向或纵向滚动展示多个表单字段，支持自动滚动和对齐方式设置。
 * 适合字段较多且需要空间节省的场景，如多步骤表单、长列表项展示等。
 */
@Component({
  selector: 'app-carousel',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, CssPrefixPipe, MergeClassPipe],
})
export class CarouselFGC extends PiyingViewGroupBase {
  static __version = 2;
  static index = 0;
  index = CarouselFGC.index++;
  templateRef = viewChild.required('templateRef');
  /** 滚动方向 */
  direction = input<'horizontal' | 'vertical'>();
  /** 滚动对齐方式 */
  scrollAlign = input<'start' | 'center' | 'end'>();
  /** 子项 ID 映射函数 */
  childIdMap = input((compIndex: number, childIndex: number) => {
    return `carousel-${compIndex}-${childIndex}`;
  });
  #theme = inject(ThemeService);
  ngClass$$ = computed(() => {
    return clsx([
      this.#theme.addPrefix2('carousel', this.direction()),
      this.#theme.addPrefix2('carousel', this.scrollAlign()),
    ]);
  });
}
