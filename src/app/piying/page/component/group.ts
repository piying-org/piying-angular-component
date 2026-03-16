import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
const ItemDefine = v.object({
  v1: v.pipe(v.string(), v.title('v1')),
  v2: v.pipe(v.number(), v.title('v2')),
  v3: v.pipe(v.boolean(), v.title('v3')),
});
export const GroupDefine = v.object({
  group1: v.pipe(
    v.record(v.pipe(v.string(), v.title('key')), ItemDefine),
    setComponent('editable-group'),
    actions.inputs.patch({
      layout: 'column',
    }),
  ),
  tab1: v.pipe(
    v.intersect([
      v.pipe(v.object({ l1: v.string() }), v.title('step1')),
      v.pipe(v.object({ l2: v.number() }), v.title('step2')),
    ]),
    setComponent('steps'),
  ),
});
