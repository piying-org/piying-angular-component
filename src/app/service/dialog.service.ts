import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { PiDialogContainer } from '../piying/component/dialog/component';
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  #dialog = inject(Dialog);
  #options: any;
  setPiyingOptions(options: any) {
    this.#options = options;
  }
  openDialog(data: { title: string; schema: any; applyValue?: (value: any) => any }) {
    return this.#dialog.open(PiDialogContainer, {
      data: { ...data, options: this.#options },
      maxHeight: '80%',
    });
  }
}
