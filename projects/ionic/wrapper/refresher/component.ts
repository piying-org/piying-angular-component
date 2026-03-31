import { Component, viewChild, computed, inject } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
type Prop = JSX.IonRefresher;
type Prop2Content = JSX.IonRefresherContent;

@Component({
  selector: 'app-ion-refresher-content',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonRefresher, IonRefresherContent, InsertFieldDirective],
})
export class IonRefresherWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['InfiniteScroll'] as Prop | undefined;
  });
  props2 = computed(() => {
    return this.field$$().props()['IonInfiniteScrollContent'] as Prop2Content | undefined;
  });
}
