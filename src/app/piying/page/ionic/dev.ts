import * as v from 'valibot';
import { actions } from '@piying/view-angular';
import { safeDefine } from './define';
import { NFCSchema, valueChange } from '@piying/view-angular-core';
import { addIcons } from 'ionicons';
import { chatbubbleOutline } from 'ionicons/icons';
import { ConfirmService, FormDialogService, ToastService } from '@piying-lib/angular-ionic/overlay';

function valueChangeLog<T>() {
  return valueChange<T>((fn) => {
    fn({ list: [undefined] }).subscribe(({ list: [value], field }) => {
      console.log(field.key, value);
    });
  });
}
export const IonicDevDefine = v.pipe(
  v.object({
    string: v.pipe(
      v.string(),
      safeDefine.setComponent('string', (actions) => {
        return [actions.inputs.patch({ label: 'label1' })];
      }),
      v.title('string'),
      valueChangeLog(),
    ),
    number: v.pipe(
      v.number(),
      safeDefine.setComponent('number', (actions) => {
        return [actions.inputs.patch({ label: 'num1' })];
      }),
      v.title('string'),
      valueChangeLog(),
    ),
    password: v.pipe(
      v.string(),
      safeDefine.setComponent('password', (actions) => {
        return [actions.inputs.patch({ label: 'pwd' })];
      }),
      v.title('password'),
      valueChangeLog(),
    ),
    radioGroup: v.pipe(
      v.string(),
      safeDefine.setComponent('radioGroup', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
      v.title('radioGroup'),
      valueChangeLog(),
    ),
    boolean: v.pipe(v.boolean(), valueChangeLog(), v.title('boolean')),
    date: v.pipe(v.date(), valueChangeLog(), v.title('date')),
    select: v.pipe(
      v.string(),
      safeDefine.setComponent('select', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
      valueChangeLog(),
      v.title('select'),
    ),
    toggle: v.pipe(
      v.boolean(),
      safeDefine.setComponent('toggle', (actions) => {
        return [];
      }),
      valueChangeLog(),
      v.title('toggle'),
    ),
    textarea: v.pipe(
      v.string(),
      safeDefine.setComponent('textarea', (actions) => {
        return [];
      }),
      valueChangeLog(),
      v.title('textarea'),
    ),
    _btn: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: 'loading',
            start: { icon: { name: 'chatbubble-outline' } },
            clicked: () => {
              return new Promise(() => {});
            },
          }),
        ];
      }),
    ),
    _btn2: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            icon: { name: 'chatbubble-outline' },
            clicked: () => {
              return new Promise(() => {});
            },
          }),
        ];
      }),
    ),
    grid: v.pipe(
      v.object({
        str1: v.pipe(v.string(), actions.wrappers.patch(['col']), v.title('str1')),
        str2: v.pipe(v.string(), actions.wrappers.patch(['col']), v.title('str2')),
        str3: v.pipe(v.string(), actions.wrappers.patch(['col']), v.title('str3')),
      }),
      actions.wrappers.patch(['grid', 'row']),
    ),
    __open_confirm: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: '打开弹窗',
          }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return async () => {
                const ref = await field.injector.get(ConfirmService).open({
                  message: 'message',
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Alert canceled');
                      },
                    },
                    {
                      text: 'OK',
                      role: 'confirm',
                      handler: () => {
                        console.log('Alert confirmed');
                        return { value: 1 };
                      },
                    },
                  ],
                });
                console.log(ref);
              };
            },
          }),
        ];
      }),
    ),
    __open_formDialog: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: '打开modal',
          }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return async () => {
                const ref = await field.injector.get(FormDialogService).open({
                  schema: v.pipe(v.string(), v.title('l1')),
                  value: undefined,
                  async applyValue(value) {
                    return value;
                  },
                  injector: field.injector,
                  title: 'modal',
                });
                console.log(ref);
              };
            },
          }),
        ];
      }),
    ),
    __open_toast: v.pipe(
      NFCSchema,
      safeDefine.setComponent('button', (actions) => {
        return [
          actions.inputs.patch({
            content: '打开 toast',
          }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              let index = 1;
              return async () => {
                const ref = await field.injector.get(ToastService).add({
                  message: `message-${index++}`,
                  position: 'top',
                });
              };
            },
          }),
        ];
      }),
    ),
    list: v.pipe(
      v.object({
        s1: v.pipe(v.string(), v.title('s1'), actions.wrappers.patch(['item'])),
        n1: v.pipe(v.number(), v.title('n1'), actions.wrappers.patch(['item'])),
        list2: v.pipe(
          v.object({
            s2: v.pipe(v.string(), v.title('s2'), actions.wrappers.patch(['item'])),
            n2: v.pipe(v.number(), v.title('n2'), actions.wrappers.patch(['item'])),
          }),
          v.title('list2标题'),
          safeDefine.setComponent('list', (actions) => {
            return [
              actions.inputs.patch({
                inset: true,
                headerProperty: { color: 'dark' },
                lines: 'full',
              }),
            ];
          }),
        ),
      }),
      v.title('list标题'),
      safeDefine.setComponent('list', (actions) => {
        return [actions.inputs.patch({ headerProperty: { color: 'danger' }, lines: 'full' })];
      }),
    ),
    card: v.pipe(
      v.object({
        s1: v.pipe(v.string(), v.title('s1')),
        n1: v.pipe(v.number(), v.title('n1')),
        list2: v.pipe(
          v.object({
            s2: v.pipe(v.string(), v.title('s2')),
            n2: v.pipe(v.number(), v.title('n2')),
          }),
          v.title('list2标题'),
          safeDefine.setComponent('card', (actions) => {
            return [
              actions.inputs.patch({
                color: 'secondary',
              }),
            ];
          }),
        ),
      }),
      v.title('list标题'),
      safeDefine.setComponent('card', (actions) => {
        return [
          actions.inputs.patch({
            color: 'primary',
          }),
        ];
      }),
    ),
  }),
  actions.wrappers.patch(['div']),
  actions.class.top('ionic-page'),
  // actions.providers.patch([]),
  actions.hooks.merge({
    allFieldsResolved: (field) => {
      addIcons({ chatbubbleOutline });
      field.injector
        .get(FormDialogService)
        .setDefaultOption({ submitButton: '提交', cancelButton: '取消' });
    },
  }),
);
