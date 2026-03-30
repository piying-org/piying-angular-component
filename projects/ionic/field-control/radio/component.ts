import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { JSX } from '@ionic/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';

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
  color = input<JSX.IonRadio['color']>();
  name = input<JSX.IonRadio['name']>();
  disabled = input<JSX.IonRadio['disabled']>();
  value = input<JSX.IonRadio['value']>();
  labelPlacement = input<JSX.IonRadio['labelPlacement']>();
  justify = input<JSX.IonRadio['justify']>();
  alignment = input<JSX.IonRadio['alignment']>();
  ionFocus = output<JSX.IonRadio['onIonFocus']>();
  ionBlur = output<JSX.IonRadio['onIonBlur']>();
  slot = input<{ default: TemplateRef<any> }>();
}
