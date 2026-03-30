import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { JSX } from '@ionic/core';
type Prop = JSX.IonTextarea;
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
@Component({
  selector: 'app-ion-textarea',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonTextareaFCC),
      multi: true,
    },
  ],
})
export class IonTextareaFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  autocapitalize = input<Prop['autocapitalize']>();
  autofocus = input<Prop['autofocus']>();
  clearOnEdit = input<Prop['clearOnEdit']>();
  debounce = input<Prop['debounce']>();
  
  fill = input<Prop['fill']>();
  inputmode = input<Prop['inputmode']>();
  enterkeyhint = input<Prop['enterkeyhint']>();
  maxlength = input<Prop['maxlength']>();
  minlength = input<Prop['minlength']>();
  name = input<Prop['name']>();
  placeholder = input<Prop['placeholder']>();
  readonly = input<Prop['readonly']>();
  required = input<Prop['required']>();
  spellcheck = input<Prop['spellcheck']>();
  cols = input<Prop['cols']>();
  rows = input<Prop['rows']>();
  wrap = input<Prop['wrap']>();
  autoGrow = input<Prop['autoGrow']>();
  value = input<Prop['value']>();
  counter = input<Prop['counter']>();
  counterFormatter = input<Prop['counterFormatter']>();
  errorText = input<Prop['errorText']>();
  helperText = input<Prop['helperText']>();
  label = input<Prop['label']>();
  labelPlacement = input<Prop['labelPlacement']>();
  shape = input<Prop['shape']>();
  change = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  input = output<Parameters<NonNullable<Prop['onIonInput']>>[0]>();
  blur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  focus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  slot = input<{ label: TemplateRef<any>; start: TemplateRef<any>; end: TemplateRef<any> }>();
}
