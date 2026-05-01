import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';

export default v.pipe(
  v.array(
    v.pipe(v.string(), setComponent('boolean'), actions.props.patch({ disableRequired: true })),
  ),
  setComponent('checkbox-list'),
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
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
