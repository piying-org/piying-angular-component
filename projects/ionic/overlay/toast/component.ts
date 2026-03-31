import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'ion-toast-portal',
  templateUrl: './component.html',
  imports: [IonToast],
})
export class ToastPortal {
  toast = inject(ToastService);
}
