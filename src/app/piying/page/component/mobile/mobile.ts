import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export const DaiMobileDev = v.object({
  __tab: v.pipe(
    NFCSchema,
    safeDefine.setComponent('dock-tab', (actions) => {
      return [
        actions.inputs.patch({
          list: [
            {
              name: 'tab1',
              title: '1',
              router: { routerLink: [{ outlets: { tab1: ['tab'] } }] },
              icon: {
                fontIcon: 'add',
              },
            },
            {
              name: 'tab2',
              title: '2',
              router: { routerLink: [{ outlets: { tab2: ['tab'] } }] },
              icon: {
                fontIcon: 'add',
              },
            },
            {
              name: 'tab3',
              title: '3',
              router: { routerLink: [{ outlets: { tab3: ['tab'] } }] },
              icon: {
                fontIcon: 'add',
              },
            },
          ],
        }),
      ];
    }),
    actions.wrappers.patch(['div']),
    actions.class.top(' will-change-transform h-full'),
  ),
});
