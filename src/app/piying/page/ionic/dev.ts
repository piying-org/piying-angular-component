import * as v from 'valibot';
import { actions } from '@piying/view-angular';
import { safeDefine } from './define';

export const IonicDevDefine = v.pipe(
  v.object({
    string: v.pipe(
      v.string(),
      safeDefine.setComponent('string', (actions) => {
        return [actions.inputs.patch({ label: 'label1' })];
      }),
    ),
    radioGroup: v.pipe(
      v.string(),
      safeDefine.setComponent('radioGroup', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
    ),
  }),
  actions.wrappers.patch(['div']),
  actions.class.top('ionic-page'),
  // actions.providers.patch([]),
);
