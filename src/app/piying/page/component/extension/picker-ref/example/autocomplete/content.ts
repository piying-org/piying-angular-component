import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { filter } from 'rxjs';
import { PickerRefService } from '@piying-lib/angular-daisyui/extension';
export const TriggerButton = v.pipe(
  v.string(),
  safeDefine.setComponent('input', (actions) => {
    return [];
  }),
);
export const ContentButton = v.pipe(
  v.string(),
  safeDefine.setComponent('option-list', (actions) => {
    return [
      actions.inputs.patch({
        options: ['option-1', 'option-2', 'option-3'],
      }),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          const options = field.inputs()['options'] as string[];
          const service = field.injector.get(PickerRefService);
          const triggerField = service.triggerField$$();
          const allowCustom = true;
          triggerField.form
            .control!.valueChanges.pipe(filter((a) => typeof a === 'string'))
            .subscribe((value) => {
              field.inputs.update((data) => {
                return {
                  ...data,
                  options: !value ? options : options.filter((item) => item.includes(value)),
                };
              });
              if (allowCustom) {
                const rootField$$ = service.rootField$$();
                rootField$$.form.control!.updateValue(value);
              }
            });
        },
      }),
    ];
  }),
  actions.class.bottom('bg-white rounded-box shadow'),
);

export default v.pipe(
  v.tuple([
    v.pipe(
      v.string(),
      safeDefine.setComponent('picker-ref', (actions) => {
        return [
          actions.inputs.patch({
            trigger: TriggerButton,
            content: ContentButton,
            overlayConfig: { positionStrategy: undefined },
          }),
        ];
      }),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          field.form.control!.valueChanges.subscribe((item) => {
            console.log('值变更', item);
          });
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
