import { Component, viewChild, inject, computed } from '@angular/core';
import {
  AttributesDirective,
  InsertFieldDirective,
  PI_VIEW_FIELD_TOKEN,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonHeader } from '@ionic/angular/standalone';
type Prop = JSX.IonHeader;

@Component({
  selector: 'app-ion-header',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonHeader, InsertFieldDirective],
})
export class IonHeaderWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  props = computed(() => {
    return this.field$$().props()['Header'] as Prop | undefined;
  });
}
