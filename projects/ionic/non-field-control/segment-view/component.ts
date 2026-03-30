import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSegmentView;

@Component({
  selector: 'app-ion-segment-view',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSegmentViewNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  swipeGesture = input<Prop['swipeGesture']>();
  ionSegmentViewScroll = output<Prop['onIonSegmentViewScroll']>();
  slot = input<{ default: TemplateRef<any> }>();
}
