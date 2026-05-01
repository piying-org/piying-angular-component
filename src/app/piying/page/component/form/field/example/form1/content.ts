import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';

const FormBase = v.object({
  input: v.pipe(v.string(), v.title('string-control')),
  password: v.pipe(v.string(), v.title('string-control'), setComponent('password')),
  number: v.pipe(v.number(), v.title('number-control')),
  range: v.pipe(v.number(), setComponent('range'), v.title('range-control')),

  boolean: v.pipe(v.boolean(), v.title('boolean-control')),
  toggle: v.pipe(v.boolean(), setComponent('toggle'), v.title('toggle-control')),
  select: v.pipe(
    v.string(),
    setComponent('select'),
    v.title('select-control'),
    actions.inputs.patch({
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ],
    }),
  ),
  radio1: v.pipe(
    v.string(),
    setComponent('radio'),
    v.title('radio-control'),
    actions.inputs.patch({
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ],
    }),
  ),
  rating1: v.pipe(v.number(), setComponent('rating'), actions.inputs.patch({ min: 2, half: true })),
  textarea1: v.pipe(v.string(), setComponent('textarea'), v.title('textarea-control')),
  date: v.pipe(v.date()),
  calendar: v.pipe(
    v.date(),
    setComponent('picker-ref'),
    actions.inputs.patch({
      overlayConfig: {
        panelClass: 'bg-base-100',
      },
    }),
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
});

export default v.pipe(
  v.object({
    form1: v.pipe(FormBase, actions.wrappers.set(['div']), actions.class.top('grid gap-2')),
  }),
);
