import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';

export default v.pipe(
  v.tuple([
    v.pipe(v.string(), actions.wrappers.patch(['validate-status'])),
    v.pipe(
      v.number(),
      actions.wrappers.patch(['validate-status']),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          setTimeout(() => {
            field.form.control?.markAsTouched()
          }, 0);
        },
      }),
    ),
    v.pipe(
      v.number(),
      actions.wrappers.patch(['validate-status']),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          setTimeout(() => {
            field.form.control?.updateValue(1)
          }, 0);
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
