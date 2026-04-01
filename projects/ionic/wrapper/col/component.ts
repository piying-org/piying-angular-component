import { Component, viewChild, computed, inject } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonCol } from '@ionic/angular/standalone';
type Prop = JSX.IonCol;

@Component({
  selector: 'app-ion-col',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonCol, InsertFieldDirective],
})
export class IonColWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['Col'] as Prop | undefined;
  });
}
