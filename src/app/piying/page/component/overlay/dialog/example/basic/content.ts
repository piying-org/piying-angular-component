import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { FormDialogService } from '@piying-lib/angular-daisyui/overlay';

const item = v.object({
  l1: v.pipe(v.string(), actions.wrappers.patch(['validate-tooltip-wrapper'])),
  l2: v.number(),
});

export default v.pipe(
  v.tuple([
    v.pipe(
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
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
