import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  linkedSignal,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { AttributesDirective, PiyingViewWrapperBase } from '@piying/view-angular';
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
  ],
})
export class SortHeaderWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

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
