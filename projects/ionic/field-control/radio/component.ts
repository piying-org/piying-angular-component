import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { JSX } from '@ionic/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
type Prop = JSX.IonRadio;
@Component({
  selector: 'app-ion-radio',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonRadioFCC),
      multi: true,
    },
  ],
})
export class IonRadioFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  name = input<Prop['name']>();
  
  value = input<Prop['value']>();
  labelPlacement = input<Prop['labelPlacement']>();
  justify = input<Prop['justify']>();
  alignment = input<Prop['alignment']>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  slot = input<{ default: TemplateRef<any> }>();
}
