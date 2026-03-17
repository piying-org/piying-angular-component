import { Component, inject, viewChild, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CssPrefixPipe, MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
/*
 * FilterOptionNFCC - 过滤选项组件
 *
 * 用途: 用于显示过滤输入框，通常与 OptionList 组件配合使用
 * 特性:
 *   - 显示过滤输入框
 *   - 从 context 中获取搜索内容
 *   - 阻止键盘事件冒泡
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 选项列表需要本地过滤功能时，用于输入过滤条件
 */

@Component({
  selector: 'app-filter-option',
  templateUrl: './component.html',
  imports: [FormsModule, CssPrefixPipe, MergeClassPipe, AttributesDirective, FormsModule],
})
export class FilterOptionNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #field = inject(PI_VIEW_FIELD_TOKEN);
  content: WritableSignal<string> = this.#field().props()['seachContent'];

  stopKeyboardListen(event: KeyboardEvent) {
    event.stopPropagation();
  }
}
