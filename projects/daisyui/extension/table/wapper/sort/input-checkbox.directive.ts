import { Directive, effect, ElementRef, inject, input, WritableSignal } from '@angular/core';
import { SortDirection, SortService } from '@piying/angular-daisyui/service';

@Directive({
  selector: '[inputSort]',
})
export class inputSortDirective {
  key = input.required<string>();
  inputSort = input.required<SortDirection>();
  #el = inject(ElementRef).nativeElement;
  #sort = inject(SortService);

  ngOnChanges(): void {
    let result = this.inputSort();
    switch (result) {
      case 0:
        this.#el.indeterminate = true;
        break;
      case 1:
        this.#el.checked = true;
        break;
      case -1:
        this.#el.checked = false;
        break;
      default:
        break;
    }

    this.#sort.update(this.key(), result);
  }
}
