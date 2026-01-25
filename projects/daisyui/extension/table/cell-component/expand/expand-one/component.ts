import { Component, computed, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { AttributesDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { TableExpandService } from '../../../wapper';
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

  #service = inject(TableExpandService);

  #expand$$ = toSignal(this.#service.selectionModel$$);
  isExpand$$ = computed(() => {
    const sm = this.#expand$$();
    if (!sm) {
      return false;
    }
    return sm.isSelected(this.field$$().context['item$']());
  });

  toggle() {
    this.#service.toggleExpand(this.field$$().context['item$']());
  }
}
