import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import {
  TableResourceService,
  SortService,
  CheckboxService,
} from '@piying-lib/angular-daisyui/extension';

import { safeDefine } from '@@piying-define';
import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';

export const Budget = v.pipe(
  v.pipe(
    v.tuple([
      v.pipe(
        v.tuple([
          safeDefine.nfcComponent('card2', (actions) => {
            return [
              actions.inputs.patch({
                title: safeDefine.nfcComponent('common-data', (actions) => {
                  return [actions.inputs.patch({ content: 'Chart' })];
                }),
                body: safeDefine.nfcComponent('common-data', (actions) => {
                  return [
                    actions.inputs.patch({
                      content: {
                        image: { src: 'example/dashboard/chart3.svg', class: 'col-span-2' },
                      },
                    }),
                  ];
                }),
              }),
              actions.class.component('bg-base-100 shadow-sm col-span-3'),
            ];
          }),
          safeDefine.nfcComponent('card2', (actions) => {
            return [
              actions.inputs.patch({
                title: safeDefine.nfcComponent('common-data', (actions) => {
                  return [actions.inputs.patch({ content: 'Chart' })];
                }),
                body: v.pipe(
                  v.tuple(
                    range(5).map(() =>
                      safeDefine.nfcComponent('stat', (actions) => {
                        return [
                          actions.inputs.patch({
                            title: safeDefine.nfcComponent('common-data', (actions) => {
                              return [
                                actions.inputs.patch({
                                  content: faker.word.adjective(),
                                }),
                              ];
                            }),
                            titleClass: 'text-xl font-bold',
                            value: safeDefine.nfcComponent('common-data', (actions) => {
                              return [
                                actions.inputs.patch({
                                  content:
                                    faker.number.float({
                                      min: 0,
                                      max: 100,
                                      fractionDigits: 1,
                                    }) + '%',
                                }),
                              ];
                            }),
                            valueClass: 'text-4xl font-bold text-primary',
                            desc: safeDefine.nfcComponent('common-data', (actions) => {
                              return [
                                actions.inputs.patch({
                                  content: faker.company.catchPhrase().slice(0, 25),
                                }),
                              ];
                            }),
                            descClass: 'text-success',
                            figure: safeDefine.nfcComponent('common-data', (actions) => {
                              return [
                                actions.inputs.patch({
                                  content: {
                                    icon: {
                                      fontIcon: faker.helpers.arrayElement([
                                        'stars',
                                        'heart_broken',
                                        'shield',
                                        'check',
                                      ]),
                                    },
                                  },
                                }),
                              ];
                            }),
                            figureClass: 'text-warning',
                          }),
                        ];
                      }),
                    ),
                  ),
                  actions.wrappers.patch([
                    { type: 'div', attributes: { class: 'stats stats-vertical' } },
                  ]),
                ),
              }),
              actions.class.component('bg-base-100 shadow-sm'),
            ];
          }),
        ]),
        actions.wrappers.patch([{ type: 'div', attributes: { class: 'grid grid-cols-4 gap-8' } }]),
      ),
      v.pipe(
        v.tuple([
          v.pipe(
            NFCSchema,
            setComponent('table'),
            actions.inputs.patchAsync({
              define: (field) => {
                return {
                  row: {
                    head: [
                      {
                        columns: ['checkbox', 'index', 'title', 'level', 'badge', 'actions'],
                        define: v.pipe(
                          v.tuple([]),
                          setComponent('tr'),
                          actions.class.top('bg-base-200'),
                        ),
                      },
                    ],
                    body: [
                      {
                        define: v.pipe(v.tuple([]), setComponent('tr')),
                        columns: ['checkbox', 'index', 'title', 'level', 'badge', 'actions'],
                      },
                    ],
                  },
                  columns: {
                    checkbox: {
                      head: ' ',
                      body: v.pipe(
                        v.boolean(),
                        setComponent('checkbox'),
                        actions.wrappers.set(['td', 'table-checkbox-body']),
                      ),
                    },
                    index: {
                      head: '索引',
                      body: (node: any, index: number) => {
                        return `${index + 1}`;
                      },
                    },
                    title: {
                      head: v.pipe(
                        NFCSchema,
                        setComponent('common-data'),
                        actions.inputs.patch({ content: 'title' }),
                        actions.wrappers.set(['td', 'sort-header']),
                        actions.props.patch({
                          key: 'title',
                        }),
                      ),

                      // '标题',
                      body: (data: any) => {
                        return data.title;
                      },
                    },
                    level: {
                      head: 'level',
                      body: (data: any) => {
                        return data.level;
                      },
                    },
                    badge: {
                      head: 'badge',
                      body: v.pipe(
                        NFCSchema,
                        setComponent('badge'),
                        actions.wrappers.set(['td']),
                        actions.inputs.patchAsync({
                          content: ({ context }) => {
                            return computed(() => context.item$().badge);
                          },
                        }),
                      ),
                    },
                    actions: {
                      head: 'actions',
                      body: v.pipe(
                        v.object({
                          edit: v.pipe(
                            NFCSchema,
                            setComponent('button'),
                            actions.inputs.patch({
                              content: { icon: { fontIcon: 'edit' } },
                              shape: 'circle',
                              size: 'sm',
                            }),
                            actions.inputs.patchAsync({
                              clicked: (field) => {
                                return () => {
                                  console.log(field.context['item$']());
                                };
                              },
                            }),
                          ),
                          delete: v.pipe(
                            NFCSchema,
                            setComponent('button'),
                            actions.inputs.patch({
                              content: { icon: { fontIcon: 'delete' } },
                              shape: 'circle',
                              size: 'sm',
                            }),
                            actions.class.top('text-error'),
                            actions.inputs.patchAsync({
                              clicked: (field) => {
                                return () => {
                                  console.log(field.context['item$']());
                                };
                              },
                            }),
                          ),
                        }),
                        actions.class.top('flex gap-2'),
                        actions.wrappers.set(['td']),
                      ),
                    },
                  },
                };
              },
              data: (field) => {
                return field.injector.get(TableResourceService).list$$;
              },
            }),

            actions.class.bottom('mt-4 border rounded-box border-base-content/5 shadow'),
            actions.providers.patch([SortService, CheckboxService, TableResourceService]),
            actions.hooks.merge({
              allFieldsResolved: (field) => {
                const sort = field.injector.get(SortService);
                sort.sortList.set(['title']);
                sort.setInitValue({
                  title: -1,
                });
                sort.value$$.subscribe((value) => {
                  field.injector.get(TableResourceService).setParams('sort', value);
                });
                field.injector.get(CheckboxService).init();
                field.injector.get(TableResourceService).setRequest((input) => {
                  return [
                    10,
                    range(10).map(() => {
                      return {
                        title: faker.word.words(3),
                        badge: faker.helpers.arrayElement(['success', 'warning', 'error', 'info']),
                        level: faker.number.int({ min: 0, max: 4 }),
                      };
                    }),
                  ];
                });
              },
            }),
          ),
        ]),
      ),
    ]),
    actions.wrappers.patch([{ type: 'div', attributes: { class: 'grid  gap-4' } }]),
  ),
);

export default Budget;
