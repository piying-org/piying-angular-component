import { NgStyle } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 环形进度组件
 * 用于显示圆形的进度指示器，适合空间受限或需要美观展示的场景
 * 支持自定义线宽和进度值配置
 */
@Component({
  selector: 'app-radial-progress',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgStyle, CssPrefixPipe, MergeClassPipe],
})
export class RadialProgressNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  value = input<number>(0);
  valueMap = input((value: number) => {
    return `${value * 100}%`;
  });
  strokeWidth = input<string>();
  value$$ = computed(() => {
    return this.value() * 100;
  });
  #theme = inject(ThemeService);
  wrapperStyle$$ = computed(() => {
    const obj: Record<string, string> = {};
    if (typeof this.strokeWidth() === 'string') {
      obj[this.#theme.addVarPrefix('thickness')] = this.strokeWidth()!;
    }
    if (typeof this.value$$() === 'number') {
      obj[this.#theme.addVarPrefix('value')] = `${this.value$$()}`;
    }
    return obj;
  });
}
