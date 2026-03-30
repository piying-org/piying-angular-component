import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';

type Prop = JSX.IonRange;
@Component({
  selector: 'app-ion-range',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonRangeFCC),
      multi: true,
    },
  ],
})
export class IonRangeFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  debounce = input<Prop['debounce']>();
  name = input<Prop['name']>();
  label = input<Prop['label']>();
  dualKnobs = input<Prop['dualKnobs']>();
  min = input<Prop['min']>();
  max = input<Prop['max']>();
  pin = input<Prop['pin']>();
  pinFormatter = input<Prop['pinFormatter']>();
  snaps = input<Prop['snaps']>();
  step = input<Prop['step']>();
  ticks = input<Prop['ticks']>();
  activeBarStart = input<Prop['activeBarStart']>();
  disabled = input<Prop['disabled']>();
  value = input<Prop['value']>();
  labelPlacement = input<Prop['labelPlacement']>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionInput = output<Parameters<NonNullable<Prop['onIonInput']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  ionKnobMoveStart = output<Parameters<NonNullable<Prop['onIonKnobMoveStart']>>[0]>();
  ionKnobMoveEnd = output<Parameters<NonNullable<Prop['onIonKnobMoveEnd']>>[0]>();
  slot = input<{
    label: TemplateRef<any>;
    start: TemplateRef<any>;
    end: TemplateRef<any>;
    default: TemplateRef<any>;
  }>();
}
