import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export const TriggerButton = v.pipe(
  NFCSchema,
  safeDefine.setComponent('button', (actions) => {
    return [actions.inputs.patch({ content: '点击选择' })];
  }),
);
export const ContentButton = v.pipe(
  NFCSchema,
  safeDefine.setComponent('button', (actions) => {
    return [
      actions.inputs.patch({ content: '内容' }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {            
            field.context['close']();
          };
        },
      }),
    ];
  }),
);
