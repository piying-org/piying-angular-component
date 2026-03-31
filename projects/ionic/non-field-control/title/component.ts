import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonTitle } from '@ionic/angular/standalone';
type Prop = JSX.IonTitle;

@Component({
  selector: 'app-ion-title',
  templateUrl: './component.html',
  imports: [AttributesDirective, IonTitle],
})
export class IonTitleNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  size = input<Prop['size']>();
}
