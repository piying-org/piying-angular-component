import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRoute;

@Component({
  selector: 'app-ion-route',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRouteNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  url = input<Prop['url']>();
  component = input<Prop['component']>();
  componentProps = input<Prop['componentProps']>();
  beforeLeave = input<Prop['beforeLeave']>();
  beforeEnter = input<Prop['beforeEnter']>();
  ionRouteDataChanged = output<Prop['onIonRouteDataChanged']>();
}
