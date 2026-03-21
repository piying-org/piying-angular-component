import * as v from 'valibot';
import { NFCSchema } from '@piying/view-angular-core';
import { typedComponent } from '@piying/view-angular';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  NFCSchema,
  safeDefine.setComponent('button', (actions) => {
    return [actions.inputs.patch({ content: 'base' })];
  }),
);
