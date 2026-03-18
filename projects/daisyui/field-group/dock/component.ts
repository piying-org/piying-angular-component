import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, inject, input, linkedSignal, viewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';

import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

/**
 * 舷窗组
 *
 * 底部导航栏（也称为“Dock”或“底部栏”）是一种用户界面元素，用于向用户提供导航选项。该栏固定在屏幕底部。
 */
@Component({
  selector: 'app-dock',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, MatIcon, CssPrefixPipe, MergeClassPipe],
})
export class DockFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  /** 尺寸大小 */
  size = input<Size>();

  /** 当前激活的索引 */
  activatedIndex = input(0);

  activatedIndex$ = linkedSignal(this.activatedIndex);
  toggleActivate(index: number) {
    this.activatedIndex$.set(index);
  }

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('dock', this.size()));
  });
}
