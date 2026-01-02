import { Component, computed, inject, viewChild } from '@angular/core';
import { CheckboxService } from '@piying-lib/angular-daisyui/service';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-table-checkbox-body',
  templateUrl: './component.html',
  imports: [InsertFieldDirective],
})
export class TableCheckboxOneWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props$$ = computed(() => this.field$$().props());
  #checkboxService = inject(CheckboxService);
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  constructor() {
    this.field$$()
      .form.control!.valueChanges.pipe(filter((a) => a !== undefined))
      .subscribe((a) => {
        this.#checkboxService.toggle(this.#key$$(), this.field$$().context['item$']());
      });
  }
}
