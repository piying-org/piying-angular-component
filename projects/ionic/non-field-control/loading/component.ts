import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, output } from '@angular/core';
import { JSX } from '@ionic/core';
import { AttributesDirective } from '@piying/view-angular';
type Prop = JSX.IonLoading;

@Component({
  selector: 'app-ion-loading',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonLoadingNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // overlayIndex = input<Prop['overlayIndex']>();
  // delegate = input<Prop['delegate']>();
  // hasController = input<Prop['hasController']>();
  keyboardClose = input<Prop['keyboardClose']>();
  enterAnimation = input<Prop['enterAnimation']>();
  leaveAnimation = input<Prop['leaveAnimation']>();
  message = input<Prop['message']>();
  cssClass = input<Prop['cssClass']>();
  duration = input<Prop['duration']>();
  backdropDismiss = input<Prop['backdropDismiss']>();
  showBackdrop = input<Prop['showBackdrop']>();
  spinner = input<Prop['spinner']>();
  translucent = input<Prop['translucent']>();
  animated = input<Prop['animated']>();
  htmlAttributes = input<Prop['htmlAttributes']>();
  isOpen = input<Prop['isOpen']>();
  trigger = input<Prop['trigger']>();
  ionLoadingWillPresent = output<Parameters<NonNullable<Prop['onIonLoadingWillPresent']>>[0]>();
  ionLoadingWillDismiss = output<Parameters<NonNullable<Prop['onIonLoadingWillDismiss']>>[0]>();
  ionLoadingDidDismiss = output<Parameters<NonNullable<Prop['onIonLoadingDidDismiss']>>[0]>();
  didPresent = output<Parameters<NonNullable<Prop['onDidPresent']>>[0]>();
  willPresent = output<Parameters<NonNullable<Prop['onWillPresent']>>[0]>();
  willDismiss = output<Parameters<NonNullable<Prop['onWillDismiss']>>[0]>();
  didDismiss = output<Parameters<NonNullable<Prop['onDidDismiss']>>[0]>();
}
