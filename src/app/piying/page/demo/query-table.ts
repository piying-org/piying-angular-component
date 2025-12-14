import * as v from 'valibot';
import {
  bottomClass,
  formConfig,
  hideWhen,
  mergeHooks,
  NFCSchema,
  patchAsyncInputs,
  patchAsyncProps,
  patchInputs,
  patchOutputs,
  patchProps,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { computed, signal } from '@angular/core';
import { ExpandRowDirective } from '@piying/angular-daisyui/extension';
import { setDirectives } from '@piying/view-angular';
import { Subject, map, startWith } from 'rxjs';
import { da, faker } from '@faker-js/faker';
import { range } from 'es-toolkit';
import { DialogService } from '../../../service/dialog.service';
import { FormBase, FormDefine } from '../component/form';
let LevelOptions = [
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
let LevelObj = LevelOptions.reduce((obj, item) => {
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
          setWrappers(['label-wrapper']),
          patchProps({
            labelPosition: 'left',
          }),
          topClass('gap-2'),
        ),

        level: v.pipe(
          v.number(),
          v.title('level'),
          setWrappers(['label-wrapper']),
          topClass('gap-2'),
          patchProps({
            labelPosition: 'left',
          }),
          setComponent('select'),
          patchInputs({
            options: LevelOptions,
          }),
        ),
      }),
      formConfig({ updateOn: 'submit' }),
      setWrappers(['div']),
      topClass('flex gap-4'),
    ),
    submit: v.pipe(
      NFCSchema,
      setComponent('button'),
      patchInputs({
        content: 'Submit',
        color: 'primary',
      }),
      patchAsyncInputs({
        clicked: (field) => {
          return () => {
            let result = field.get(['..', 'params'])!.form.control!;
            result.emitSubmit();
          };
        },
      }),
    ),
  }),
  setWrappers(['div']),
  topClass('flex justify-between'),
);
const TableDefine = v.pipe(
  v.object({
    table: v.pipe(
      NFCSchema,
      setComponent('table'),
      setWrappers(['table-status', 'sort-table', 'table-resource', 'checkbox-table']),

      patchAsyncInputs({
        define: (field) => {
          let pageFiled = field.get(['..', 'bottom', 'page']);
          return {
            row: {
              head: [
                {
                  columns: ['checkbox', 'index', 'title', 'level', 'badge', 'actions'],
                  define: v.pipe(v.tuple([]), setComponent('tr'), topClass('bg-base-200')),
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
                  setWrappers(['td', 'table-checkbox-body']),
                ),
              },
              index: {
                head: '索引',
                body: (node: any, index: number) => {
                  let { pageQueryParams } = pageFiled?.props()!;
                  return `${index + 1 + pageQueryParams.index * pageQueryParams.size}`;
                },
              },
              title: {
                head: '标题',
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
                  setWrappers(['td']),
                  patchAsyncInputs({
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
                      patchInputs({
                        content: { icon: { fontIcon: 'edit' } },
                        shape: 'circle',
                        size: 'sm',
                      }),
                      patchAsyncInputs({
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
                      patchInputs({
                        content: { icon: { fontIcon: 'delete' } },
                        shape: 'circle',
                        size: 'sm',
                      }),
                      topClass('text-error'),
                      patchAsyncInputs({
                        clicked: (field) => {
                          return () => {
                            console.log(field.context['item$']());
                          };
                        },
                      }),
                    ),
                  }),
                  topClass('flex gap-2'),
                  setWrappers(['td']),
                ),
              },
            },
          };
        },
      }),
      patchProps({ sortList: ['title', 'level'] }),
      patchAsyncProps({
        data: (field) => {
          let init = range(100).map((item) => {
            return {
              title: faker.animal.type(),
              level: faker.number.int(2),
              badge: faker.animal.dog(),
            };
          });
          let value = signal(init);
          field
            .get(['..', '..', 'query', 'params'])!
            .form.control!.valueChanges.subscribe((searchObj) => {
              if (!searchObj) {
                value.set(init);
              } else {
                let list = init;
                if (searchObj.content) {
                  let content = (searchObj.content as string).toLowerCase();
                  list = init.filter((item) => item.title.toLowerCase().includes(content));
                } else {
                  list = init;
                }
                if (searchObj.level) {
                  list = list.filter((item) => item.level === searchObj.level);
                }
                value.set(list);
              }
            });
          return value;
        },
      }),
      patchAsyncProps({
        queryParams: (field) => {
          let { props } = field;
          let pageProps = field.get(['..', 'bottom', 'page'])?.props;
          return computed(() => {
            return {
              // page field
              page: pageProps?.()['pageQueryParams'],
              // sort-table
              direction: props()['sortQueryParams'],
            };
          });
        },
      }),
      bottomClass('mt-4 border rounded-box border-base-content/5'),
    ),
    bottom: v.pipe(
      v.object({
        add: v.pipe(
          NFCSchema,
          setComponent('button'),
          patchInputs({ content: { icon: { fontIcon: 'add' }, title: 'add' } }),
          patchAsyncInputs({
            clicked: (field) => {
              return () => {
                let dialog: DialogService = field.context['dialog'];
                dialog.openDialog({
                  title: '添加',
                  schema: FormBase,
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
          topClass('mt-4 flex justify-end'),
          patchInputs({
            value: {
              size: 10,
              index: 0,
            },
          }),
          patchAsyncInputs({
            count: (field) => {
              let tableField = field.get(['..', '..', 'table'])!;
              return computed(() => {
                return tableField.props()['count$$']();
              });
            },
          }),
        ),
      }),
      setWrappers(['div']),
      topClass('flex justify-between items-center'),
    ),
  }),
);
export const QueryTableDefine = v.pipe(
  v.object({ query: QueryCondition, table: TableDefine }),
  setWrappers(['div']),
  topClass('m-4'),
);
