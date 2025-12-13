import { Dialog, DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PiyingView } from '@piying/view-angular';

@Component({
  templateUrl: './component.html',
  imports: [PiyingView],
})
export class PiDialogContainer {
  ref = inject(DialogRef);
  data = inject(DIALOG_DATA);
  changedValue = signal(this.data.value);
  loading$ = signal(false);

  async apply() {
    this.loading$.set(true);
    try {
      let result = await this.data.applyValue(this.changedValue());
      this.ref.close(result);
    } catch (error) {
      throw error;
    } finally {
      this.loading$.set(false);
    }
  }
  close() {
    this.ref.close();
  }
  modelChange(value: any) {
    this.changedValue.set(value);
  }
}
