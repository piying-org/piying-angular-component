import {
  afterNextRender,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  inject,
  input,
  PendingTasks,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';

import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CalendarPropsDirective } from './props.directive';
import type { CalendarDateProps } from 'cally';
import {
  DatedCalendarDateProps,
  DatedCalendarMultiProps,
  DatedCalendarRangeProps,
  DateKey,
  RangeDateKey,
} from './type';
import { range } from 'es-toolkit';
import { SelectionModel } from '@angular/cdk/collections';
import { toDateStr } from './date.util';

function DateEqual(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}
function DateAsc(a: Date, b: Date) {
  return a.getTime() - b.getTime();
}
@Component({
  selector: 'app-calendar',
  templateUrl: './component.html',
  imports: [
    FormsModule,
    AttributesDirective,
    NgTemplateOutlet,
    NgClass,
    CssPrefixPipe,
    MergeClassPipe,
    PurePipe,
    CalendarPropsDirective,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CalendarFCC),
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CalendarFCC extends BaseControl<Date | Date[]> {
  static __version = 2;
  templateRef = viewChild.required('templateRef');
  type = input<'date' | 'multi' | 'range'>('date');
  dateProps = input<DatedCalendarDateProps | DatedCalendarMultiProps | DatedCalendarRangeProps>();
  monthProps = input<number | number[]>(1);
  monthProps$$ = computed(() => {
    const value = this.monthProps();
    return typeof value === 'number'
      ? range(value).map((value) => {
          return value;
        })
      : value;
  });

  #multiList$$ = computed(() => {
    return new SelectionModel<Date>(true, this.value$() as Date[], undefined, DateEqual);
  });

  dateProps$$ = computed(() => {
    const props = this.dateProps();
    const converted: Record<string, any> = {};
    if (props) {
      (this.type() === 'range' ? RangeDateKey : DateKey).forEach((item) => {
        if ((props as any)[item]) {
          converted[item] = toDateStr((props as any)[item]);
        }
      });
    }
    let value;
    switch (this.type()) {
      case 'date': {
        if (this.value$()) {
          value = toDateStr(this.value$() as Date);
        }
        break;
      }
      case 'range': {
        value = ((this.value$() ?? []) as Date[])
          .map((item) => {
            return toDateStr(item);
          })
          .join('/');

        break;
      }
      case 'multi': {
        value = ((this.value$() ?? []) as Date[])
          .map((item) => {
            return toDateStr(item);
          })
          .join(' ');
        break;
      }
    }
    return {
      ...props,
      value,
      ...converted,
    } as CalendarDateProps;
  });
  #theme = inject(ThemeService);
  #callyInstance$$ = signal<typeof import('cally') | undefined>(undefined);

  callyInited$$ = computed(() => {
    return !!this.#callyInstance$$();
  });
  #pt = inject(PendingTasks);
  constructor() {
    super();
    afterNextRender(() => {
      this.#pt.run(() => {
        return import('cally').then((a) => this.#callyInstance$$.set(a));
      });
    });
  }
  focusdayChanged($event: CustomEvent<Date>) {
    switch (this.type()) {
      case 'multi':
        this.#multiList$$().toggle($event.detail);
        this.value$.set(this.#multiList$$().selected);
        this.valueAndTouchedChange(this.value$());
        break;
      case 'date': {
        this.value$.set($event.detail);
        this.valueAndTouchedChange(this.value$());
        break;
      }
    }
  }

  #rangeList: Date[] = [];
  rangestartChanged(event: CustomEvent<Date>) {
    this.#rangeList[0] = event.detail;
  }
  rangeendChanged(event: CustomEvent<Date>) {
    this.#rangeList[1] = event.detail;
    this.value$.set(this.#rangeList.sort(DateAsc));
    this.valueAndTouchedChange(this.value$());
  }
}
