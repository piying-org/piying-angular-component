import { Directive, effect, ElementRef, inject, input, WritableSignal } from '@angular/core';
import { SortDirection, SortService } from '@piying/angular-daisyui/service';

@Directive({
  selector: '[inputCheckbox]',
})
export class inputCheckboxDirective {
  key = input.required<string>();
  inputCheckbox = input.required<SortDirection>();
  #el = inject(ElementRef).nativeElement;
  #sort = inject(SortService);

  #inited = false;
  ngOnChanges(): void {
    let result = this.inputCheckbox();
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
    if (!this.#inited) {
      this.#inited = true;
      this.#sort.pendingCount--;
      if (this.#sort.pendingCount === 0) {
        this.#sort.inited$.set(true);
      }
    }
  }
}
