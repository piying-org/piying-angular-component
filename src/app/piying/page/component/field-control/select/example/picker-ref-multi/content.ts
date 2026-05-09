import * as v from 'valibot';
import { actions, asControl, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { computed } from '@angular/core';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.array(v.string()),
      asControl(),
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            changeClose: false,
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
                        return pickerValue?.join(',') ?? '[empty]';
                      });
                    },
                  }),
                ];
              }),
              actions.wrappers.patch([{ type: 'div', attributes: { class: 'select' } }]),
            ),
            content: v.pipe(
              v.array(v.string()),
              asControl(),
              safeDefine.setComponent('option-list', (actions) => {
                return [
                  actions.wrappers.set(['local-filter']),
                  actions.props.patchAsync({
                    options: (field) => {
                      return computed(() => {
                        return field.context['parentProps']()['options'];
                      });
                    },
                  }),
                  actions.inputs.patchAsync({
                    multiple: (field) => {
                      return computed(() => {
                        return field.context['parentProps']()['multiple'];
                      });
                    },
                  }),
                  actions.class.bottom('bg-white rounded-box shadow'),
                ];
              }),
            ),
          }),
          actions.props.patch({
            options: ['item0', 'item1'],
            multiple: true,
          }),
        ];
      }),
    ),
    v.pipe(
      v.array(v.string()),
      asControl(),
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            changeClose: false,
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
                        return pickerValue?.join(',') ?? '[empty]';
                      });
                    },
                  }),
                ];
              }),
              actions.wrappers.patch([{ type: 'div', attributes: { class: 'select' } }]),
            ),
            content: v.pipe(
              v.array(v.string()),
              asControl(),
              safeDefine.setComponent('option-list', (actions) => {
                return [
                  actions.wrappers.set(['local-filter']),
                  actions.props.patchAsync({
                    options: (field) => {
                      return computed(() => {
                        return field.context['parentProps']()['options'];
                      });
                    },
                  }),
                  actions.inputs.patchAsync({
                    multiple: (field) => {
                      return computed(() => {
                        return field.context['parentProps']()['multiple'];
                      });
                    },
                    maxListCount: (field) => {
                      return computed(() => {
                        return field.context['parentProps']()['maxListCount'];
                      });
                    },
                  }),
                  actions.class.bottom('bg-white rounded-box shadow'),
                ];
              }),
            ),
          }),
          actions.props.patch({
            options: ['item0', 'item1'],
            multiple: true,
            maxListCount: 2,
          }),
        ];
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
