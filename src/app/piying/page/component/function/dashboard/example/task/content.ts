import * as v from 'valibot';
import { actions, formConfig, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import {
  TableResourceService,
  SortService,
  CheckboxService,
} from '@piying-lib/angular-daisyui/extension';
import { FormDialogService } from '@piying-lib/angular-daisyui/overlay';

import { safeDefine } from '@@piying-define';
import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
import { ListDemoNFCC } from '@@py/component/list-demo/component';

export const Task= v.pipe(
  v.pipe(
    v.tuple([
      v.pipe(
        v.tuple(
          range(4).map(() =>
            safeDefine.nfcComponent('card2', (actions) => {
              return [
                actions.inputs.patch({
                  title: safeDefine.nfcComponent('common-data', (actions) => {
                    return [
                      actions.inputs.patch({
                        content: faker.company.name().slice(0, 15),
                      }),
                    ];
                  }),
                  titleActions: safeDefine.nfcComponent('picker-ref', (actions) => {
                    return [
                      actions.inputs.patch({
                        trigger: safeDefine.nfcComponent('button', (actions) => {
                          return [
                            actions.inputs.patch({
                              content: { icon: { fontIcon: 'menu' } },
                              style: 'ghost',
                            }),
                          ];
                        }),
                        content: safeDefine.nfcComponent('menu-tree', (actions) => {
                          return [
                            actions.inputs.patch({
                              list: [{ title: 'edit' }, { title: 'delete' }],
                            }),
                            actions.attributes.patch({
                              class: 'bg-base-200 rounded-xl shadow-2xs',
                            }),
                          ];
                        }),
                      }),
                    ];
                  }),
                  body: safeDefine.nfcComponent('stat', (actions) => {
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
                                faker.number.float({ min: 0, max: 100, fractionDigits: 1 }) + '%',
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
                }),
                actions.class.component('bg-base-100 shadow-sm'),
              ];
            }),
          ),
        ),
        actions.wrappers.patch([
          { type: 'div', attributes: { class: 'grid grid-cols-4 gap-4 max-xl:grid-cols-2' } },
        ]),
      ),
      v.pipe(
        v.tuple([
          safeDefine.nfcComponent('card2', (actions) => {
            return [
              actions.inputs.patch({
                title: safeDefine.nfcComponent('common-data', (actions) => {
                  return [actions.inputs.patch({ content: 'Summary' })];
                }),
                body: v.pipe(
                  v.tuple([
                    safeDefine.nfcComponent('common-data', (actions) => {
                      return [
                        actions.inputs.patch({
                          content: { image: { src: 'example/dashboard/chart1.svg' } },
                        }),
                      ];
                    }),
                    v.pipe(
                      v.tuple([
                        v.pipe(
                          v.tuple(
                            range(2).map(() =>
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
                            { type: 'div', attributes: { class: 'stats shadow' } },
                          ]),
                        ),
                        v.pipe(
                          v.tuple(
                            range(3).map(() =>
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
                            { type: 'div', attributes: { class: 'stats shadow' } },
                          ]),
                        ),
                      ]),
                      actions.wrappers.patch([
                        { type: 'div', attributes: { class: 'grid gap-4' } },
                      ]),
                    ),
                  ]),
                  actions.wrappers.patch([
                    { type: 'div', attributes: { class: 'grid grid-cols-2 gap-8' } },
                  ]),
                ),
              }),
              actions.class.component('bg-base-100 shadow-sm'),
            ];
          }),
        ]),
      ),
      v.pipe(
        v.tuple([
          safeDefine.nfcComponent('card2', (actions) => {
            return [
              actions.inputs.patch({
                title: safeDefine.nfcComponent('common-data', (actions) => {
                  return [actions.inputs.patch({ content: 'Task' })];
                }),
                titleActions: v.pipe(
                  v.tuple([
                    safeDefine.nfcComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: 'Last Week' }),
                        actions.class.component('join-item'),
                      ];
                    }),
                    safeDefine.nfcComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: 'This Week', active: true }),
                        actions.class.component('join-item'),
                      ];
                    }),
                  ]),
                  actions.wrappers.patch([{ type: 'div', attributes: { class: 'join' } }]),
                ),
                body: v.pipe(
                  v.tuple([
                    safeDefine.nfcComponent('common-data', (actions) => {
                      return [
                        actions.inputs.patch({
                          content: { image: { src: 'example/dashboard/chart2.svg' } },
                        }),
                      ];
                    }),
                  ]),
                ),
              }),
              actions.class.component('bg-base-100 shadow-sm'),
            ];
          }),
          safeDefine.nfcComponent('card2', (actions) => {
            return [
              actions.inputs.patch({
                title: safeDefine.nfcComponent('common-data', (actions) => {
                  return [actions.inputs.patch({ content: 'Schedule' })];
                }),
                titleActions: v.pipe(
                  v.tuple([
                    safeDefine.nfcComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: 'Last Week' }),
                        actions.class.component('join-item'),
                      ];
                    }),
                    safeDefine.nfcComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: 'This Week', active: true }),
                        actions.class.component('join-item'),
                      ];
                    }),
                  ]),
                  actions.wrappers.patch([{ type: 'div', attributes: { class: 'join' } }]),
                ),
                body: v.pipe(
                  v.tuple([
                    safeDefine.nfcComponent(ListDemoNFCC, (actions) => {
                      return [
                        actions.inputs.patch({
                          data: [
                            {
                              id: '01',
                              name: 'Dio Lupa',
                              subtitle: 'Remaining Reason',
                              avatar: 'https://img.daisyui.com/images/profile/demo/1@94.webp',
                            },
                            {
                              id: '02',
                              name: 'Ellie Beilish',
                              subtitle: 'Bears of a fever',
                              avatar: 'https://img.daisyui.com/images/profile/demo/4@94.webp',
                            },
                            {
                              id: '03',
                              name: 'Sabrino Gardener',
                              subtitle: 'Cappuccino',
                              avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
                            },
                            {
                              id: '03',
                              name: 'Sabrino Gardener',
                              subtitle: 'Cappuccino',
                              avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
                            },
                            {
                              id: '03',
                              name: 'Sabrino Gardener',
                              subtitle: 'Cappuccino',
                              avatar: 'https://img.daisyui.com/images/profile/demo/3@94.webp',
                            },
                          ],
                        }),
                      ];
                    }),
                  ]),
                ),
              }),
              actions.class.component('bg-base-100 shadow-sm'),
            ];
          }),
        ]),
        actions.wrappers.patch([{ type: 'div', attributes: { class: 'grid grid-cols-2 gap-8' } }]),
      ),
    ]),
    actions.wrappers.patch([{ type: 'div', attributes: { class: 'grid  gap-4' } }]),
  ),
);

export default Task