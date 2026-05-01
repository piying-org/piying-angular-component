import { Component, viewChild, computed, inject } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonTitle } from '@ionic/angular/standalone';
import { PropertyDirective } from '@piying-lib/angular-ionic/directive';
type Prop = JSX.IonTitle;

@Component({
  selector: 'app-ion-title',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonTitle, PropertyDirective, InsertFieldDirective],
})
export class IonTitleWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);

  props = computed(() => {
    return this.field$$().props()['Title'] as Prop | undefined;
  });
}
