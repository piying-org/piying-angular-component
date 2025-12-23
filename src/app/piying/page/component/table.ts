import * as v from 'valibot';
import { hideWhen, mergeHooks, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed, isSignal } from '@angular/core';
import { actions } from '@piying/view-angular';
import { map, startWith, Subject } from 'rxjs';
import { ExpandRowDirective } from '@piying/angular-daisyui/extension';

export const TableDefine = v.object({
  table: v.pipe(
    NFCSchema,
    setComponent('table'),
    actions.wrappers.set(['table-status', 'sort-table', 'table-resource', 'checkbox-table']),

    actions.inputs.patchAsync({
      define: (field) => {
        let pageFiled = field.get(['..', 'page']);
        return {
          row: {
            head: [{ columns: ['checkbox', 'index', '1', '2', '3'] }],
            body: [
              {
                define: v.pipe(
                  v.tuple([]),
                  setComponent('tr'),
                  actions.directives.set([
                    {
                      type: ExpandRowDirective,
                    },
                  ]),
                ),
                columns: ['checkbox', 'index', '1'],
              },
              { define: v.pipe(v.tuple([]), setComponent('tr')), columns: ['extra'] },
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
                let { pageQueryParams } = pageFiled?.props()!;
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
                    return (field.context.status.expanded as Subject<any>).pipe(
                      map((item) => {
                        return item !== field.context.item$();
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
      data: () => {
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
      },
    }),
    actions.props.mapAsync((field) => {
      let pageProps = field.get(['..', 'page'])!.props;
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
        let tableField = field.get(['..', 'table'])!;
        return computed(() => {
          return tableField.props()['count$$']();
        });
      },
    }),
  ),
});
