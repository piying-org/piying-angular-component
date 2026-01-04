import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { TableStatusService } from './service';
import { TABLE_STATUS_TOKEN } from '../../token';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
// 切换状态演示,继承TABLE_STATUS_TOKEN自定义
@Component({
  selector: 'app-table-status',
  templateUrl: './component.html',
  providers: [TableStatusService, { provide: TABLE_STATUS_TOKEN, useExisting: TableStatusService }],
  imports: [InsertFieldDirective],
})
export class TableStatusWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #service = inject(TableStatusService);
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  #expand$$ = computed(() => {
    return this.field$$().props()['expandSelectModel'];
  });
  constructor() {
    effect(() => {
      this.#service.setSelectionModel(this.#expand$$());
    });
  }
}
