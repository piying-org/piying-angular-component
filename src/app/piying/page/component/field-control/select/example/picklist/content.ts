import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { computed } from '@angular/core';
export default v.pipe(
  v.tuple([v.picklist(['option1', 'option2'])]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
