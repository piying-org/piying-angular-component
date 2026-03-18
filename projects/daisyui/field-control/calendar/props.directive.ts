import { Directive, ElementRef, inject, input } from '@angular/core';
import type { CalendarDateProps, CalendarMultiProps, CalendarRangeProps } from 'cally';
@Directive({
  selector: '[calendarProps]',
})
export class CalendarPropsDirective<
  T extends CalendarDateProps | CalendarMultiProps | CalendarRangeProps,
> {
  /** 日历属性配置 */
  calendarProps = input<T>();
  #el = inject(ElementRef);

  ngOnChanges(): void {
    const attr = this.calendarProps();
    if (!attr) {
      return;
    }
    for (const key in attr) {
      (this.#el.nativeElement as T)[key] = attr[key];
    }
  }
}
