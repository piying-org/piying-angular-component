import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
import { IonToggle } from '@ionic/angular/standalone';
import { SelectorlessOutlet } from '@cyia/ngx-common/directive';
import { StrOrTemplateComponent } from '@piying-lib/angular-core';
type Prop = JSX.IonToggle;
@Component({
  selector: 'app-ion-toggle',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, IonToggle, SelectorlessOutlet],
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

  errorText = input<Prop['errorText']>();
  helperText = input<Prop['helperText']>();
  value = input<Prop['value']>();
  enableOnOffLabels = input<Prop['enableOnOffLabels']>();
  labelPlacement = input<Prop['labelPlacement']>();
  justify = input<Prop['justify']>();
  required = input<Prop['required']>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  readonly StrOrTemplateComponent = StrOrTemplateComponent;
  label = input<TemplateRef<any>>();
}
