import { Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { CheckboxService } from '@piying/angular-daisyui/service';
import { PiyingViewWrapperBase } from '@piying/view-angular';
import { filter } from 'rxjs';

@Component({
  selector: 'app-table-checkbox-body',
  templateUrl: './component.html',
})
export class TableCheckboxOneWC extends PiyingViewWrapperBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  #checkboxService = inject(CheckboxService);
  #key$$ = computed(() => {
    return this.props$$()['key'];
  });

  constructor() {
    super();
    this.field$$()
      .form.control!.valueChanges.pipe(filter((a) => a !== undefined))
      .subscribe((a) => {
        this.#checkboxService.toggle(this.#key$$(), this.field$$().context['item$']());
      });
  }
}
