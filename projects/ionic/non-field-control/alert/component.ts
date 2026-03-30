import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonAlert;

@Component({
  selector: 'app-ion-alert',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonAlertNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // overlayIndex = input<Prop['overlayIndex']>();
  // delegate = input<Prop['delegate']>();
  // hasController = input<Prop['hasController']>();
  keyboardClose = input<Prop['keyboardClose']>();
  enterAnimation = input<Prop['enterAnimation']>();
  leaveAnimation = input<Prop['leaveAnimation']>();
  cssClass = input<Prop['cssClass']>();
  header = input<Prop['header']>();
  subHeader = input<Prop['subHeader']>();
  message = input<Prop['message']>();
  buttons = input<Prop['buttons']>();
  inputs = input<Prop['inputs']>();
  backdropDismiss = input<Prop['backdropDismiss']>();
  translucent = input<Prop['translucent']>();
  animated = input<Prop['animated']>();
  htmlAttributes = input<Prop['htmlAttributes']>();
  isOpen = input<Prop['isOpen']>();
  trigger = input<Prop['trigger']>();
  ionAlertDidPresent = output<Parameters<NonNullable<Prop['onIonAlertDidPresent']>>[0]>();
  ionAlertWillPresent = output<Parameters<NonNullable<Prop['onIonAlertWillPresent']>>[0]>();
  ionAlertWillDismiss = output<Parameters<NonNullable<Prop['onIonAlertWillDismiss']>>[0]>();
  ionAlertDidDismiss = output<Parameters<NonNullable<Prop['onIonAlertDidDismiss']>>[0]>();
  didPresent = output<Parameters<NonNullable<Prop['onDidPresent']>>[0]>();
  willPresent = output<Parameters<NonNullable<Prop['onWillPresent']>>[0]>();
  willDismiss = output<Parameters<NonNullable<Prop['onWillDismiss']>>[0]>();
  didDismiss = output<Parameters<NonNullable<Prop['onDidDismiss']>>[0]>();
}
