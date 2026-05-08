import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('autocomplete', (actions) => {
        return [
          actions.inputs.patch({ type: 'color', allowCustom: true }),
          actions.inputs.patchAsync({
            options: (field) => {
              return [{ value: '#ffffff' }, { value: '#000000' }, { value: '#ff0000' }];
            },
          }),
        ];
      }),
    ),
    v.pipe(
      v.string(),
      safeDefine.setComponent('autocomplete', (actions) => {
        return [
          actions.inputs.patch({ type: 'color', allowCustom: true }),
          actions.attributes.patch({ class: 'min-w-[48px] min-h-[48px] p-0 border-0 cursor-pointer' }),
          actions.inputs.patchAsync({
            options: (field) => {
              return [{ value: '#ffffff' }, { value: '#000000' }, { value: '#ff0000' }];
            },
          }),
          actions.wrappers.patch([
            { type: 'div', attributes: { class: 'btn btn-circle btn-ghost overflow-hidden ' } },
          ]),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
