import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective, InsertFieldDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonButtons } from '@ionic/angular/standalone';
type Prop = JSX.IonButtons;

@Component({
  selector: 'app-ion-buttons',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, IonButtons],
})
export class IonButtonsWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  collapse = input<Prop['collapse']>();
}
