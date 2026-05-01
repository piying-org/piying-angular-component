import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(
        v.object({
          name: v.pipe(v.string(), v.title('字段名称'), actions.wrappers.set([])),
          description: v.pipe(v.string(), v.title('描述信息'), actions.wrappers.set([])),
          status: v.pipe(v.boolean(), v.title('使用'), actions.wrappers.set([])),
        }),
      ),
      safeDefine.setComponent('editable-row', (actions) => {
        return [actions.inputs.patch({})];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
