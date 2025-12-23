import { Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { CheckboxService } from '@piying/angular-daisyui/service';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';

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
    this.#checkboxService.toggle(this.#key$$(), this.props$$()['item$']());
  }
}
