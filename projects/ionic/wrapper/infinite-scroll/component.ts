import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input, output, computed, inject } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';

type Prop = JSX.IonInfiniteScroll;
type Prop2Content = JSX.IonInfiniteScrollContent;

@Component({
  selector: 'app-ion-infinite-scroll',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    InsertFieldDirective,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class IonInfiniteScrollWC {
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
