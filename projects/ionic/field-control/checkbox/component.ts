import { Component, forwardRef, viewChild, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonCheckbox;
@Component({
  selector: 'app-ion-checkbox',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonCheckboxFCC),
      multi: true,
    },
  ],
})
export class IonCheckboxFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  name = input<Prop['name']>();
  checked = input<Prop['checked']>();
  indeterminate = input<Prop['indeterminate']>();
  disabled = input<Prop['disabled']>();
  errorText = input<Prop['errorText']>();
  helperText = input<Prop['helperText']>();
  value = input<Prop['value']>();
  labelPlacement = input<Prop['labelPlacement']>();
  justify = input<Prop['justify']>();
  alignment = input<Prop['alignment']>();
  required = input<Prop['required']>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
}
