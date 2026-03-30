import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

@Component({
  selector: 'app-ion-row',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRowFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  slot = input<{ default: TemplateRef<any> }>();
}
