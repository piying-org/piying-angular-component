import * as v from 'valibot';
import { actions, hideWhen, NFCSchema, setAlias } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import {
  CheckboxService,
  SortService,
  TableExpandService,
  tableInputDefine,
  TableResourceService,
} from '@piying-lib/angular-daisyui/extension';
import { computed } from '@angular/core';
import { map, startWith } from 'rxjs';
export default v.pipe(
  v.tuple([
    v.pipe(
      v.object({
        table: v.pipe(
          NFCSchema,
          actions.providers.patch([CheckboxService, TableExpandService, SortService]),
          actions.hooks.merge({
            allFieldsResolved: (field) => {
              const sort = field.injector.get(SortService);
              sort.sortList.set(['title1', 'badge1']);
              sort.setInitValue({
                badge1: 1,
              });
              sort.value$$.subscribe((value) => {
                field.injector.get(TableResourceService).setParams('sort', value);
              });
              field.injector.get(CheckboxService).init();
              field.injector.get(TableExpandService).init({ _multiple: true });
            },
          }),
          safeDefine.setComponent('table', (actions) => {
            return [
              actions.inputs.patchAsync({
            define: (field) => {
              const pageFiled = field.get(['..', 'page']);
              return tableInputDefine({
                expand: {
                  head: ' ',
                  body: v.pipe(
                    NFCSchema,
                    safeDefine.setComponent('table-expand-cell', (actions) => {
                      return [
                        actions.wrappers.set(['td']),
                      ];
                    }),
                  ),
                },
                checkbox: {
                  head: v.pipe(
                    v.boolean(),
                    safeDefine.setComponent('checkbox', (actions) => {
                      return [
                        actions.wrappers.set(['td', 'table-checkbox-all']),
                      ];
                    }),
                  ),
                  body: v.pipe(
                    v.boolean(),
                    safeDefine.setComponent('checkbox', (actions) => {
                      return [
                        actions.wrappers.set(['td', 'table-checkbox-body']),
                      ];
                    }),
                  ),
                },
                index: {
                  head: '索引',
                  body: (node: any, index: number) => {
                    const { pageQueryParams } = pageFiled!.props();
                    return `${index + 1 + pageQueryParams.index * pageQueryParams.size}`;
                  },
                },
                '0': {
                  head: '测试',
                  body: (data: any) => {
                    return data.title1;
                  },
                },
                '1': {
                  head: 'badge',
                  body: v.pipe(
                    NFCSchema,
                    safeDefine.setComponent('badge', (actions) => {
                      return [
                        actions.wrappers.set(['td']),
                        actions.inputs.patchAsync({
                          content: ({ context }) => {
                            return computed(() => context.item$().badge1);
                          },
                        }),
                      ];
                    }),
                  ),
                },
                '2': {
                  head: v.pipe(
                    NFCSchema,
                    safeDefine.setComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: '1234' }),
                        actions.wrappers.set(['td', 'sort-header']),
                        actions.props.patch({
                          key: 'title1',
                        }),
                      ];
                    }),
                  ),
                },
                '3': {
                  head: v.pipe(
                    NFCSchema,
                    safeDefine.setComponent('button', (actions) => {
                      return [
                        actions.inputs.patch({ content: '666' }),
                        actions.wrappers.set(['td', 'sort-header']),
                        actions.props.patch({
                          key: 'badge1',
                        }),
                      ];
                    }),
                  ),
                },
                extra: {
                  body: v.pipe(
                    NFCSchema,
                    safeDefine.setComponent('button', (actions) => {
                      return [
                        actions.wrappers.set(['td']),
                        hideWhen({
                          listen(fn, field) {
                            const sm = field.injector.get(TableExpandService).selectionModel$$;
                            return sm.pipe(
                              map((value) => {
                                return !value.isSelected(field.context.item$());
                              }),
                              startWith(true),
                            );
                          },
                        }),
                      ];
                    }),
                  ),
                },
              })(() => {
                return {
                  head: [{ columns: ['expand', 'checkbox', 'index', '1', '2', '3'] }],
                  body: [
                    {
                      define: v.pipe(v.tuple([]), safeDefine.setComponent('tr')),
                      columns: ['expand', 'checkbox', 'index', '1'],
                    },
                    { define: v.pipe(v.tuple([]), safeDefine.setComponent('tr')), columns: ['extra'] },
                  ],
                };
              });
            },
            data: (field) => {
              return field.injector.get(TableResourceService).list$$;
            },
          }),
        ];
      }),
        ),
        page: v.pipe(
          NFCSchema,
          safeDefine.setComponent('pagination', (actions) => {
            return [
              actions.inputs.patch({
                value: {
                  size: 2,
                  index: 0,
                },
              }),
              actions.inputs.patchAsync({
                count: (field) => {
                  return field.injector.get(TableResourceService).count$$;
                },
              }),
            ];
          }),
          actions.outputs.patchAsync({
            valueChange: (field) => {
              return (data) => {
                field.injector.get(TableResourceService).setParams('page', data);
              };
            },
          }),
        ),
      }),
      setAlias('table-page'),
      actions.wrappers.set([{ type: 'loading-wrapper' }]),
      actions.props.patchAsync({
        isLoading: (field) => field.injector.get(TableResourceService).isLoading$$,
      }),
      actions.providers.patch([TableResourceService]),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          field.injector.get(TableResourceService).setRequest(async (inputs, needUpdate) => {
            await new Promise<void>((res) => {
              setTimeout(() => {
                res();
              }, 1000);
            });
            return [
              3,
              [
                {
                  title1: '测试内容1',
                  badge1: 'data1',
                },
                {
                  title1: '测试内容2',
                  badge1: 'data2',
                },
                {
                  title1: '测试内容3',
                  badge1: 'data3',
                },
              ],
            ];
          });
        },
      }),
    ),
  ]),
  actions.wrappers.patch(['div']),
  actions.class.top('flex gap-4'),
);
