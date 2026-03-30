import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild } from '@angular/core';
import { JSX } from '@ionic/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';

type Prop = JSX.IonReorderGroup;

@Component({
  selector: 'app-ion-reorder-group',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonReorderGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  // ionItemReorder = output<Prop['onItemReorder']>();
  // ionReorderStart = output<Prop['onReorderStart']>();
  // ionReorderMove = output<Prop['onReorderMove']>();
  // ionReorderEnd = output<Prop['onReorderEnd']>();
}
