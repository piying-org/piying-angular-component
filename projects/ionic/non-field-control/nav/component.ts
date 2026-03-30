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
  // ionNavWillLoad = output<Parameters<NonNullable<Prop['onIonNavWillLoad']>>[0]>();
  ionNavWillChange = output<Parameters<NonNullable<Prop['onIonNavWillChange']>>[0]>();
  ionNavDidChange = output<Parameters<NonNullable<Prop['onIonNavDidChange']>>[0]>();
  slot = input<TemplateRef<any>>();
}
