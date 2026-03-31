import { Component, inject } from '@angular/core';
import { FormDialogService } from './form-dialog.service';
import { FormDialogItemComponent } from './dialog-item/component';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';

@Component({
  selector: 'ion-form-dialog-portal',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet],
})
export class FormDialogPortal {
  readonly service = inject(FormDialogService);
  readonly FormDialogItemComponent = FormDialogItemComponent;
}
