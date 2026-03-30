import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input, output } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';

type Prop = JSX.IonPickerColumn;

@Component({
  selector: 'app-ion-picker-column',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonPickerColumnNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  value = input<Prop['value']>();
  color = input<Prop['color']>();
  // numericInput = input<Prop['numericInput']>();
  ionChange = output<Prop['onIonChange']>();
  slot = input<{ prefix: TemplateRef<any>; suffix: TemplateRef<any>; default: TemplateRef<any> }>();
}
