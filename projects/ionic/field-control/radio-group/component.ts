import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  input,
  viewChild,
  output,
  TemplateRef,
  computed,
  forwardRef,
  inject,
} from '@angular/core';
import {
  AttributesDirective,
  BaseControl,
  PI_VIEW_FIELD_TOKEN,
  PiyingViewGroupBase,
} from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonRadio, IonRadioGroup } from '@ionic/angular/standalone';
import {
  Color,
  CommonSelectOptions,
  DefaultOptionConvert,
  OptionConvert,
  ResolvedOption,
  Size,
  StrOrTemplateComponent,
} from '@piying-lib/angular-core';
type Prop = JSX.IonRadioGroup;

@Component({
  selector: 'app-ion-radio-group',
  templateUrl: './component.html',
  imports: [AttributesDirective, NgTemplateOutlet, IonRadioGroup, IonRadio, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonRadioGroupFCC),
      multi: true,
    },
  ],
})
export class IonRadioGroupFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  allowEmptySelection = input<Prop['allowEmptySelection']>();
  compareWith = input<Prop['compareWith']>();
  name = input<Prop['name']>();
  value = input<Prop['value']>();
  helperText = input<Prop['helperText']>();
  errorText = input<Prop['errorText']>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  // ionValueChange = output<Parameters<NonNullable<Prop['onIonValueChange']>>[0]>();
  slot = input<{ default: TemplateRef<any> }>();

  /** 选项列表 */
  options = input<CommonSelectOptions, CommonSelectOptions | undefined>([], {
    transform: (input) => input ?? [],
  });
  /** 选项模板 */
  optionTemplate = input<TemplateRef<any>>();
  /** 选项转换器 */
  optionConvert = input<OptionConvert, Partial<OptionConvert>>(DefaultOptionConvert, {
    transform: (input) => ({ ...DefaultOptionConvert, ...input }),
  });

  resolvedOptions$$ = computed(() => this.transformOptions(this.options()));
  transformOptions(options: any[]): ResolvedOption[] {
    return options.map((option) => {
      const resolvedItem: ResolvedOption = {
        label: this.optionConvert().label(option),
        value: this.optionConvert().value(option),
        disabled: this.optionConvert().disabled?.(option) ?? false,
        description: this.optionConvert().description?.(option),
        type: 'option',
        origin: option,
      };
      return resolvedItem;
    });
  }
  field$$ = inject(PI_VIEW_FIELD_TOKEN);
  optionTemplate$$ = computed(() => {
    return this.field$$().props()['optionTemplate'];
  });
}
