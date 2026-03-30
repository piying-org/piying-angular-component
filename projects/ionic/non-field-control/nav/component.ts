import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonNav;

@Component({
  selector: 'app-ion-nav',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonNavNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // delegate = input<Prop['delegate']>();
  swipeGesture = input<Prop['swipeGesture']>();
  animated = input<Prop['animated']>();
  animation = input<Prop['animation']>();
  rootParams = input<Prop['rootParams']>();
  root = input<Prop['root']>();
  // ionNavWillLoad = output<Prop['onIonNavWillLoad']>();
  ionNavWillChange = output<Prop['onIonNavWillChange']>();
  ionNavDidChange = output<Prop['onIonNavDidChange']>();
  slot = input<{ default: TemplateRef<any> }>();
}
