import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: 'Click Loading...',
            async clicked(event) {
              return new Promise((res) => {
                setTimeout(() => {
                  res();
                }, 3000);
              });
            },
          }),
        ];
      }),
    ),
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: 'No Loading Icon',
            disableLoadingIcon: true,
            async clicked(event) {
              return new Promise((res) => {
                setTimeout(() => {
                  res();
                }, 3000);
              });
            },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
