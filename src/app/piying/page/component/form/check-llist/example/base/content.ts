import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.array(
    v.pipe(v.string(), safeDefine.setComponent('boolean', (actions) => {
      return [
        actions.props.patch({ disableRequired: true }),
      ];
    })),
  ),
  safeDefine.setComponent('checkbox-list', (actions) => {
    return [
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
    ];
  }),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
