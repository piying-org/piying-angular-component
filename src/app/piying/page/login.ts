import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchInputs,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { LoginDefine } from './component/login';
export const LoginPageDefine = v.pipe(
  v.object({
    __logo: v.pipe(
      NFCSchema,
      setComponent('common-data'),
      patchInputs({
        content: {
          icon: { fontSet: 'icon', fontIcon: 'icon-logo' },
        },
      }),
    ),
    __login: v.pipe(LoginDefine, topClass('max-w-[50vw] w-full')),
  }),
  setWrappers(['div']),
  topClass('flex items-center justify-center h-[100vh] flex-col'),
);
