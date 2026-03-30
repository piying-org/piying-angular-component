import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSkeletonText;

@Component({
  selector: 'app-ion-skeleton-text',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonSkeletonTextNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  animated = input<Prop['animated']>();
  // ionStyle = output<Prop['onIonStyle']>();
}
