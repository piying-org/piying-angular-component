import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
export const LoginDefine = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('用户名'),
      actions.class.component('w-full'),
    ),
    password: v.pipe(
      v.string(),
      actions.wrappers.set(['label-wrapper']),
      v.title('密码'),
      actions.class.component('w-full'),
    ),
    __button: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: '登录',
        color: 'primary',
      }),
      actions.inputs.patchAsync({
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
