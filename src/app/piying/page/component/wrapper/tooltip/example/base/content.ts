import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';

export default v.pipe(
  v.tuple([
    v.pipe(v.string(), v.description('tooltip-description'), actions.wrappers.patch(['tooltip'])),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
