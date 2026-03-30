import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';

type Prop = JSX.IonInfiniteScroll;

@Component({
  selector: 'app-ion-infinite-scroll',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonInfiniteScrollNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  threshold = input<Prop['threshold']>();
  disabled = input<Prop['disabled']>();
  position = input<Prop['position']>();
  ionInfinite = output<Parameters<NonNullable<Prop['onIonInfinite']>>[0]>();
}
