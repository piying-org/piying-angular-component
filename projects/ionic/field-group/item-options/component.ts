import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, output, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonItemOptions;

@Component({
  selector: 'app-ion-item-options',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonItemOptionsFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  side = input<Prop['side']>();
  ionSwipe = output<Parameters<NonNullable<Prop['onIonSwipe']>>[0]>();
  slot = input<TemplateRef<any>>();
}
