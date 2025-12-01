import * as v from 'valibot';
import { NFCSchema, patchAsyncInputs, patchInputs, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const CalendarDefine = v.object({
  date1: v.pipe(v.date(), setComponent('calendar')),
  date2: v.pipe(
    v.date(),
    setComponent('picker-ref'),
    patchInputs({
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        patchAsyncInputs({
          content: (field) => {
            return computed(() => {
              let pickerValue = field.context['pickerValue']();
              return pickerValue ? `${pickerValue}` : 'default';
            });
          },
        }),
      ),
      content: v.pipe(v.date(), setComponent('calendar')),
    }),
  ),
});
