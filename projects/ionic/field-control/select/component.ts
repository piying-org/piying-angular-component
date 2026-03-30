import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSelect;
@Component({
  selector: 'app-ion-select',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonSelectFCC),
      multi: true,
    },
  ],
})
export class IonSelectFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  cancelText = input<Prop['cancelText']>();
  color = input<Prop['color']>();
  compareWith = input<Prop['compareWith']>();
  
  fill = input<Prop['fill']>();
  errorText = input<Prop['errorText']>();
  helperText = input<Prop['helperText']>();
  interface = input<Prop['interface']>();
  interfaceOptions = input<Prop['interfaceOptions']>();
  justify = input<Prop['justify']>();
  label = input<Prop['label']>();
  labelPlacement = input<Prop['labelPlacement']>();
  multiple = input<Prop['multiple']>();
  name = input<Prop['name']>();
  okText = input<Prop['okText']>();
  placeholder = input<Prop['placeholder']>();
  selectedText = input<Prop['selectedText']>();
  toggleIcon = input<Prop['toggleIcon']>();
  expandedIcon = input<Prop['expandedIcon']>();
  shape = input<Prop['shape']>();
  value = input<Prop['value']>();
  onIonChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  onIonCancel = output<Parameters<NonNullable<Prop['onIonCancel']>>[0]>();
  onIonDismiss = output<Parameters<NonNullable<Prop['onIonDismiss']>>[0]>();
  onIonFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  onIonBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  slot = input<{ label: TemplateRef<any>; start: TemplateRef<any>; end: TemplateRef<any> }>();
}
