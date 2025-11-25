import { Directive, ElementRef, inject, input } from '@angular/core';
import type { CalendarDateProps, CalendarMonthProps, CalendarMultiProps, CalendarRangeProps } from 'cally';
@Directive({
  selector: '[calendarProps]',
})
export class CalendarPropsDirective<T extends CalendarDateProps| CalendarMultiProps| CalendarRangeProps> {
  calendarProps = input<T>();
  #el = inject(ElementRef);

  ngOnChanges(): void {
    let attr = this.calendarProps();
    if (!attr) {
      return;
    }
    for (const key in attr) {
      (this.#el.nativeElement as T)[key] = attr[key];
    }
  }
}
