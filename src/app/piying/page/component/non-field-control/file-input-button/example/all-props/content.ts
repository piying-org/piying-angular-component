import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('file-input-button', (actions) => {
        return [
          actions.inputs.patch({
            content: 'Complete File Input',
            color: 'primary',
            style: 'soft',
            size: 'lg',
            shape: 'square',
            accept: '.jpg,.png,.gif',
            multiple: false,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
