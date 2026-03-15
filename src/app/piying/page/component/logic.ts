import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';

export const LogicDefine = v.object({
  i1: v.pipe(
    v.intersect([
      v.object({ l1: v.pipe(v.string(), v.title('l1')) }),
      v.object({ l2: v.pipe(v.string(), v.title('l2')) }),
    ]),
    setComponent('logic-group'),
  ),
  u1: v.pipe(
    v.union([
      v.object({ l1: v.pipe(v.string(), v.title('l1')) }),
      v.object({ l2: v.pipe(v.string(), v.title('l2')) }),
    ]),
    setComponent('logic-group'),
  ),
  u2: v.pipe(
    v.union([
      v.pipe(v.object({ l1: v.pipe(v.string(), v.title('l1')) }), v.title('tab1')),
      v.pipe(v.object({ l2: v.pipe(v.string(), v.title('l2')) }), v.title('tab2')),
    ]),
    setComponent('tabs'),
    actions.inputs.patch({
      activatedIndex: 1,
    }),
  ),
});
