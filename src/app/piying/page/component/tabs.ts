import * as v from 'valibot';
import {
  NFCSchema,
  actions,
  setComponent,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const TabsDefine = v.object({
  tab1: v.pipe(
    v.object({
      k1: v.pipe(
        v.object({
          d1: v.pipe(v.string(), setComponent('input'), actions.attributes.patch({ placeholder: 'tab1' })),
        }),
        v.title('k1-title'),
      ),
      k2: v.pipe(
        v.object({
          d1: v.pipe(v.string(), setComponent('input'), actions.attributes.patch({ placeholder: 'tab2' })),
        }),
        actions.props.patch({
          title: v.pipe(NFCSchema, setComponent('button')),
        }),
      ),
    }),
    setComponent('tabs'),
  ),
});
