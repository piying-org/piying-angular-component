import { Component, computed, inject } from '@angular/core';
import { FormDialogService } from './form-dialog.service';
import { ThemeService } from '@piying-lib/angular-daisyui/service';
import clsx from 'clsx';
import { FormDialogItemComponent } from './dialog-item/component';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';

@Component({
  selector: 'pi-form-dialog-portal',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet],
})
export class FormDialogPortal {
  readonly service = inject(FormDialogService);
  readonly FormDialogItemComponent = FormDialogItemComponent;
}
