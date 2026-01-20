import * as v from 'valibot';
import { formConfig, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed, signal } from '@angular/core';
import { actions } from '@piying/view-angular';
import { faker } from '@faker-js/faker';
import { range } from 'es-toolkit';
import { DialogService } from '../../../service/dialog.service';
import { FormBase } from '../component/form';
import { TableStatusService } from '@piying-lib/angular-daisyui/extension';
const LevelOptions = [
  {
    label: 'all',
    value: 0,
  },
  {
    label: 'low',
    value: 1,
  },
  { label: 'hight', value: 2 },
];
const LevelObj = LevelOptions.reduce((obj, item) => {
  obj[item.value] = item.label;
  return obj;
}, {} as any);
const QueryCondition = v.pipe(
  v.object({
    params: v.pipe(
      v.object({
        content: v.pipe(
          v.string(),
          v.title('searchTitle'),
          actions.wrappers.set(['label-wrapper']),
          actions.props.patch({
            labelPosition: 'left',
          }),
          actions.class.top('gap-2'),
        ),

        level: v.pipe(
          v.number(),
          v.title('level'),
          actions.wrappers.set(['label-wrapper']),
          actions.class.top('gap-2'),
          actions.props.patch({
            labelPosition: 'left',
          }),
          setComponent('select'),
          actions.inputs.patch({
            options: LevelOptions,
          }),
        ),
      }),
      formConfig({ updateOn: 'submit' }),
      actions.wrappers.set(['div']),
      actions.class.top('flex gap-4'),
    ),
    submit: v.pipe(
      NFCSchema,
      setComponent('button'),
      actions.inputs.patch({
        content: 'Submit',
        color: 'primary',
      }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            const result = field.get(['..', 'params'])!.form.control!;
            result.emitSubmit();
          };
        },
      }),
    ),
  }),
  actions.wrappers.set(['div']),
  actions.class.top('flex justify-between'),
);
const TableDefine = v.pipe(
  v.object({
    table: v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.providers.patch([TableStatusService]),
      actions.wrappers.set(['sort-table', 'table-resource', 'checkbox-table']),
      actions.inputs.patchAsync({
        define: (field) => {
          const pageFiled = field.get(['..', 'bottom', 'page']);
          return {
            row: {
              head: [
                {
                  columns: ['checkbox', 'index', 'title', 'level', 'badge', 'actions'],
                  define: v.pipe(v.tuple([]), setComponent('tr'), actions.class.top('bg-base-200')),
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
                  const { pageQueryParams } = pageFiled!.props();
                  return `${index + 1 + pageQueryParams.index * pageQueryParams.size}`;
                },
              },
              title: {
                head: v.pipe(
                  NFCSchema,
                  setComponent('common-data'),
                  actions.inputs.patch({ content: '标题' }),
                  actions.wrappers.set(['td', 'sort-header']),
                  actions.props.patch({
                    key: 'title',
                    direction: -1,
                  }),
                ),

                // '标题',
                body: (data: any) => {
                  return data.title;
                },
              },
              level: {
                head: '等级',
                body: (data: any) => {
                  return LevelObj[data.level];
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
                head: '操作',
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
      }),
      actions.props.patch({ sortList: ['title', 'level'] }),
      actions.props.patchAsync({
        data: (field) => {
          const init = range(100).map((item) => {
            return {
              title: faker.animal.type(),
              level: faker.number.int(2),
              badge: faker.animal.dog(),
            };
          });
          const value = signal(init);

          return async () => {
            return value();
          };
        },
        localSearchOptions: (field) => {
          return {
            filterFn: (item: any, queryParams?: Record<string, any>) => {
              if (!queryParams) {
                return true;
              }
              let result = true;
              if (queryParams['content']) {
                result = item.title.toLowerCase().includes(queryParams['content']);
                if (!result) {
                  return result;
                }
              }
              if (queryParams['level']) {
                result = item.level >= queryParams['level'];
                if (!result) {
                  return result;
                }
              }
              return result;
            },
          };
        },
        filterParams: (field) => {
          return field.get(['..', '..', 'query', 'params'])!.form.control!.valueChanges;
        },
      }),
      actions.props.mapAsync((field) => {
        const pageProps = field.get(['..', 'bottom', 'page'])?.props;
        return (value) => {
          return {
            ...value,
            queryParams: {
              // page field
              page: pageProps?.()['pageQueryParams'],
              // sort-table
              direction: value['sortQueryParams'],
              filter: value['filterParams'],
            },
          };
        };
      }),
      actions.class.bottom('mt-4 border rounded-box border-base-content/5'),
    ),
    bottom: v.pipe(
      v.object({
        add: v.pipe(
          NFCSchema,
          setComponent('button'),
          actions.inputs.patch({ content: { icon: { fontIcon: 'add' }, title: 'add' } }),
          actions.inputs.patchAsync({
            clicked: (field) => {
              return () => {
                const dialog: DialogService = field.context['dialog'];
                dialog.openDialog({
                  title: '添加',
                  schema: v.pipe(
                    FormBase,
                    actions.wrappers.set(['div']),
                    actions.class.top('grid gap-2'),
                  ),
                  applyValue: (value) => {
                    // 更新或添加
                  },
                });
              };
            },
          }),
        ),
        page: v.pipe(
          NFCSchema,
          setComponent('pagination'),
          actions.class.top('mt-4 flex justify-end'),
          actions.inputs.patch({
            value: {
              size: 10,
              index: 0,
            },
          }),
          actions.inputs.patchAsync({
            count: (field) => {
              const tableField = field.get(['..', '..', 'table'])!;
              return computed(() => {
                return tableField.props()['count$$']();
              });
            },
          }),
        ),
      }),
      actions.wrappers.set(['div']),
      actions.class.top('flex justify-between items-center'),
    ),
  }),
);
export const QueryTableDefine = v.pipe(
  v.object({ query: QueryCondition, table: TableDefine }),
  actions.wrappers.set(['div']),
  actions.class.top('m-4'),
);
