import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.date(),
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            changeClose: true,
            trigger: v.pipe(
              NFCSchema,
              safeDefine.setComponent('button', (actions) => {
                return [
                  actions.inputs.patchAsync({
                    content: (field) => {
                      return computed(() => {
                        const pickerValue = field.context['pickerValue']();
                        return pickerValue ? `${pickerValue}` : 'default';
                      });
                    },
                  }),
                ];
              }),
            ),
            content: v.pipe(
              v.date(),
              safeDefine.setComponent('calendar', (actions) => {
                return [
                  actions.attributes.patch({
                    class: 'bg-base-200 rounded-xl shadow-2xs',
                  }),
                ];
              }),
            ),
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
