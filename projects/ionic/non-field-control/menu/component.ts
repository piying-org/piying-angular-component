import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonMenu;

@Component({
  selector: 'app-ion-menu',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonMenuNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  contentId = input<Prop['contentId']>();
  menuId = input<Prop['menuId']>();
  type = input<Prop['type']>();
  disabled = input<Prop['disabled']>();
  side = input<Prop['side']>();
  swipeGesture = input<Prop['swipeGesture']>();
  maxEdgeStart = input<Prop['maxEdgeStart']>();
  ionWillOpen = output<Prop['onIonWillOpen']>();
  ionWillClose = output<Prop['onIonWillClose']>();
  ionDidOpen = output<Prop['onIonDidOpen']>();
  ionDidClose = output<Prop['onIonDidClose']>();
  // ionMenuChange = output<Prop['onIonMenuChange']>();
  slot = input<{ default: TemplateRef<any> }>();
}
