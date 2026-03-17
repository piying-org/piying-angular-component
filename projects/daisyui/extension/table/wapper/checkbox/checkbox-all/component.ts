import { Component, computed, inject, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { CheckboxService } from '../table-checkbox.service';
import { filter } from 'rxjs';
/*
 * TableCheckboxAllWC - 表格全选复选框包装器组件
 *
 * 用途: 用于表格的全选功能，控制所有行的选中状态
 * 特性:
 *   - 显示全选/取消全选按钮
 *   - 同步表格行的选中状态
 *   - 集成 CheckboxService 进行状态管理
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 表格需要批量操作时，用于控制所有行的选中状态
 */

@Component({
  selector: 'app-table-checkbox-all',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class TableCheckboxAllWC {
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #checkboxService = inject(CheckboxService);
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  constructor() {
    this.field$$()
      .form.control!.valueChanges.pipe(filter((a) => a !== undefined))
      .subscribe((a) => {
        this.#checkboxService.selectAll(a, this.#key$$());
      });

    this.#checkboxService.listenAllSelect(this.#key$$()).subscribe((value) => {
      this.field$$().form.control!.updateValue(value);
    });
  }
}
