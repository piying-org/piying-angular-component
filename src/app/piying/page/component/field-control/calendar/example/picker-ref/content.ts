import * as v from 'valibot';
import { actions, asControl, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
export default v.pipe(
  v.tuple([
    v.pipe(
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
                return pickerValue ? `${pickerValue}` : '[date]';
              });
            },
          }),
        ),
        content: v.pipe(
          v.date(),
          setComponent('calendar'),
          actions.attributes.patch({
            class: 'bg-base-200 rounded-xl shadow-2xs',
          }),
        ),
      }),
    ),

    v.pipe(
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
                return pickerValue ? `${pickerValue}` : '[date range]';
              });
            },
          }),
        ),
        content: v.pipe(
          v.tuple([v.date(), v.date()]),
          asControl(),
          setComponent('calendar'),
          actions.inputs.patch({ type: 'range' }),
          actions.attributes.patch({
            class: 'bg-base-200 rounded-xl shadow-2xs',
          }),
        ),
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
