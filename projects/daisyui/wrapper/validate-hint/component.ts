import { Component, computed, inject, viewChild } from '@angular/core';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { fieldControlStatusClass, getDeepError } from '@piying/view-angular-core';
import clsx from 'clsx';
@Component({
  selector: 'app-validate-hint-wrapper',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, MergeClassPipe],
})
export class ValidateHintWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.#field$$().props());
  errorStr$$ = computed(() => {
    const field = this.#field$$();
    const valibot = getDeepError(field.form.control);
    return valibot.map((item) => item.valibotIssueSummary).join('\n');
  });

  classStatus$$ = computed(() => fieldControlStatusClass(this.#field$$().form.control));
  showError$$ = computed(() => {
    const control = this.#field$$().form.control!;
    return control.invalid && control.touched$$();
  });
  wrapperClass$$ = computed(() => {
    return clsx(this.classStatus$$());
  });
  hintClass$$ = computed(() => {
    return this.props$$()['hintClass'] ?? 'text-error mt-2 text-xs';
  });
}
