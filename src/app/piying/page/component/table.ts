import * as v from 'valibot';
import { hideWhen, NFCSchema, setAlias, setComponent } from '@piying/view-angular-core';
import { computed, untracked } from '@angular/core';
import { actions } from '@piying/view-angular';
import { map, Observable, startWith } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { CheckboxService, TableExpandService } from '@piying-lib/angular-daisyui/extension';

export const TableDefine = v.pipe(
  v.object({
    table: v.pipe(
      NFCSchema,
      actions.providers.patch([CheckboxService, TableExpandService]),
      actions.hooks.merge({
        allFieldsResolved: (field) => {
          field.injector.get(CheckboxService).init();
        },
      }),
      setComponent('table'),
      actions.wrappers.set(['sort-table', 'table-resource']),
      actions.props.patch({ expandSelectModel: { _multiple: true } }),
      actions.inputs.patchAsync({
        define: (field) => {
          const pageFiled = field.get(['..', 'page']);
          return {
            row: {
              head: [{ columns: ['expand', 'checkbox', 'index', '1', '2', '3'] }],
              body: [
                {
                  define: v.pipe(v.tuple([]), setComponent('tr')),
                  columns: ['expand', 'checkbox', 'index', '1'],
                },
                { define: v.pipe(v.tuple([]), setComponent('tr')), columns: ['extra'] },
              ],
            },
            columns: {
              expand: {
                head: ' ',
                body: v.pipe(
                  NFCSchema,
                  setComponent('table-expand-cell'),
                  actions.wrappers.set(['td']),
                ),
              },
              checkbox: {
                head: v.pipe(
                  v.boolean(),
                  setComponent('checkbox'),
                  actions.wrappers.set(['td', 'table-checkbox-all']),
                ),
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
                  setComponent('badge'),
                  actions.wrappers.set(['td']),
                  actions.inputs.patchAsync({
                    content: ({ context }) => {
                      return computed(() => context.item$().badge1);
                    },
                  }),
                ),
              },
              '2': {
                head: v.pipe(
                  NFCSchema,
                  setComponent('button'),
                  actions.inputs.patch({ content: '1234' }),
                  actions.wrappers.set(['td', 'sort-header']),
                  actions.props.patch({
                    key: 'title1',
                  }),
                ),
              },
              '3': {
                head: v.pipe(
                  NFCSchema,
                  setComponent('button'),
                  actions.inputs.patch({ content: '666' }),
                  actions.wrappers.set(['td', 'sort-header']),
                  actions.props.patch({
                    key: 'badge1',
                    direction: 1,
                  }),
                ),
              },
              extra: {
                body: v.pipe(
                  NFCSchema,
                  setComponent('button'),
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
                ),
              },
            },
          };
        },
      }),
      actions.props.patch({ sortList: ['title1', 'badge1'] }),
      actions.props.patchAsync({
        data: (field) => {
          const defineField = field.get(['@table-page'])!;
          const props = defineField.props;
          return async () => {
            untracked(() => {
              props.update(({ value }) => {
                return { ...value, isLoading: true };
              });
            });

            await new Promise<void>((res) => {
              setTimeout(() => {
                res();
              }, 3000);
            });
            untracked(() => {
              props.update(({ value }) => {
                return { ...value, isLoading: false };
              });
            });
            return [
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
            ];
          };
        },
      }),
      actions.props.mapAsync((field) => {
        const pageProps = field.get(['..', 'page'])!.props;
        return (value) => {
          return {
            ...value,
            queryParams: {
              // page field
              page: pageProps?.()['pageQueryParams'],
              // sort-table
              direction: value['sortQueryParams'],
            },
          };
        };
      }),
    ),
    page: v.pipe(
      NFCSchema,
      setComponent('pagination'),
      actions.inputs.patch({
        value: {
          size: 2,
          index: 0,
        },
      }),
      actions.inputs.patchAsync({
        count: (field) => {
          const tableField = field.get(['..', 'table'])!;
          return computed(() => {
            return tableField.props()['count$$']();
          });
        },
      }),
    ),
  }),
  setAlias('table-page'),
  actions.wrappers.set([{ type: 'loading-wrapper' }]),
);
