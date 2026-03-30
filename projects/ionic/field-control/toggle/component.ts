import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonToggle;
@Component({
  selector: 'app-ion-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonToggleFCC),
      multi: true,
    },
  ],
})
export class IonToggleFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  name = input<Prop['name']>();
  checked = input<Prop['checked']>();
  disabled = input<Prop['disabled']>();
  errorText = input<Prop['errorText']>();
  helperText = input<Prop['helperText']>();
  value = input<Prop['value']>();
  enableOnOffLabels = input<Prop['enableOnOffLabels']>();
  labelPlacement = input<Prop['labelPlacement']>();
  justify = input<Prop['justify']>();
  alignment = input<Prop['alignment']>();
  required = input<Prop['required']>();
  ionChange = output<JSX.IonToggle['onIonChange']>();
  ionFocus = output<JSX.IonToggle['onIonFocus']>();
  ionBlur = output<JSX.IonToggle['onIonBlur']>();
  slot = input<{ 'default slot': TemplateRef<any> }>();
}
