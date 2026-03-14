import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
let ItemDefine = v.object({
  v1: v.pipe(v.string(), v.title('v1')),
  v2: v.pipe(v.number(), v.title('v2')),
  v3: v.pipe(v.boolean(), v.title('v3')),
});
export const ArrayDefine = v.object({
  array1: v.pipe(
    v.array(ItemDefine),
    setComponent('editable-array'),
    actions.inputs.patch({
      minLength: 1,
    }),
  ),
  array2: v.pipe(
    v.array(ItemDefine),
    setComponent('editable-array'),
    actions.inputs.patch({
      layout:'column',
      minLength: 1,
    }),
  ),
});
