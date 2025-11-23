import { Component, computed, inject, OnInit, viewChild } from '@angular/core';
import { CheckboxService } from '@piying/angular-daisyui/service';
import { PiyingViewWrapperBase } from '@piying/view-angular';

@Component({
  selector: 'app-table-checkbox-all',
  templateUrl: './component.html',
})
export class TableCheckboxAllWC extends PiyingViewWrapperBase {
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
