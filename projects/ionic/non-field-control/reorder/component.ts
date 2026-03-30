import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';

type Prop = JSX.IonReorder;

@Component({
  selector: 'app-ion-reorder',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonReorderNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  disabled = input<Prop['disabled']>();
  group = input<Prop['group']>();
  order = input<Prop['order']>();
  ionItemReorder = output<Parameters<NonNullable<Prop['onIonItemReorder']>>[0]>();
  slot = input<{ 'default slot': TemplateRef<any> }>();
}
