import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, input } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-ion-item-group',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonItemGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  slot = input<TemplateRef<any>>();
}
