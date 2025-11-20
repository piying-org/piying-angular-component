import { Directive, effect, ElementRef, inject, input, WritableSignal } from '@angular/core';

@Directive({
  selector: '[refBind]',
})
export class RefBindDirective {
  refBind = input.required<WritableSignal<any>>();
  #el = inject(ElementRef);
  ngOnChanges(): void {
    this.refBind().set(this.#el);
  }
}
