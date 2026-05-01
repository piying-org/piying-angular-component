import * as v from 'valibot';
import {
  actions,
  FieldLogicGroup,
  nfcComponent,
  NFCSchema,
  setComponent,
} from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';

export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        let setIndex = 0;
        return [
          actions.inputs.patch({ content: 'switch' }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return () => {
                let control = field.get(['..', 1])?.form.control as FieldLogicGroup;
                control.filterActivateControl$.set((_, index) => setIndex === index);
                setIndex = setIndex ? 0 : 1;
              };
            },
          }),
        ];
      }),
    ),
    v.pipe(
      v.union([
        v.object({ l1: v.pipe(v.string(), v.title('l1')) }),
        v.object({ l2: v.pipe(v.string(), v.title('l2')) }),
      ]),
      setComponent('logic-group'),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 items-end'),
);
