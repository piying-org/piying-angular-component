import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective, InsertFieldDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonChip } from '@ionic/angular/standalone';
type Prop = JSX.IonChip;

@Component({
  selector: 'app-ion-chip',
  templateUrl: './component.html',
  imports: [AttributesDirective, InsertFieldDirective, IonChip],
})
export class IonChipWC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  outline = input<Prop['outline']>();
  disabled = input<Prop['disabled']>();
}
