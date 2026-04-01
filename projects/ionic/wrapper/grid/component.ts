import { Component, viewChild, computed, inject } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { IonGrid } from '@ionic/angular/standalone';
import { JSX } from '@ionic/core';

type Prop = JSX.IonGrid;

@Component({
  selector: 'app-ion-grid',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonGrid, InsertFieldDirective],
})
export class IonGridWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['Grid'] as Prop | undefined;
  });
}
