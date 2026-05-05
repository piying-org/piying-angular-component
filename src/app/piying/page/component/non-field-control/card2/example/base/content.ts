import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    safeDefine.nfcComponent('card2', (actions) => {
      return [
        actions.inputs.patch({
          title: safeDefine.nfcComponent('common-data', (actions) => {
            return [actions.inputs.patch({ content: 'title' })];
          }),
          titleActions: safeDefine.nfcComponent('button', (actions) => {
            return [actions.inputs.patch({ content: 'A', shape: 'circle', style: 'ghost' })];
          }),
          body: safeDefine.nfcComponent('common-data', (actions) => {
            return [actions.inputs.patch({ content: 'body content' })];
          }),
          actions: v.tuple([
            safeDefine.nfcComponent('button', (actions) => {
              return [actions.inputs.patch({ content: 'btn1' })];
            }),
            safeDefine.nfcComponent('button', (actions) => {
              return [actions.inputs.patch({ content: 'btn2' })];
            }),
          ]),
        }),
        actions.attributes.patch({ class: 'bg-base-100 w-96 shadow-sm' }),
      ];
    }),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
