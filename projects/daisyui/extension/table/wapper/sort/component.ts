import { Component, computed, inject, linkedSignal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe, TwPrefixPipe } from '@piying-lib/angular-daisyui/pipe';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { inputSortDirective } from './input-checkbox.directive';

@Component({
  selector: 'app-sort-header',
  templateUrl: './component.html',
  imports: [
    MatIcon,
    FormsModule,
    CssPrefixPipe,
    MergeClassPipe,
    AttributesDirective,
    inputSortDirective,
    InsertFieldDirective,
    TwPrefixPipe,
  ],
})
export class SortHeaderWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  key$$ = computed(() => {
    return this.props$$()['key'];
  });
  #direction$$ = computed(
    () => {
      return this.props$$()['direction'];
    },
    { equal: () => false },
  );
  index$ = linkedSignal(() => {
    return this.#direction$$() ?? 0;
  });
}
