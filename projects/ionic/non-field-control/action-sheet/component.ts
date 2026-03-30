import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonActionSheet;

@Component({
  selector: 'app-ion-action-sheet',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonActionSheetNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // overlayIndex = input<Prop['overlayIndex']>();
  // delegate = input<Prop['delegate']>();
  // hasController = input<Prop['hasController']>();
  keyboardClose = input<Prop['keyboardClose']>();
  enterAnimation = input<Prop['enterAnimation']>();
  leaveAnimation = input<Prop['leaveAnimation']>();
  buttons = input<Prop['buttons']>();
  cssClass = input<Prop['cssClass']>();
  backdropDismiss = input<Prop['backdropDismiss']>();
  header = input<Prop['header']>();
  subHeader = input<Prop['subHeader']>();
  translucent = input<Prop['translucent']>();
  animated = input<Prop['animated']>();
  htmlAttributes = input<Prop['htmlAttributes']>();
  isOpen = input<Prop['isOpen']>();
  trigger = input<Prop['trigger']>();
  ionActionSheetDidPresent = output<Prop['onIonActionSheetDidPresent']>();
  ionActionSheetWillDismiss = output<Prop['onIonActionSheetWillDismiss']>();
  ionActionSheetDidDismiss = output<Prop['onIonActionSheetDidDismiss']>();
  didPresent = output<Prop['onDidPresent']>();
  willPresent = output<Prop['onWillPresent']>();
  willDismiss = output<Prop['onWillDismiss']>();
  didDismiss = output<Prop['onDidDismiss']>();
}
