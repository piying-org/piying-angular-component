import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { ToastService } from '@piying-lib/angular-daisyui/overlay';

export default v.pipe(
  v.tuple([
    v.pipe(
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
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
