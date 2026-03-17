import { Component, inject, input, Signal, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { AttributesDirective, PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';

import { MatIconModule } from '@angular/material/icon';
import { PurePipe } from '@cyia/ngx-common/pipe';

/**
 * 统计数据显示组件
 * 用于展示关键数据指标，支持标题、数值、描述和图标的组合展示
 * 常用于数据报表、仪表盘等数据可视化场景
 */
@Component({
  selector: 'app-stat',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    CssPrefixPipe,
    SelectorlessOutlet,

    MatIconModule,
    MergeClassPipe,
    MergeClassPipe,
    PurePipe,
  ],
})
export class StatNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  title = input();
  titleClass = input<string>();
  value = input();
  valueClass = input<string>();
  desc = input();
  descClass = input<string>();
  figure = input();
  figureClass = input<string>();

  templateInput = (schema: Signal<any>) => {
    return {
      schema: schema,
      options: this.parentPyOptions!,
      selectorless: true,
    };
  };
}
