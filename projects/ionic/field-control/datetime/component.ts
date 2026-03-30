import { Component, forwardRef, viewChild, TemplateRef, input, output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import { NgTemplateOutlet } from '@angular/common';
import { JSX } from '@ionic/core';
type Prop = JSX.IonDatetime;
@Component({
  selector: 'app-ion-datetime',
  templateUrl: './component.html',
  imports: [FormsModule, AttributesDirective, NgTemplateOutlet],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IonDatetimeFCC),
      multi: true,
    },
  ],
})
export class IonDatetimeFCC extends BaseControl {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  color = input<Prop['color']>();
  name = input<Prop['name']>();
  
  formatOptions = input<Prop['formatOptions']>();
  readonly = input<Prop['readonly']>();
  isDateEnabled = input<Prop['isDateEnabled']>();
  showAdjacentDays = input<Prop['showAdjacentDays']>();
  min = input<Prop['min']>();
  max = input<Prop['max']>();
  presentation = input<Prop['presentation']>();
  yearValues = input<Prop['yearValues']>();
  monthValues = input<Prop['monthValues']>();
  dayValues = input<Prop['dayValues']>();
  hourValues = input<Prop['hourValues']>();
  minuteValues = input<Prop['minuteValues']>();
  locale = input<Prop['locale']>();
  firstDayOfWeek = input<Prop['firstDayOfWeek']>();
  titleSelectedDatesFormatter = input<Prop['titleSelectedDatesFormatter']>();
  multiple = input<Prop['multiple']>();
  highlightedDates = input<Prop['highlightedDates']>();
  value = input<Prop['value']>();
  showDefaultTitle = input<Prop['showDefaultTitle']>();
  showDefaultButtons = input<Prop['showDefaultButtons']>();
  showClearButton = input<Prop['showClearButton']>();
  showDefaultTimeLabel = input<Prop['showDefaultTimeLabel']>();
  hourCycle = input<Prop['hourCycle']>();
  size = input<Prop['size']>();
  preferWheel = input<Prop['preferWheel']>();
  ionCancel = output<Parameters<NonNullable<Prop['onIonCancel']>>[0]>();
  ionChange = output<Parameters<NonNullable<Prop['onIonChange']>>[0]>();
  // ionValueChange = output<Parameters<NonNullable<Prop['onIonValueChange']>>[0]>();
  ionFocus = output<Parameters<NonNullable<Prop['onIonFocus']>>[0]>();
  ionBlur = output<Parameters<NonNullable<Prop['onIonBlur']>>[0]>();
  // ionStyle = output<Parameters<NonNullable<Prop['onIonStyle']>>[0]>();
  // ionRender = output<Parameters<NonNullable<Prop['onIonRender']>>[0]>();
  slot = input<{
    title: TemplateRef<any>;
    buttons: TemplateRef<any>;
    'time-label': TemplateRef<any>;
  }>();
}
