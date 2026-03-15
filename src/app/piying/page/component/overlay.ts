import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { FormDialogContainer } from '@piying-lib/angular-daisyui/extension';
import { Dialog } from '@angular/cdk/dialog';
import { PI_INPUT_OPTIONS_TOKEN } from '@piying/view-angular';
let item = v.object({
  l1: v.string(),
  l2: v.number(),
});
export const OverlayDefine = v.pipe(
  v.object({
    dialog1: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            let ref = field.injector.get(Dialog).open(FormDialogContainer, {
              data: {
                schema: item,
                title: '测试',
                cancelButton: '返回',
              },
              injector: field.injector,
            });
            ref.closed.subscribe((value) => {
              console.log(value);
            });
          };
        },
      }),
    ),
  }),
);
