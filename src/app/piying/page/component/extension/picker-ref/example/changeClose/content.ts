import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { safeDefine } from '@@piying-define';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.date(),
      safeDefine.setComponent('picker-ref', (ac) => {
        return [
          ac.inputs.patch({
            changeClose: true,
            trigger: v.pipe(
              NFCSchema,
              setComponent('button'),
              actions.inputs.patchAsync({
                content: (field) => {
                  return computed(() => {
                    const pickerValue = field.context['pickerValue']();
                    return pickerValue ? `${pickerValue}` : 'default';
                  });
                },
              }),
            ),
            content: v.pipe(v.date(), setComponent('calendar')),
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
