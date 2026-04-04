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
                title: '菜单项 2',
                icon: { fontIcon: 'settings' },
                router: { routerLink: '/path2' },
              },
              {
                title: '可点击',
                icon: { fontIcon: 'ads_click' },
                clicked(event, item) {
                  console.log(event, item);
                },
              },
              { type: 'divider' },
              {
                type: 'group',
                title: '分组',
                children: [
                  {
                    type: 'basic',
                    title: '子项',
                    icon: { fontIcon: 'star' },
                    router: { routerLink: '/path3' },
                  },
                ],
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
