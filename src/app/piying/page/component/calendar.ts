import * as v from 'valibot';
import { NFCSchema, actions, asControl, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const CalendarDefine = v.object({
  date1: v.pipe(v.date(), setComponent('calendar')),
  date2: v.pipe(
    v.date(),
    setComponent('picker-ref'),
    actions.inputs.patch({
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        actions.inputs.patchAsync({
          content: (field) => {
            return computed(() => {
              const pickerValue = field.context['pickerValue']();
              return pickerValue ? `${pickerValue}` : 'default';
            });
          },
        }),
      ),
      content: v.pipe(v.date(), setComponent('calendar')),
    }),
  ),
  date3: v.pipe(
    v.tuple([v.date(), v.date()]),
    asControl(),
    setComponent('picker-ref'),
    actions.inputs.patch({
      overlayConfig: { panelClass: 'bg-base-100' },
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        actions.inputs.patchAsync({
          content: (field) => {
            return computed(() => {
              const pickerValue = field.context['pickerValue']();
              return pickerValue ? `${pickerValue}` : 'default';
            });
          },
        }),
      ),
      content: v.pipe(
        v.tuple([v.date(), v.date()]),
        asControl(),
        setComponent('calendar'),
        actions.inputs.patch({ type: 'range' }),
      ),
    }),
  ),
});
