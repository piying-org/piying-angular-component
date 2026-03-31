import * as v from 'valibot';
import { actions } from '@piying/view-angular';
import { safeDefine } from './define';
import { valueChange } from '@piying/view-angular-core';
function valueChangeLog<T>() {
  return valueChange<T>((fn) => {
    fn({ list: [undefined] }).subscribe(({ list: [value], field }) => {
      console.log(field.key, value);
    });
  });
}
export const IonicDevDefine = v.pipe(
  v.object({
    string: v.pipe(
      v.string(),
      safeDefine.setComponent('string', (actions) => {
        return [actions.inputs.patch({ label: 'label1' })];
      }),
      valueChangeLog(),
    ),
    password: v.pipe(
      v.string(),
      safeDefine.setComponent('password', (actions) => {
        return [actions.inputs.patch({ label: 'pwd' })];
      }),
      valueChangeLog(),
    ),
    radioGroup: v.pipe(
      v.string(),
      safeDefine.setComponent('radioGroup', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
      valueChangeLog(),
    ),
    boolean: v.pipe(v.boolean(), valueChangeLog()),
    date: v.pipe(v.date(), valueChangeLog(), v.title('日期按钮')),
    select: v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
      valueChangeLog(),
    ),
    toggle: v.pipe(
      v.boolean(),
      safeDefine.setComponent('toggle', (actions) => {
        return [];
      }),
      valueChangeLog(),
    ),
    textarea: v.pipe(
      v.string(),
      safeDefine.setComponent('textarea', (actions) => {
        return [];
      }),
      valueChangeLog(),
    ),
  }),
  actions.wrappers.patch(['div']),
  actions.class.top('ionic-page'),
  // actions.providers.patch([]),
);
