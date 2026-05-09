import {
  Component,
  computed,
  inject,
  Injector,
  input,
  Signal,
  signal,
  untracked,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { isSchema, Size } from '@piying-lib/angular-core';

import {
  AttributesDirective,
  PiyingView,
  PiyingViewGroup,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import clsx from 'clsx';
import * as v from 'valibot';
import { FormsModule } from '@angular/forms';

import { NFCSchema, setComponent, actions, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular-core';
import { TdWC, ThWC } from '@piying-lib/angular-daisyui/wrapper';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { NgTemplateOutlet, SlicePipe } from '@angular/common';

/*
 * TableFGC - 数据表格组件
 *
 * 用途: 用于显示和管理大量结构化数据，支持丰富的列定义和行操作
 * 特性:
 *   - 支持表头、表体、表脚三部分的自定义渲染
 *   - 支持列组定义，可配置列的显示内容和格式
 *   - 支持行展开功能（ExpandOneTableCell）
 *   - 集成 piying-view Schema 系统，支持动态数据和验证
 *   - 支持排序、状态管理等高级功能
 *
 * 使用场景: 数据列表展示、管理后台、报表等需要表格形式展示数据的场景
 *
 * 核心类型:
 *   - ItemCell: 列内容定义（字符串/Schema/函数）
 *   - ColumnDefine: 列定义（head/body/foot）
 *   - TableItemDefine2: 表格完整定义（行+列）
 */

@Component({
  selector: 'app-table-group',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    PurePipe,
    SelectorlessOutlet,
    FormsModule,
    CssPrefixPipe,
    MergeClassPipe,
    NgTemplateOutlet,
    SlicePipe,
  ],
})
export class TableFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #field = inject(PI_VIEW_FIELD_TOKEN);
  readonly StrOrTemplateComponent = StrOrTemplateComponent;

  /** 是否启用斑马纹效果 */
  zebra = input<boolean>();
  /** 固定配置 */
  pin = input<{ rows?: boolean; cols?: boolean }>();
  /** 尺寸大小 */
  size = input<Size>();
  /** 跟踪函数 */
  trackBy = input((key: number, value: any) => {
    return key;
  });
  minLength = input<number>(0);
  initValue = input<(index: number | undefined) => any>();

  headList$$ = computed(() => {
    return this.field$$().arrayChild!.children.map((item) => item['props']['title']);
  });

  /** 分页配置 */
  range = input<[number, number | undefined]>();
  disableAdd = input(false);
  #theme = inject(ThemeService);

  wrapperClass$$ = computed(() => {
    return clsx(
      this.zebra() ? this.#theme.addPrefix(`table-zebra`) : undefined,
      this.pin()?.rows ? this.#theme.addPrefix(`table-pin-rows`) : undefined,
      this.pin()?.cols ? this.#theme.addPrefix(`table-pin-cols`) : undefined,
      this.#theme.setSize('table', this.size()),
    );
  });

  selectorlessInput = (content: any, context?: any) => {
    const obj: Record<string, any> = { content: computed(() => content) };
    if (context) {
      obj['context'] = computed(() => {
        return { ...context, parentField: this.#field };
      });
    }
    return obj;
  };

  removeItem(key: number) {
    this.field$$().action.remove(key);
  }

  addNew() {
    const index = this.field$$().children!().length;
    this.field$$().action.set(this.initValue()?.(index), index);
  }
}
