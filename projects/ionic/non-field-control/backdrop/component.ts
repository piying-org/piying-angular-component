import { Component, viewChild, input, output } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonBackdrop;

@Component({
  selector: 'app-ion-backdrop',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonBackdropNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  visible = input<Prop['visible']>();
  tappable = input<Prop['tappable']>();
  stopPropagation = input<Prop['stopPropagation']>();
  ionBackdropTap = output<Parameters<NonNullable<Prop['onIonBackdropTap']>>[0]>();
}
