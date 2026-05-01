import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';

export default v.pipe(
  v.tuple([
    v.pipe(
      v.intersect([
        v.object({ l1: v.pipe(v.string(), v.title('l1')) }),
        v.object({ l2: v.pipe(v.string(), v.title('l2')) }),
      ]),
      setComponent('logic-group'),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
