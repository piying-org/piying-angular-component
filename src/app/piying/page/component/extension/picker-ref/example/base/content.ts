import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { ContentButton, TriggerButton } from '../../const';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            trigger: TriggerButton,
            content: ContentButton,
            overlayConfig: { positionStrategy: undefined },
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
