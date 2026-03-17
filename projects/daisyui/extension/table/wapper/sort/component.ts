import { Component, computed, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { inputSortDirective } from './input-checkbox.directive';
/*
 * SortHeaderWC - 排序列头包装器组件
 *
 * 用途: 用于表格列的排序控制，通常与 Table 组件配合使用
 * 特性:
 *   - 显示排序图标和排序状态
 *   - 支持点击触发排序
 *   - 集成 piying-view 字段系统
 *   - 支持通过 props 设置排序 key
 *
 * 使用场景: 表格列需要排序功能时作为列的包装器使用
 */

@Component({
  selector: 'app-sort-header',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    CssPrefixPipe,
    MergeClassPipe,
    AttributesDirective,
    inputSortDirective,
    InsertFieldDirective,
    TwPrefixPipe,
  ],
})
export class SortHeaderWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  key$$ = computed(() => {
    return this.props$$()['key'];
  });
}
