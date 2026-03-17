import { Component, computed, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { TableExpandService } from '../../../wapper';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
/*
 * TableExpandOneTableCell - 表格行展开单元格组件
 *
 * 用途: 用于表格行的展开控制，显示和控制行的展开状态
 * 特性:
 *   - 显示展开/收起按钮
 *   - 控制行的展开状态
 *   - 集成 TableExpandService 进行状态管理
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 表格行需要展开显示详细信息的场景
 */

@Component({
  selector: 'app-table-expand-cell',
  templateUrl: './component.html',
  imports: [MergeClassPipe, AttributesDirective],
})
export class TableExpandOneTableCell {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  // props$$ = computed(() => this.field$$().props());

  #service = inject(TableExpandService);

  #expand$$ = toSignal(this.#service.selectionModel$$);
  isExpand$$ = computed(() => {
    const sm = this.#expand$$();
    if (!sm) {
      return false;
    }
    return sm.isSelected(this.field$$().context['item$']());
  });

  toggle() {
    this.#service.toggleExpand(this.field$$().context['item$']());
  }
}
