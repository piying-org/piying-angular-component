import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRefresherContent;

@Component({
  selector: 'app-ion-refresher-content',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRefresherContentNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  pullingIcon = input<Prop['pullingIcon']>();
  pullingText = input<Prop['pullingText']>();
  refreshingSpinner = input<Prop['refreshingSpinner']>();
  refreshingText = input<Prop['refreshingText']>();
  // pullOffset = output<Parameters<NonNullable<Prop['onPullOffset']>>[0]>();
  // refreshing = output<Parameters<NonNullable<Prop['onRefreshing']>>[0]>();
}
