import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import {
  ConfirmService,
  FormDialogService,
  ToastService,
} from '@piying-lib/angular-daisyui/overlay';
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
      actions.inputs.patch({ content: 'dialog' }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            const service = field.injector.get(FormDialogService);
            service
              .open({
                schema: item,
                title: '测试',
                cancelButton: '返回',
                modal: true,
                applyValue: async (value) => {
                  return value;
                },
                injector: field.injector,
              })
              .then((value) => {
                console.log(value);
              });
          };
        },
      }),
    ),
    toast: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: 'toast' }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            field.injector.get(ToastService).add({ message: 'success-message', type: 'success' });
            field.injector.get(ToastService).add({ message: 'info-message', type: 'info' });
            field.injector.get(ToastService).add({ message: 'warning-message', type: 'warning' });
            field.injector
              .get(ToastService)
              .add({ message: 'error-message', type: 'error', enableCopy: true, duration: 30000 });
          };
        },
      }),
    ),
    overlay1: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: 'overlay1' }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            field.injector.get(ConfirmService).open({ title: 'title1', message: 'message1' });
          };
        },
      }),
    ),
    overlay2: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({ content: 'overlay2' }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            field.injector.get(ConfirmService).open({
              title: 'title1',
              message: 'message1',
              modal: true,
              buttons: [{ close: async () => {}, label: 'close', class: 'btn-primary' }],
            });
          };
        },
      }),
    ),
  }),
);
