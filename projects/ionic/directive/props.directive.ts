import { Directive, ElementRef, inject, input, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[property]',
})
export class PropertyDirective {
  property = input<Record<string, any>>();
  excludes = input<string[]>([]);
  #rederer = inject(Renderer2);
  #el = inject(ElementRef).nativeElement;
  ngOnChanges(changes: SimpleChanges): void {
    const { previousValue, currentValue, firstChange } = changes['property'];
    if (currentValue) {
      for (const key in currentValue) {
        if (this.excludes().includes(key)) {
          continue;
        }
        this.#rederer.setProperty(this.#el, key, currentValue[key]);
      }
    }
    if (!firstChange) {
      for (const key in previousValue) {
        if (this.excludes().includes(key)) {
          continue;
        }
        if (!(key in currentValue)) {
          this.#rederer.setProperty(this.#el, key, undefined);
        }
      }
    }
  }
}
