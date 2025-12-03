import * as v from 'valibot';
import {
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const SelectDefine = v.object({
  native1: v.pipe(v.string(), setComponent('select'), patchInputs({ options: ['item0', 'item1'] })),
  custom1: v.pipe(
    v.string(),
    setComponent('picker-ref'),
    patchInputs({
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        patchAsyncInputs({
          content: (field) => {
            return computed(() => {
              let pickerValue = field.context['pickerValue']();
              return pickerValue ?? '[empty]';
            });
          },
        }),
      ),
      content: v.pipe(
        v.string(),
        setComponent('option-list'),
        setWrappers(['local-filter']),
        patchProps({ options: ['item0', 'item1'] }),
      ),
    }),
  ),
});
