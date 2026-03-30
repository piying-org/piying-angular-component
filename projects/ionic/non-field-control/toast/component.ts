import { Component, viewChild, input, output } from '@angular/core';
import { JSX } from '@ionic/core';

type Prop = JSX.IonToast;

@Component({
  selector: 'app-ion-toast',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonToastNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  enterAnimation = input<Prop['enterAnimation']>();
  leaveAnimation = input<Prop['leaveAnimation']>();
  cssClass = input<Prop['cssClass']>();
  duration = input<Prop['duration']>();
  header = input<Prop['header']>();
  message = input<Prop['message']>();
  keyboardClose = input<Prop['keyboardClose']>();
  position = input<Prop['position']>();
  positionAnchor = input<Prop['positionAnchor']>();
  buttons = input<Prop['buttons']>();
  translucent = input<Prop['translucent']>();
  animated = input<Prop['animated']>();
  icon = input<Prop['icon']>();
  htmlAttributes = input<Prop['htmlAttributes']>();
  swipeGesture = input<Prop['swipeGesture']>();
  isOpen = input<Prop['isOpen']>();
  trigger = input<Prop['trigger']>();
  ionToastDidPresent = output<Parameters<NonNullable<Prop['onIonToastDidPresent']>>[0]>();
  ionToastWillPresent = output<Parameters<NonNullable<Prop['onIonToastWillPresent']>>[0]>();
  ionToastWillDismiss = output<Parameters<NonNullable<Prop['onIonToastWillDismiss']>>[0]>();
  ionToastDidDismiss = output<Parameters<NonNullable<Prop['onIonToastDidDismiss']>>[0]>();
}
