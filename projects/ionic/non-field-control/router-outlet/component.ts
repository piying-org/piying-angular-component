import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRouterOutlet;

@Component({
  selector: 'app-ion-router-outlet',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRouterOutletNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  mode = input<Prop['mode']>();
  // delegate = input<Prop['delegate']>();
  animated = input<Prop['animated']>();
  animation = input<Prop['animation']>();
  // swipeHandler = input<Prop['swipeHandler']>();
  // ionNavWillLoad = output<Prop['onIonNavWillLoad']>();
  // ionNavWillChange = output<Prop['onIonNavWillChange']>();
  // ionNavDidChange = output<Prop['onIonNavDidChange']>();
  slot = input<{ default: TemplateRef<any> }>();
}
