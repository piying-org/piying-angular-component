import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonInputOtp;
@Component({
  selector: 'app-ion-input-otp',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonInputOtpFCC),
      multi: true,
    },
  ],
})
export class IonInputOtpFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  autocapitalize = input<Prop['autocapitalize']>();
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  fill = input<Prop['fill']>();
  inputmode = input<Prop['inputmode']>();
  length = input<Prop['length']>();
  pattern = input<Prop['pattern']>();
  readonly = input<Prop['readonly']>();
  separators = input<Prop['separators']>();
  shape = input<Prop['shape']>();
  size = input<Prop['size']>();
  type = input<Prop['type']>();
  value = input<Prop['value']>();
  ionInput = output<Parameters<NonNullable<Prop['onIonInput']>>[0]>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionComplete = output<Parameters<NonNullable<Prop['onIonComplete']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  slot = input<{ description: TemplateRef<any> }>();
}
