import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSegment;

@Component({
  selector: 'app-ion-segment',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSegmentNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  scrollable = input<Prop['scrollable']>();
  swipeGesture = input<Prop['swipeGesture']>();
  value = input<Prop['value']>();
  selectOnFocus = input<Prop['selectOnFocus']>();
  ionChange = output<Prop['onIonChange']>();
  // ionSelect = output<Prop['onIonSelect']>();
  // ionStyle = output<Prop['onIonStyle']>();
  slot = input<{ default: TemplateRef<any> }>();
}
