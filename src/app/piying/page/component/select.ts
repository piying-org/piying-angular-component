import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { safeDefine } from '@@piying-define';
export const SelectDefine = v.object({
  native1: v.pipe(
    v.string(),
    setComponent('select'),
    actions.inputs.patch({ options: ['item0', 'item1'] }),
  ),
  custom1: v.pipe(
    v.string(),
    setComponent('picker-ref'),
    actions.inputs.patch({
      changeClose: true,
    }),
    actions.inputs.patch({
      trigger: v.pipe(
        NFCSchema,
        setComponent('button'),
        actions.inputs.patchAsync({
          content: (field) => {
            return computed(() => {
              const pickerValue = field.context['pickerValue']();
              return pickerValue ?? '[empty]';
            });
          },
        }),
      ),
      content: v.pipe(
        v.string(),
        setComponent('option-list'),
        actions.wrappers.set(['local-filter']),
        actions.props.patch({ options: ['item0', 'item1'] }),
      ),
    }),
  ),
  custom2: v.pipe(
    v.string(),
    setComponent('picker-ref'),
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
        setComponent('option-list'),
        actions.wrappers.set(['local-filter']),
        actions.props.patch({ options: ['item0', 'item1'] }),
        actions.class.bottom('bg-white rounded-box shadow'),
      ),
    }),
  ),
});
