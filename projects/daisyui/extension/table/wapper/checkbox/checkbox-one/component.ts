import { Component, computed, inject, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { filter } from 'rxjs';
import { CheckboxService } from '../table-checkbox.service';
/*
 * TableCheckboxOneWC - 表格单选复选框包装器组件
 *
 * 用途: 用于表格单行的复选框控制，管理单行的选中状态
 * 特性:
 *   - 显示单行的复选框
 *   - 同步单行的选中状态到服务
 *   - 集成 CheckboxService 进行状态管理
 *   - 集成 piying-view 字段系统
 *
 * 使用场景: 表格需要批量操作时，用于控制单行的选中状态
 */
@Component({
  selector: 'app-table-checkbox-body',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class TableCheckboxOneWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  #checkboxService = inject(CheckboxService);
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  constructor() {
    this.field$$()
      .form.control!.valueChanges.pipe(filter((a) => a !== undefined))
      .subscribe((a) => {
        this.#checkboxService.set(this.#key$$(), this.field$$().context['item$'](), a);
      });

    this.#checkboxService.listenAllSelect(this.#key$$()).subscribe((value) => {
      this.field$$().form.control!.updateValue(value);
    });
  }
}
