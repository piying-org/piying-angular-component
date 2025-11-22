import { Component, OnInit, viewChild } from '@angular/core';
import { TableStatusService } from './service';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { TABLE_STATUS_TOKEN } from '../../../extension/table/token';

@Component({
  selector: 'app-table-status',
  templateUrl: './component.html',
  providers: [TableStatusService, { provide: TABLE_STATUS_TOKEN, useExisting: TableStatusService }],
})
export class TableStatusComponent extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
}
