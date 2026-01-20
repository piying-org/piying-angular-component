import { Component, computed, inject, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { CheckboxService } from '../table-checkbox.service';

@Component({
  selector: 'app-table-checkbox-all',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class TableCheckboxAllWC {
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #checkboxService = inject(CheckboxService);
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  toggle() {
    this.#checkboxService.selectAll(this.#key$$());
  }
}
