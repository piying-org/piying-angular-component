import { Component, computed, inject } from '@angular/core';

import clsx from 'clsx';
import { ConfirmService } from './confirm.service';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { IonAlert } from '@ionic/angular/standalone';

@Component({
  selector: 'pi-confirm-portal',
  templateUrl: './component.html',
  imports: [SelectorlessOutlet, PurePipe, IonAlert],
})
export class ConfirmPortal {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  service = inject(ConfirmService);
}
