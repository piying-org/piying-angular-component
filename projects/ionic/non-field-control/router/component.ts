import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRouter;

@Component({
  selector: 'app-ion-router',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRouterNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  root = input<Prop['root']>();
  useHash = input<Prop['useHash']>();
  ionRouteWillChange = output<Prop['onIonRouteWillChange']>();
  ionRouteDidChange = output<Prop['onIonRouteDidChange']>();
}
