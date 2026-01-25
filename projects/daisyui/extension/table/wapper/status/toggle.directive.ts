import { Directive, HostListener, inject } from '@angular/core';
import { TableExpandService } from './service';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

@Directive({
  selector: 'app-expand',
})
export class ExpandRowDirective {
  #field = inject(PI_VIEW_FIELD_TOKEN);
  #status = inject(TableExpandService);

  @HostListener('click', ['$event'])
  a(event: PointerEvent) {
    if (event.target instanceof HTMLInputElement) {
      return;
    }

    this.#status.toggleExpand(this.#field().context!['item$']());
  }
}
