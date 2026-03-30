import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
import { IonInput } from '@ionic/angular/standalone';
type Prop = JSX.IonInput;
@Component({
  selector: 'app-ion-input',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet, IonInput],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonInputFCC),
      multi: true,
    },
  ],
})
export class IonInputFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');

  color = input<Prop['color']>();
  autocapitalize = input<Prop['autocapitalize']>();
  autocomplete = input<Prop['autocomplete']>();
  autocorrect = input<Prop['autocorrect']>();
  autofocus = input<Prop['autofocus']>();
  clearInput = input<Prop['clearInput']>();
  // clearInputIcon = input<Prop['clearInputIcon']>();
  clearOnEdit = input<Prop['clearOnEdit']>();
  counter = input<Prop['counter']>();
  counterFormatter = input<Prop['counterFormatter']>();
  debounce = input<Prop['debounce']>();

  enterkeyhint = input<Prop['enterkeyhint']>();
  errorText = input<Prop['errorText']>();
  fill = input<Prop['fill']>();
  inputmode = input<Prop['inputmode']>();
  helperText = input<Prop['helperText']>();
  label = input<Prop['label']>();
  labelPlacement = input<Prop['labelPlacement']>();
  max = input<Prop['max']>();
  maxlength = input<Prop['maxlength']>();
  min = input<Prop['min']>();
  minlength = input<Prop['minlength']>();
  multiple = input<Prop['multiple']>();
  name = input<Prop['name']>();
  pattern = input<Prop['pattern']>();
  placeholder = input<Prop['placeholder']>();
  readonly = input<Prop['readonly']>();
  required = input<Prop['required']>();
  shape = input<Prop['shape']>();
  spellcheck = input<Prop['spellcheck']>();
  step = input<Prop['step']>();
  type = input<Prop['type']>();
  value = input<Prop['value']>();

  ionInput = output<Parameters<NonNullable<Prop['onIonInput']>>[0]>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();

  slot = input<TemplateRef<any>>();
}
