import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { PickerRefService } from '@piying-lib/angular-daisyui/extension';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button'),
      actions.wrappers.patch([
        {
          type: 'picker-ref',
        },
      ]),
      actions.props.patch({
        pickerRef: {
          originSource: 'event',
          content: v.pipe(
            NFCSchema,
            safeDefine.setComponent('menu-tree', (actions) => {
              return [actions.inputs.patch({ list: [{ title: 'test1' }] })];
            }),
            actions.hooks.merge({
              allFieldsResolved: (field) => {
                console.log(field.injector.get(PickerRefService));
              },
            }),
            actions.attributes.patch({
              class: 'bg-base-200 rounded-xl shadow-2xs',
            }),
          ),
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
