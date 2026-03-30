import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSegmentButton;

@Component({
  selector: 'app-ion-segment-button',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSegmentButtonNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  contentId = input<Prop['contentId']>();
  disabled = input<Prop['disabled']>();
  layout = input<Prop['layout']>();
  type = input<Prop['type']>();
  value = input<Prop['value']>();
  slot = input<TemplateRef<any>>();
}
