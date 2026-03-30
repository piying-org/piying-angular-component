import { NgTemplateOutlet } from '@angular/common';
import { Component, input, viewChild, output, TemplateRef } from '@angular/core';
import { AttributesDirective, PiyingViewGroupBase } from '@piying/view-angular';
import { JSX } from '@ionic/core';
type Prop = JSX.IonRadioGroup;

@Component({
  selector: 'app-ion-radio-group',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet],
})
export class IonRadioGroupFGC extends PiyingViewGroupBase {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  allowEmptySelection = input<Prop['allowEmptySelection']>();
  compareWith = input<Prop['compareWith']>();
  name = input<Prop['name']>();
  value = input<Prop['value']>();
  helperText = input<Prop['helperText']>();
  errorText = input<Prop['errorText']>();
  ionChange = output<Prop['onIonChange']>();
  // ionValueChange = output<Prop['onIonValueChange']>();
  slot = input<{ default: TemplateRef<any> }>();
}
