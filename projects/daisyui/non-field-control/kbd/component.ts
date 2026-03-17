import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { Size } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 键盘按键组件
 * 用于展示键盘快捷键或组合键提示，常见于帮助文档、教程或功能说明中
 * 可显示单个按键或按键组合
 */
@Component({
  selector: 'app-kbd',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, CssPrefixPipe, MergeClassPipe],
})
export class KbdNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  size = input<Size>();

  content = input('Default');
  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(this.#theme.setSize('kbd', this.size()));
  });
}
