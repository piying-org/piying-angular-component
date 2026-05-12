import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('menu-tree', (actions) => {
        return [
          actions.inputs.patch({
            list: [
              {
                title: '菜单项 1',
                icon: { fontIcon: 'home' },
                router: { routerLink: '/path1' },
              },
              {
                title: '禁用',
                disabled: true,
              },
            ],
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
