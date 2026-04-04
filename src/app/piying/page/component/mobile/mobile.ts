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
              title: '1',
              router: { routerLink: ['tab1'] },
              icon: {
                fontIcon: 'add',
              },
            },
            {
              title: '2',
              router: { routerLink: ['tab2'] },
              icon: {
                fontIcon: 'add',
              },
            },
            {
              title: '3',
              router: { routerLink: ['tab3'] },
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
