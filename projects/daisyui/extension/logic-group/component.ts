import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, viewChild } from '@angular/core';

import { PiyingViewGroupBase } from '@piying/view-angular';
import { FieldLogicGroup } from '@piying/view-angular-core';
@Component({
  selector: 'app-logic-group',
  templateUrl: './component.html',
  imports: [NgTemplateOutlet],
})
export class logicGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  activateChildren$$ = computed(() => {
    let control = this.field$$().form.control! as FieldLogicGroup;
    return this.field$$().children!().filter((config, index1) => {
      return !!control.activatedChildren().find(([index2]) => index1 === index2);
    });
  });
}
