import * as v from 'valibot';
import {
  NFCSchema,
  patchAsyncInputs,
  patchAttributes,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const TabsDefine = v.object({
  tab1: v.pipe(
    v.object({
      k1: v.pipe(
        v.object({
          d1: v.pipe(v.string(), setComponent('input'), patchAttributes({ placeholder: 'tab1' })),
        }),
        v.title('k1-title'),
      ),
      k2: v.pipe(
        v.object({
          d1: v.pipe(v.string(), setComponent('input'), patchAttributes({ placeholder: 'tab2' })),
        }),
        patchProps({
          title: v.pipe(NFCSchema, setComponent('button')),
        }),
      ),
    }),
    setComponent('tabs'),
  ),
});
