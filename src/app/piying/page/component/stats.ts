import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
export const StatsDefine = v.object({
  stats1: v.pipe(
    v.object({
      item1: v.pipe(
        v.object({
          title: v.pipe(
            NFCSchema,
            actions.wrappers.set(['div']),
            setComponent('common-data'),
            actions.inputs.patch({ content: 'Angular' }),
            actions.class.top('stat-title'),
          ),
          value: v.pipe(
            NFCSchema,
            actions.wrappers.set(['div']),
            setComponent('common-data'),
            actions.inputs.patch({ content: '20' }),
            actions.class.top('stat-value'),
          ),
          desc: v.pipe(
            NFCSchema,
            actions.wrappers.set(['div']),
            setComponent('common-data'),
            actions.inputs.patch({ content: 'Version' }),
            actions.class.top('stat-desc'),
          ),
        }),
        actions.wrappers.set(['div']),
        actions.class.top('stat'),
      ),
    }),
    actions.wrappers.set(['div']),
    actions.class.top('stats shadow'),
  ),
  stats2: v.pipe(
    NFCSchema,
    setComponent('list-template'),
    actions.wrappers.set(['div']),
    actions.class.top('stats shadow'),
    actions.inputs.patch({
      template: v.pipe(
        NFCSchema,
        setComponent('stat'),
        actions.inputs.patchAsync({
          valueClass: (field) => {
            const item = field.context['getItem']().valueClass;
            return item;
          },
        }),
        actions.inputs.patch({
          title: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            actions.inputs.patchAsync({
              content: (field) => {
                return field.context['getItem']().title;
              },
            }),
            actions.class.top('stat-title'),
          ),

          value: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            actions.inputs.patchAsync({
              content: (field) => {
                return field.context['getItem']().value;
              },
            }),

            actions.class.top('stat-value'),
          ),
          desc: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            actions.inputs.patchAsync({
              content: (field) => {
                return field.context['getItem']().desc;
              },
            }),
            actions.class.top('stat-desc'),
          ),
        }),
      ),
    }),
    actions.inputs.patchAsync({
      list: (field) => {
        return field.context['getStatList']();
      },
    }),
  ),
});
