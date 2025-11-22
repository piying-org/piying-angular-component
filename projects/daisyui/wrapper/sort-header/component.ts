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
import { SortDirection } from '@piying/angular-daisyui/service';
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

  #index$ = linkedSignal(() => {
    return this.props$$()['direction'] ?? 0;
  });
  value$$ = computed(() => {
    let result = this.#index$() % 3;
    return result === 2 ? -1 : (result as SortDirection);
  });
  constructor() {
    super();
  }

  valueChange() {
    this.#index$.update((a) => ++a);
  }
}
