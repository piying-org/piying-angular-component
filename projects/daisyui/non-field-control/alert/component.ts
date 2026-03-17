import { NgClass } from '@angular/common';
import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { AlertColor } from '@piying-lib/angular-core';
import { AttributesDirective } from '@piying/view-angular';

/**
 * 警告提示组件
 * 用于显示重要的提示信息，支持多种样式、颜色和布局方向
 * 常用于操作反馈、错误提示、成功通知等场景
 */
@Component({
  selector: 'app-alert',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgClass, SelectorlessOutlet],
})
export class AlertNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  templateRef = viewChild.required('templateRef');
  style = input<'outline' | 'dash' | 'soft'>();
  color = input<AlertColor>();
  direction = input<'vertical' | 'horizontal'>();
  content = input('Default');

  #theme = inject(ThemeService);
  wrapperClass$ = computed(() => {
    return this.#theme.setClass(
      this.#theme.addPrefix('alert'),
      this.#theme.setColor('alert', this.color()),
      this.#theme.addPrefix2('alert', this.style()),
      this.#theme.addPrefix2('alert', this.direction()),
    );
  });
}
