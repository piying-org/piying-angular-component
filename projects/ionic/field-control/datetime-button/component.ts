import { NgTemplateOutlet } from '@angular/common';
import { Component, viewChild, TemplateRef, input, forwardRef, computed } from '@angular/core';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { JSX } from '@ionic/core';
import { IonDatetimeButton } from '@ionic/angular/standalone';
import { IonModal, IonDatetime } from '@ionic/angular/standalone';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
type Prop = JSX.IonDatetimeButton;
type Prop2 = JSX.IonDatetime;

@Component({
  selector: 'app-ion-datetime-button',
  templateUrl: './component.html',
  imports: [
    AttributesDirective,
    NgTemplateOutlet,
    FormsModule,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonDatetimeButtonFCC),
      multi: true,
    },
  ],
})
export class IonDatetimeButtonFCC extends BaseControl<Date> {
  static __version = 2;
  static index = 0;
  readonly datetime = `datetime-button-${IonDatetimeButtonFCC.index++}`;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  disabled = input<Prop['disabled']>();
  slot = input<TemplateRef<any>>();
  name = input<Prop2['name']>();
  formatOptions = input<Prop2['formatOptions']>();
  readonly = input<Prop2['readonly']>();
  isDateEnabled = input<Prop2['isDateEnabled']>();
  showAdjacentDays = input<Prop2['showAdjacentDays']>();
  min = input<Prop2['min']>();
  max = input<Prop2['max']>();
  presentation = input<Prop2['presentation']>();
  yearValues = input<Prop2['yearValues']>();
  monthValues = input<Prop2['monthValues']>();
  dayValues = input<Prop2['dayValues']>();
  hourValues = input<Prop2['hourValues']>();
  minuteValues = input<Prop2['minuteValues']>();
  locale = input<Prop2['locale']>();
  firstDayOfWeek = input<Prop2['firstDayOfWeek']>();
  titleSelectedDatesFormatter = input<Prop2['titleSelectedDatesFormatter']>();
  multiple = input<Prop2['multiple']>();
  highlightedDates = input<Prop2['highlightedDates']>();
  showDefaultTitle = input<Prop2['showDefaultTitle']>(true);
  showDefaultButtons = input<Prop2['showDefaultButtons']>(true);
  showClearButton = input<Prop2['showClearButton']>(true);
  showDefaultTimeLabel = input<Prop2['showDefaultTimeLabel']>();
  hourCycle = input<Prop2['hourCycle']>();
  size = input<Prop2['size']>();
  preferWheel = input<Prop2['preferWheel']>();
  value2$$ = computed(() => {
    const value = this.value$();
    return value ? value.toISOString() : undefined;
  });
  valueChange2(value: any) {
    this.valueChange(new Date(value));
  }
}
