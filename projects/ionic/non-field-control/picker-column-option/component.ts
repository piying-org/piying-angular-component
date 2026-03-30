import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, input } from '@angular/core';
import { AttributesDirective } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonPickerColumnOption;

@Component({
  selector: 'app-ion-picker-column-option',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonPickerColumnOptionNFCC {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  disabled = input<Prop['disabled']>();
  value = input<Prop['value']>();
  color = input<Prop['color']>();
  // slot = input<Prop['slot']>();
}
