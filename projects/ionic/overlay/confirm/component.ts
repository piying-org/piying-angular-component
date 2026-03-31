import { Component, inject } from '@angular/core';

import { ConfirmService } from './confirm.service';
import { IonAlert } from '@ionic/angular/standalone';
import { StrOrTemplateComponent } from '@piying-lib/angular-ionic/non-field-control';

@Component({
  selector: 'ion-confirm-portal',
  templateUrl: './component.html',
  imports: [IonAlert],
})
export class ConfirmPortal {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  service = inject(ConfirmService);
}
