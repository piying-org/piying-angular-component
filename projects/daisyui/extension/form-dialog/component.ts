import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';

@Component({
  templateUrl: './component.html',
  imports: [PiyingView, SelectorlessOutlet],
})
export class FormDialogContainer {
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  options$$ = inject(PI_INPUT_OPTIONS_TOKEN);
  #ref = inject(DialogRef);
  data = inject(DIALOG_DATA);
  changedValue = signal(this.data.value);
  loading$ = signal(false);
  async apply() {
    this.loading$.set(true);
    try {
      const result = (await this.data.applyValue?.(this.changedValue())) ?? this.changedValue();
      this.#ref.close(result);
    } catch (error) {
      throw error;
    } finally {
      this.loading$.set(false);
    }
  }
  close() {
    this.#ref.close();
  }
  modelChange(value: any) {
    this.changedValue.set(value);
  }
  formSubmit($event: Event) {
    return ($event?.target as HTMLFormElement | null)?.method === 'dialog';
  }
}
