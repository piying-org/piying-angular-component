import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, input, output } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonItemSliding;

@Component({
  selector: 'app-ion-item-sliding',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonItemSlidingFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  ionDrag = output<Prop['onIonDrag']>();
  slot = input<{ default: TemplateRef<any> }>();
}
