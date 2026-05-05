import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
const LoginDefine = v.object({
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
    safeDefine.setComponent('password'),
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
});
export default v.pipe(
  v.object({
    __logo: v.pipe(
      NFCSchema,
      setComponent('common-data'),
      actions.inputs.patch({
        content: {
          icon: { fontSet: 'icon', fontIcon: 'icon-logo' },
        },
      }),
    ),
    __login: v.pipe(
      LoginDefine,
      actions.class.top('max-w-[50vw] w-full'),
      actions.wrappers.patch(['fieldset']),
    ),
  }),
  actions.wrappers.set(['div']),
  actions.class.top('flex items-center justify-center h-[100vh] flex-col'),
);
