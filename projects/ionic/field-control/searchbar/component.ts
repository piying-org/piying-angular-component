import { Component, forwardRef, viewChild, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonSearchbar;
@Component({
  selector: 'app-ion-searchbar',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonSearchbarFCC),
      multi: true,
    },
  ],
})
export class IonSearchbarFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  animated = input<Prop['animated']>();
  autocapitalize = input<Prop['autocapitalize']>();
  autocomplete = input<Prop['autocomplete']>();
  autocorrect = input<Prop['autocorrect']>();
  cancelButtonIcon = input<Prop['cancelButtonIcon']>();
  cancelButtonText = input<Prop['cancelButtonText']>();
  clearIcon = input<Prop['clearIcon']>();
  debounce = input<Prop['debounce']>();
  disabled = input<Prop['disabled']>();
  inputmode = input<Prop['inputmode']>();
  enterkeyhint = input<Prop['enterkeyhint']>();
  maxlength = input<Prop['maxlength']>();
  minlength = input<Prop['minlength']>();
  name = input<Prop['name']>();
  placeholder = input<Prop['placeholder']>();
  searchIcon = input<Prop['searchIcon']>();
  showCancelButton = input<Prop['showCancelButton']>();
  showClearButton = input<Prop['showClearButton']>();
  spellcheck = input<Prop['spellcheck']>();
  type = input<Prop['type']>();
  value = input<Prop['value']>();
  ionInput = output<Parameters<NonNullable<Prop['onIonInput']>>[0]>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionCancel = output<Parameters<NonNullable<Prop['onIonCancel']>>[0]>();
  ionClear = output<Parameters<NonNullable<Prop['onIonClear']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  // ionStyle = output<Parameters<NonNullable<Prop['onIonStyle']>>[0]>();
}
