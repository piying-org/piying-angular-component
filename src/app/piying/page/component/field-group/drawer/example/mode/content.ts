import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.object({
        content: v.object({
          _btn: v.pipe(
            NFCSchema,
            setComponent('button'),
            v.title('l1-title'),
            safeDefine.setComponent('button', (actions) => {
              return [
                actions.attributes.patch({
                  for: 'exp-1',
                }),
              ];
            }),
          ),
        }),
        side: v.pipe(
          v.object({
            l1: v.pipe(v.string(), v.title('l1-title')),
            l2: v.pipe(v.boolean(), v.title('l2-title')),
          }),
          actions.wrappers.patch(['div']),
          actions.class.top('bg-base-100'),
        ),
      }),
      safeDefine.setComponent('drawer', (actions) => {
        return [
          actions.inputs.patch({
            mode: 'side',
            name: 'exp-1',
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 will-change-transform'),
);
