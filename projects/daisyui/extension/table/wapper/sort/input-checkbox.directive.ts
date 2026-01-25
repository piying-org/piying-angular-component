import { Directive, ElementRef, HostListener, inject, input, model, signal } from '@angular/core';
import { SortDirection, SortService } from './sort.service';

@Directive({
  selector: '[inputSort]',
})
export class inputSortDirective {
  key = input.required<string>();
  inputSort = signal<SortDirection>(0);
  #el = inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;
  #sort = inject(SortService);

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
    this.#sort.listenChange(this.key()).subscribe((value) => {
      this.inputSort.set(value);
      this.#changeElProps(value);
    });
  }
  @HostListener('change')
  chagne() {
    this.inputSort.update((a) => {
      const value = ++a;
      return value === 2 ? -1 : (value as SortDirection);
    });
    this.#sort.update(this.key(), this.inputSort());
    this.#changeElProps(this.inputSort());
  }
}
