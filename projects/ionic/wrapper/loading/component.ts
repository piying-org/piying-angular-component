import { Component, viewChild, computed, inject } from '@angular/core';
import { IonLoading } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
type Prop = JSX.IonLoading;

@Component({
  selector: 'app-ion-loading',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, IonLoading],
})
export class IonLoadingWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['Loading'] as Prop | undefined;
  });
}
