import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  forwardRef,
  inject,
  input,
  resource,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AttributesDirective, BaseControl } from '@piying/view-angular';
import {
  Color,
  DefaultOptionConvert,
  OptionConvert,
  SelectOption,
  Size,
  transformOptions,
} from '@piying/angular-daisyui/util';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '@piying/angular-daisyui/service';
import { CssPrefixPipe, MergeClassPipe } from '@piying/angular-daisyui/pipe';
import { PurePipe } from '@cyia/ngx-common/pipe';
import { CalendarPropsDirective } from './props.directive';
import type { CalendarDateProps, CalendarMultiProps, CalendarRangeProps } from 'cally';
import {
  DatedCalendarDateProps,
  DatedCalendarMultiProps,
  DatedCalendarRangeProps,
  DateKey,
  RangeDateKey,
} from './type';
import { range } from 'es-toolkit';
import { SelectionModel } from '@angular/cdk/collections';

function toDateStr(date: Date) {
  let month = `${date.getMonth() + 1}`.padStart(2, '0');
  let day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}
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
  monthProps = input<number>(1);
  monthProps$$ = computed(() => {
    return range(this.monthProps()).map((value) => {
      return value;
    });
  });

  #multiList$$ = computed(() => {
    return new SelectionModel<Date>(true, this.value$() as Date[], undefined, DateEqual);
  });

  dateProps$$ = computed(() => {
    let props = this.dateProps();
    let converted: Record<string, any> = {};
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
  callyInstance = resource({
    loader: () => {
      return import('cally');
    },
  });
  callyInited$$ = computed(() => {
    return !!this.callyInstance.value();
  });

  focusdayChanged($event: CustomEvent<Date>) {
    switch (this.type()) {
      case 'multi':
        this.#multiList$$().toggle($event.detail);
        this.value$.set(this.#multiList$$().selected);
        this.valueChange(this.value$());
        break;
      case 'date': {
        this.value$.set($event.detail);
        this.valueChange(this.value$());
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
    this.valueChange(this.value$());
  }
}
