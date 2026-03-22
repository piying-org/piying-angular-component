import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('stat', (actions) => {
        return [
          actions.inputs.patch({
            title: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [actions.inputs.patch({ content: 'Complete Stat' })];
              }),
            ),
            titleClass: 'text-xl font-bold',
            value: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [actions.inputs.patch({ content: '99.9%' })];
              }),
            ),
            valueClass: 'text-4xl font-bold text-primary',
            desc: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [actions.inputs.patch({ content: 'Success rate this month' })];
              }),
            ),
            descClass: 'text-success',
            figure: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [actions.inputs.patch({ content: { icon: { fontIcon: 'stars' } } })];
              }),
            ),
            figureClass: 'text-warning',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
