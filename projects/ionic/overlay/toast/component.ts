import { Component, computed, inject } from '@angular/core';
import { ToastService } from './toast.service';
import clsx from 'clsx';
import { IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'pi-toast-portal',
  templateUrl: './component.html',
  imports: [IonToast],
})
export class ToastPortal {
  toast = inject(ToastService);
}
