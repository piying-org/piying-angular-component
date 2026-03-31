import { Component, inject } from '@angular/core';

import { ConfirmService } from './confirm.service';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'ion-confirm-portal',
  templateUrl: './component.html',
  imports: [IonAlert],
})
export class ConfirmPortal {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  service = inject(ConfirmService);
}
