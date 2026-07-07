import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.union([
        v.pipe(
          v.object({
            k1: v.pipe(v.string(), actions.attributes.patch({ placeholder: 'k1-value' })),
          }),
          v.title('选择1'),
        ),
        v.pipe(
          v.object({
            k2: v.pipe(v.string(), actions.attributes.patch({ placeholder: 'k2-value' })),
          }),
          v.title('选择2'),
        ),
      ]),
      setComponent('radio-group'),
      actions.wrappers.patch(['div']),
    ),
    v.pipe(
      v.union([
        v.pipe(
          v.object({
            type: v.pipe(v.literal('type1'), safeDefine.setComponent('readonly-value')),
            k1: v.pipe(v.string(), actions.attributes.patch({ placeholder: 'k1-value' })),
          }),
          v.title('选择1'),
        ),
        v.pipe(
          v.object({
            type: v.pipe(v.literal('type2'), safeDefine.setComponent('readonly-value')),
            k2: v.pipe(v.string(), actions.attributes.patch({ placeholder: 'k2-value' })),
          }),
          v.title('选择2'),
        ),
      ]),
      setComponent('radio-group'),
      actions.wrappers.patch(['div']),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          field.form.control?.updateValue({ type: 'type2', k2: '123' });
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
