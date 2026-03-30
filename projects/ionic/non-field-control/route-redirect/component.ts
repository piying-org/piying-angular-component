import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRouteRedirect;

@Component({
  selector: 'app-ion-route-redirect',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRouteRedirectNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  from = input<Prop['from']>();
  to = input<Prop['to']>();
  ionRouteRedirectChanged = output<Parameters<NonNullable<Prop['onIonRouteRedirectChanged']>>[0]>();
}
