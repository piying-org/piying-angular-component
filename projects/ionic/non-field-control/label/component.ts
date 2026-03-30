import { Component, viewChild, TemplateRef, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonLabel;

@Component({
  selector: 'app-ion-label',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonLabelNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  position = input<Prop['position']>();
  // ionColor = output<Parameters<NonNullable<Prop['onIonColor']>>[0]>();
  // ionStyle = output<Parameters<NonNullable<Prop['onIonStyle']>>[0]>();
  slot = input<{ default: TemplateRef<any> }>();
}
