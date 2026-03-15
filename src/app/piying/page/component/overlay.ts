import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { FormDialogContainer } from '@piying-lib/angular-daisyui/extension';
import { Dialog } from '@angular/cdk/dialog';
const item = v.object({
  // 弹窗内显示会有问题,本质上是滚动条问题
  l1: v.pipe(v.string(), actions.wrappers.patch(['validate-tooltip-wrapper'])),
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
            const ref = field.injector.get(Dialog).open(FormDialogContainer, {
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
