import { Directive, ElementRef, HostListener, inject, output } from '@angular/core';
import { TableStatusService } from './service';
import { PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

@Directive({
  selector: 'app-expand',
})
export class ExpandRowDirective {
  #field = inject(PI_VIEW_FIELD_TOKEN);
  @HostListener('click', [])
  a() {
    this.#field().context['status'].toggleExpand(this.#field().context!['item$']());
  }
}
