import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonFabList;

@Component({
  selector: 'app-ion-fab-list',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonFabListNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  activated = input<Prop['activated']>();
  side = input<Prop['side']>();

  slot = input<{ default: TemplateRef<any> }>();
}
