import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { ConfirmPortal, FormDialogPortal, ToastPortal } from '@piying-lib/angular-daisyui/overlay';
import {
  ConfirmPortal as IonConfirmPortal,
  FormDialogPortal as IonFormDialogPortal,
  ToastPortal as IonToastPortal,
} from '@piying-lib/angular-ionic/overlay';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ConfirmPortal,
    ToastPortal,
    FormDialogPortal,
    IonConfirmPortal,
    IonFormDialogPortal,
    IonToastPortal,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  constructor() {
    const iconRegistry = inject(MatIconRegistry);
    const sanitizer = inject(DomSanitizer);
    iconRegistry.addSvgIcon('github', sanitizer.bypassSecurityTrustResourceUrl('/icon/github.svg'));
  }
}
