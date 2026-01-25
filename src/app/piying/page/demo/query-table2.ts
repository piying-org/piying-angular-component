import * as v from 'valibot';
import { formConfig, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed, signal } from '@angular/core';
import { actions } from '@piying/view-angular';
import { faker, fi } from '@faker-js/faker';
import { range } from 'es-toolkit';
import { DialogService } from '../../../service/dialog.service';
import { FormBase } from '../component/form';
import {
  CheckboxService,
  SortService,
  TableResourceService,
} from '@piying-lib/angular-daisyui/extension';
import { DemoTableResourceService } from './mock.service';
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
      setComponent('input-button'),
      actions.inputs.patch({
        type: 'submit',
        color: 'primary',
      }),
      actions.inputs.patchAsync({
        clicked: (field) => {
          return () => {
            const result = field.get(['..', 'params'])!.form.control!;
            result.emitSubmit();
            field.injector.get(TableResourceService).setParams('query', result.value);
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
        data: (field) => {
          return field.injector.get(TableResourceService).list$$;
        },
      }),

      actions.class.bottom('mt-4 border rounded-box border-base-content/5'),
      actions.providers.patch([SortService, CheckboxService]),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          let sort = field.injector.get(SortService);
          sort.sortList.set(['title']);
          sort.setInitValue({
            title: -1,
          });
          sort.value$$.subscribe((value) => {
            field.injector.get(TableResourceService).setParams('sort', value);
          });
          field.injector.get(CheckboxService).init();
        },
      }),
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
              return field.injector.get(TableResourceService).count$$;
            },
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
      actions.wrappers.set(['div']),
      actions.class.top('flex justify-between items-center'),
    ),
  }),
);
export const QueryTable2Define = v.pipe(
  v.object({ query: QueryCondition, table: TableDefine }),
  actions.wrappers.set(['div']),
  actions.class.top('m-4'),
  actions.providers.patch([TableResourceService]),
  actions.hooks.merge({
    allFieldsResolved: (field) => {
      let demoRequest = field.injector.get(DemoTableResourceService);
      field.injector.get(TableResourceService).setRequest(demoRequest.requestFn);
    },
  }),
);
