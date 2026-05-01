import * as v from 'valibot';
import { NFCSchema, actions } from '@piying/view-angular-core';
import { ConfirmService } from '@piying-lib/angular-daisyui/overlay';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({ content: 'overlay1' }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return () => {
                field.injector.get(ConfirmService).open({ title: 'title1', message: 'message1' });
              };
            },
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({ content: 'overlay2' }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return () => {
                field.injector.get(ConfirmService).open({
                  title: 'title1',
                  message: 'message1',
                  modal: true,
                  buttons: [{ close: async () => {}, label: 'close', class: 'btn-primary' }],
                });
              };
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
