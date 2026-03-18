import { Component, computed, inject, input, viewChild } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PI_VIEW_FIELD_TOKEN, PiyingView } from '@piying/view-angular';

import { PurePipe } from '@cyia/ngx-common/pipe';
/*
 * ListTemplateNFCC - 列表模板组件
 *
 * 用途: 用于基于模板渲染列表数据，支持动态上下文传递
 * 特性:
 *   - 支持自定义模板（template）
 *   - 支持列表数据渲染（list）
 *   - 支持传递父级和项的上下文信息
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 动态列表渲染、模板化列表展示等需要基于模板渲染列表的场景
 */

@Component({
  selector: 'app-list-template',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet, PurePipe],
})
export class ListTemplateNFCC {
  static __version = 2;
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly PiyingView = PiyingView;

  templateRef = viewChild.required('templateRef');
  /** 模板 */
  template = input.required<any>();
  /** 列表数据 */
  list = input<any[]>([]);
  parentPyOptions = inject(PI_INPUT_OPTIONS_TOKEN, { optional: true });
  field = inject(PI_VIEW_FIELD_TOKEN);
  templateInput$$ = (data: any) => {
    return {
      schema: this.template,
      options: computed(() => ({
        ...this.parentPyOptions!(),
        context: {
          ...this.parentPyOptions!().context,
          getParent: () => this.field(),
          getItem: () => data,
        },
      })),
      selectorless: true,
    };
  };
}
