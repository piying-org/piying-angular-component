import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonInfiniteScrollContent;

@Component({
  selector: 'app-ion-infinite-scroll-content',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonInfiniteScrollContentNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  loadingSpinner = input<Prop['loadingSpinner']>();
  loadingText = input<Prop['loadingText']>();
}
