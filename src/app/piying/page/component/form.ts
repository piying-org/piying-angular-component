import * as v from 'valibot';
import {
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
const FormBase = v.object({
  input: v.pipe(v.string(), setWrappers(['label-wrapper']), v.title('string-control')),
  number: v.pipe(v.number(), setWrappers(['label-wrapper']), v.title('number-control')),
  range: v.pipe(
    v.number(),
    setComponent('range'),
    setWrappers(['label-wrapper']),
    v.title('range-control'),
  ),

  boolean: v.pipe(
    v.boolean(),
    setWrappers(['label-wrapper']),
    v.title('boolean-control'),
    patchProps({
      labelPosition: 'right',
    }),
  ),
  toggle: v.pipe(
    v.boolean(),
    setComponent('toggle'),
    setWrappers(['label-wrapper']),
    v.title('toggle-control'),
    patchProps({
      labelPosition: 'right',
    }),
  ),
  select: v.pipe(
    v.string(),
    setComponent('select'),
    setWrappers(['label-wrapper']),
    v.title('select-control'),
    patchProps({
      labelPosition: 'top',
    }),
    patchInputs({
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
    setWrappers(['label-wrapper']),
    v.title('radio-control'),
    patchProps({
      labelPosition: 'top',
    }),
    patchInputs({
      options: [
        { label: 'label1', value: 'value1' },
        { label: 'label2', value: 'value2' },
        { label: 'label3', value: 'value3' },
      ],
    }),
  ),
  textarea1: v.pipe(
    v.string(),
    setComponent('textarea'),
    setWrappers(['label-wrapper']),
    v.title('textarea-control'),
    patchProps({
      labelPosition: 'top',
    }),
  ),
  date: v.pipe(v.date()),
  calendar: v.pipe(
    v.date(),
    setComponent('picker-ref'),
    patchInputs({
      overlayConfig: {
        panelClass: 'bg-base-100',
      },
    }),
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
export const FormDefine = v.pipe(
  v.object({
    form1: v.pipe(FormBase, setWrappers(['div']), topClass('grid gap-2')),
    form2: v.pipe(
      FormBase,
      setComponent('fieldset'),
      v.title('form-field title'),
      topClass('bg-base-200 border-base-300 rounded-box border w-fit p-4'),
    ),
  }),
);
