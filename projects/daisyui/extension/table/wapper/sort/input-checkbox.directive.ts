import {
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  WritableSignal,
} from '@angular/core';
import { SortDirection, SortService } from './sort.service';

@Directive({
  selector: '[inputSort]',
})
export class inputSortDirective {
  key = input.required<string>();
  inputSort = model.required<SortDirection>();
  #el = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  #sort = inject(SortService);

  ngOnChanges(): void {
    let result = this.inputSort();
    this.#changeElProps(result);

    this.#sort.update(this.key(), result);
  }
  #changeElProps(value: SortDirection) {
    switch (value) {
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
  }
  ngOnInit(): void {
    this.#sort.listenRestore(this.key()).subscribe(({ value }) => {
      this.inputSort.set(value);
      this.#changeElProps(value);
    });
  }
  @HostListener('change')
  chagne() {
    this.inputSort.update((a) => {
      let value = ++a;
      return value === 2 ? -1 : (value as SortDirection);
    });
  }
}
