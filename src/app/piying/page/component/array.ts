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
      layout: 'column',
      minLength: 1,
    }),
  ),
  array3: v.pipe(
    v.array(ItemDefine),
    setComponent('editable-array'),
    actions.inputs.patch({
      layout: 'column',
      addMode: 1,
      minLength: 1,
      initValue: (index: any) => {
        return {
          v1: `${index}`,
          v2: index,
          v3: !!index,
        };
      },
    }),
  ),
  checkbox1: v.pipe(
    v.array(
      v.pipe(v.string(), setComponent('boolean'), actions.props.patch({ disableRequired: true })),
    ),
    setComponent('checkbox-list'),
    actions.inputs.patchAsync({
      options: (field) => {
        return [
          {
            value: '1',
            props: { title: '1' },
          },
          {
            value: '2',
            props: { title: '2' },
          },
        ];
      },
    }),
  ),
});
