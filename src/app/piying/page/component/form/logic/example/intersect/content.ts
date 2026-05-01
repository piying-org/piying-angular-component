import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.tuple([
    v.pipe(
      v.intersect([
        v.object({ l1: v.pipe(v.string(), v.title('l1')) }),
        v.object({ l2: v.pipe(v.string(), v.title('l2')) }),
      ]),
      safeDefine.setComponent('logic-group'),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
