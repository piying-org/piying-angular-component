import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonMenu } from '@ionic/angular/standalone';
type Prop = JSX.IonMenu;

@Component({
  selector: 'app-ion-menu',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonMenu],
})
export class IonMenuFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  contentId = input<Prop['contentId']>();
  menuId = input<Prop['menuId']>();
  type = input<Prop['type']>();
  disabled = input<Prop['disabled']>();
  side = input<Prop['side']>();
  swipeGesture = input<Prop['swipeGesture']>();
  maxEdgeStart = input<Prop['maxEdgeStart']>();
  ionWillOpen = output<Parameters<NonNullable<Prop['onIonWillOpen']>>[0]>();
  ionWillClose = output<Parameters<NonNullable<Prop['onIonWillClose']>>[0]>();
  ionDidOpen = output<Parameters<NonNullable<Prop['onIonDidOpen']>>[0]>();
  ionDidClose = output<Parameters<NonNullable<Prop['onIonDidClose']>>[0]>();
}
