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
import { SortDirection, SortService } from '@piying/angular-daisyui/service';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'app-sort',
  templateUrl: './component.html',
  imports: [MatIcon, FormsModule],
})
export class SortWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  elRef = viewChild.required<ElementRef<HTMLInputElement>>('el');
  #ref$$ = computed(
    () => {
      return this.elRef().nativeElement;
    },
    { equal: () => true },
  );
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  #sort = inject(SortService);

  #index$ = linkedSignal(() => {
    return this.props$$()['direction'] ?? 0;
  });
  #value$$ = computed(() => {
    let result = this.#index$() % 3;
    return result === 2 ? -1 : (result as SortDirection);
  });
  constructor() {
    super();
    effect(() => {
      let nativeElement = this.#ref$$();
      let result = this.#value$$();
      switch (result) {
        case 0:
          nativeElement.indeterminate = true;
          break;
        case 1:
          nativeElement.checked = true;
          break;
        case -1:
          nativeElement.checked = false;
          break;
        default:
          break;
      }

      this.#sort.update(this.#key$$(), result);
    });
  }

  valueChange($event: Event, el: HTMLInputElement) {
    this.#index$.update((a) => ++a);
  }
}
