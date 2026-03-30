import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonPopover;

@Component({
  selector: 'app-ion-popover',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonPopoverNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  component = input<Prop['component']>();
  componentProps = input<Prop['componentProps']>();
  keyboardClose = input<Prop['keyboardClose']>();
  // cssClass = input<Prop['cssClass']>();
  backdropDismiss = input<Prop['backdropDismiss']>();
  event = input<Prop['event']>();
  showBackdrop = input<Prop['showBackdrop']>();
  translucent = input<Prop['translucent']>();
  animated = input<Prop['animated']>();
  htmlAttributes = input<Prop['htmlAttributes']>();
  triggerAction = input<Prop['triggerAction']>();
  trigger = input<Prop['trigger']>();
  size = input<Prop['size']>();
  dismissOnSelect = input<Prop['dismissOnSelect']>();
  reference = input<Prop['reference']>();
  side = input<Prop['side']>();
  alignment = input<Prop['alignment']>();
  arrow = input<Prop['arrow']>();
  isOpen = input<Prop['isOpen']>();
  // keyboardEvents = input<Prop['keyboardEvents']>();
  focusTrap = input<Prop['focusTrap']>();
  keepContentsMounted = input<Prop['keepContentsMounted']>();
  ionPopoverDidPresent = output<Parameters<NonNullable<Prop['onIonPopoverDidPresent']>>[0]>();
  ionPopoverWillPresent = output<Parameters<NonNullable<Prop['onIonPopoverWillPresent']>>[0]>();
  ionPopoverWillDismiss = output<Parameters<NonNullable<Prop['onIonPopoverWillDismiss']>>[0]>();
  ionPopoverDidDismiss = output<Parameters<NonNullable<Prop['onIonPopoverDidDismiss']>>[0]>();
  didPresent = output<Parameters<NonNullable<Prop['onDidPresent']>>[0]>();
  willPresent = output<Parameters<NonNullable<Prop['onWillPresent']>>[0]>();
  willDismiss = output<Parameters<NonNullable<Prop['onWillDismiss']>>[0]>();
  didDismiss = output<Parameters<NonNullable<Prop['onDidDismiss']>>[0]>();
  // ionMount = output<Parameters<NonNullable<Prop['onIonMount']>>[0]>();
  slot = input<{ default: TemplateRef<any> }>();
}
