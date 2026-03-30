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
  ionAlertDidPresent = output<Prop['onIonAlertDidPresent']>();
  ionAlertWillPresent = output<Prop['onIonAlertWillPresent']>();
  ionAlertWillDismiss = output<Prop['onIonAlertWillDismiss']>();
  ionAlertDidDismiss = output<Prop['onIonAlertDidDismiss']>();
  didPresent = output<Prop['onDidPresent']>();
  willPresent = output<Prop['onWillPresent']>();
  willDismiss = output<Prop['onWillDismiss']>();
  didDismiss = output<Prop['onDidDismiss']>();
}
