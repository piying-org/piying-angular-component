import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      v.title('minLength-10'),
      v.minLength(10),
      actions.wrappers.patch(['validate-hint']),
    ),
    v.pipe(
      v.string(),
      v.title('maxLength-10'),
      v.maxLength(10),
      actions.wrappers.patch(['validate-hint']),
    ),
    v.pipe(
      v.number(),
      v.title('minValue-10'),
      v.minValue(10),
      actions.wrappers.patch(['validate-hint']),
    ),
    v.pipe(
      v.number(),
      v.title('maxValue-10'),
      v.maxValue(10),
      actions.wrappers.patch(['validate-hint']),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
