import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
export const LoginDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      setWrappers(['label-wrapper']),
      v.title('用户名'),
      componentClass('w-full'),
    ),
    password: v.pipe(
      v.string(),
      setWrappers(['label-wrapper']),
      v.title('密码'),
      componentClass('w-full'),
    ),
    __button: v.pipe(
      NFCSchema,
      setComponent('button'),
      patchInputs({
        content: '登录',
        color: 'primary',
      }),
      patchAsyncInputs({
        clicked: (field) => {
          return () => {
            return field.context?.['account'] && field.context['account'].login();
          };
        },
      }),
    ),
  }),
  setComponent('fieldset'),
);
