import { Component, viewChild, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonTab;

@Component({
  selector: 'app-ion-tab',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonTabNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  // active = input<Prop['active']>();
  // delegate = input<Prop['delegate']>();
  tab = input<Prop['tab']>();
  component = input<Prop['component']>();
}
