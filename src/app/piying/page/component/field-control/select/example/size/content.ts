import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
            size: 'xs',
          }),
        ];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
            size: 'sm',
          }),
        ];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
            size: 'md',
          }),
        ];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [
          actions.inputs.patch({
            options: [
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ],
            size: 'lg',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
