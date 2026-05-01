import * as v from 'valibot';
import { actions, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
export default v.pipe(
  v.tuple([
    v.pipe(
      NFCSchema,
      safeDefine.setComponent('list-template', (actions) => {
        return [
          actions.wrappers.set(['div']),
          actions.class.top('stats shadow'),
          actions.inputs.patch({
            template: v.pipe(
              NFCSchema,
              safeDefine.setComponent('stat', (actions) => {
                return [
                  actions.inputs.patchAsync({
                    valueClass: (field) => {
                      const item = field.context['getItem']().valueClass;
                      return item;
                    },
                  }),
                  actions.inputs.patch({
                    title: v.pipe(
                      NFCSchema,
                      safeDefine.setComponent('common-data', (actions) => {
                        return [
                          actions.inputs.patchAsync({
                            content: (field) => {
                              return field.context['getItem']().title;
                            },
                          }),
                        ];
                      }),
                      actions.class.top('stat-title'),
                    ),

                    value: v.pipe(
                      NFCSchema,
                      safeDefine.setComponent('common-data', (actions) => {
                        return [
                          actions.inputs.patchAsync({
                            content: (field) => {
                              return field.context['getItem']().value;
                            },
                          }),
                        ];
                      }),

                      actions.class.top('stat-value'),
                    ),
                    desc: v.pipe(
                      NFCSchema,
                      safeDefine.setComponent('common-data', (actions) => {
                        return [
                          actions.inputs.patchAsync({
                            content: (field) => {
                              return field.context['getItem']().desc;
                            },
                          }),
                        ];
                      }),
                      actions.class.top('stat-desc'),
                    ),
                  }),
                ];
              }),
            ),
          }),
        ];
      }),
      actions.inputs.patchAsync({
        list: (field) => {
          const data = [
            'text-primary',
            'text-secondary',
            'text-accent',
            'text-neutral',
            'text-base-content',
          ];
          return range(10).map((a) => {
            const value = faker.number.int(8);
            return {
              title: faker.food.fruit(),
              value: value,
              desc: faker.food.description().slice(0, 10),
              valueClass: data[value % 5],
            };
          });
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4 flex-wrap'),
);
