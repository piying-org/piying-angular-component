import {
  Component,
  forwardRef,
  viewChild,
  TemplateRef,
  input,
  output,
  computed,
  inject,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl, PI_VIEW_FIELD_TOKEN } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import {
  CommonSelectOptions,
  OptionConvert,
  DefaultOptionConvert,
  transformOptions,
} from '@piying-lib/angular-core';
type Prop = JSX.IonSelect;
@Component({
  selector: 'app-ion-select',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet, IonSelect, IonSelectOption],
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

  options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
    transform: (input) => input ?? [],
  });
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });
  /** 空选项时显示的内容 */
  emptyOptionContent = input<string>('------');

  resolvedOptions$$ = computed(() => transformOptions(this.options(), this.optionConvert()));
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  optionTemplate$$ = computed(() => {
    return this.field$$().props()['optionTemplate'];
  });
}
