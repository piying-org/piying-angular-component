import { Component, computed, inject, input, linkedSignal, signal, viewChild } from '@angular/core';
import { FormDialogOptions, FormDialogService } from '../form-dialog.service';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StrOrTemplateComponent } from '@piying-lib/angular-ionic/non-field-control';

@Component({
  selector: 'pi-form-dialog-item',
  templateUrl: './component.html',
  imports: [
    SelectorlessOutlet,
    PiyingView,
    IonModal,
    IonHeader,
    IonTitle,
    IonContent,
    IonButtons,
    IonButton,
    IonToolbar,
  ],
})
export class FormDialogItemComponent {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  readonly service = inject(FormDialogService);
  options$$ = inject(PI_INPUT_OPTIONS_TOKEN);

  item = input.required<FormDialogOptions>();
  changedValue = linkedSignal(computed(() => this.item()?.value));

  loading$ = signal(false);

  async apply(modal: IonModal) {
    this.loading$.set(true);
    const item = this.item();

    try {
      const result = (await item.applyValue?.(this.changedValue())) ?? this.changedValue();
      this.item().close(modal, result);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading$.set(false);
    }
  }

  modelChange(value: any) {
    this.changedValue.set(value);
  }
  close(modal: IonModal) {
    this.item().close(modal, undefined);
  }
  options2$$ = computed(() => {
    return {
      ...this.options$$(),
      context: {
        ...this.options$$().context,
        ...this.item().context,
      },
    };
  });
}
