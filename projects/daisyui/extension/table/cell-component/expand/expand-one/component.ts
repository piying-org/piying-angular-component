import { Component, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { map, startWith } from 'rxjs';
import { TableStatusService } from '../../../wapper';
import { MergeClassPipe } from '@piying-lib/angular-daisyui/pipe';

@Component({
  selector: 'app-table-expand-cell',
  templateUrl: './component.html',
  imports: [MatIconModule, MergeClassPipe, AttributesDirective],
})
export class TableExpandOneTableCell {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  // props$$ = computed(() => this.field$$().props());

  #service = this.field$$().context['status'] as TableStatusService;
  expand$$ = toSignal(
    this.#service.selectionModel$$.pipe(
      map((value) => {
        return value.isSelected(this.field$$().context['item$']());
      }),
      startWith(false),
    ),
  );

  toggle() {
    this.#service.toggleExpand(this.field$$().context['item$']());
  }
}
