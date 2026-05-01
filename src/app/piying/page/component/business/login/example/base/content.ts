import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
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
      safeDefine.setComponent('password')
    ),
    __button: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
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
        ];
      }),
    ),
  }),
  actions.wrappers.patch(['fieldset']),
);
