import { Component, computed, inject, input, linkedSignal, signal, viewChild } from '@angular/core';
import { FormDialogOptions, FormDialogService } from '../form-dialog.service';
import { CssPrefixPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { MergeClassPipe, StrOrTemplateComponent } from '@piying-lib/angular-core';
import { PI_INPUT_OPTIONS_TOKEN, PiyingView } from '@piying/view-angular';

@Component({
  selector: 'pi-form-dialog-item',
  templateUrl: './component.html',
  imports: [CssPrefixPipe, TwPrefixPipe, SelectorlessOutlet, PiyingView, MergeClassPipe],
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

  async apply() {
    this.loading$.set(true);
    const item = this.item();

    try {
      const result = (await item.applyValue?.(this.changedValue())) ?? this.changedValue();
      this.item().close(result);
    } catch (error) {
      console.error(error);
    } finally {
      this.loading$.set(false);
    }
  }
  close() {
    this.item().close(undefined);
  }
  modelChange(value: any) {
    this.changedValue.set(value);
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
