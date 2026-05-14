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
  selector: 'app-validate-status-wrapper',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, MergeClassPipe],
})
export class ValidateStatusWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #field$$ = inject(PI_VIEW_FIELD_TOKEN);


  classStatus$$ = computed(() => fieldControlStatusClass(this.#field$$().form.control));

  wrapperClass$$ = computed(() => {
    return clsx(this.classStatus$$());
  });
}
