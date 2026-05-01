import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { computed } from '@angular/core';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            changeClose: true,
          }),
          actions.inputs.patch({
            trigger: v.pipe(
              NFCSchema,
              safeDefine.setComponent('common-data', (actions) => {
                return [
                  actions.inputs.patchAsync({
                    content: (field) => {
                      return computed(() => {
                        const pickerValue = field.context['pickerValue']();
                        return pickerValue ?? '[empty]';
                      });
                    },
                  }),
                ];
              }),
              actions.wrappers.patch([{ type: 'div', attributes: { class: 'select' } }]),
            ),
            content: v.pipe(
              v.string(),
              safeDefine.setComponent('option-list', (actions) => {
                return [
                  actions.wrappers.set(['local-filter']),
                  actions.props.patch({ options: ['item0', 'item1'] }),
                  actions.class.bottom('bg-white rounded-box shadow'),
                ];
              }),
            ),
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
