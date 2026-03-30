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
  ionPopoverDidPresent = output<Prop['onIonPopoverDidPresent']>();
  ionPopoverWillPresent = output<Prop['onIonPopoverWillPresent']>();
  ionPopoverWillDismiss = output<Prop['onIonPopoverWillDismiss']>();
  ionPopoverDidDismiss = output<Prop['onIonPopoverDidDismiss']>();
  didPresent = output<Prop['onDidPresent']>();
  willPresent = output<Prop['onWillPresent']>();
  willDismiss = output<Prop['onWillDismiss']>();
  didDismiss = output<Prop['onDidDismiss']>();
  // ionMount = output<Prop['onIonMount']>();
  slot = input<{ default: TemplateRef<any> }>();
}
