import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonDatetimeButton;

@Component({
  selector: 'app-ion-datetime-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonDatetimeButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  datetime = input<Prop['datetime']>();
  // ionValueChange = output<Parameters<NonNullable<Prop['onIonValueChange']>>[0]>();
  // ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  slot = input<TemplateRef<any>>();
}
