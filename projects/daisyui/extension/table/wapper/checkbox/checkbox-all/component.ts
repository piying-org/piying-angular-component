import { Component, computed, inject, viewChild } from '@angular/core';
import { InsertFieldDirective, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { CheckboxService } from '../table-checkbox.service';
import { filter } from 'rxjs';

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

  constructor() {
    this.field$$()
      .form.control!.valueChanges.pipe(filter((a) => a !== undefined))
      .subscribe((a) => {
        this.#checkboxService.selectAll(a, this.#key$$());
      });

    this.#checkboxService.listenAllSelect(this.#key$$()).subscribe((value) => {
      this.field$$().form.control!.updateValue(value);
    });
  }
}
