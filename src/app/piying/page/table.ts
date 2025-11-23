import * as v from 'valibot';
import {
  hideWhen,
  mergeHooks,
  NFCSchema,
  patchAsyncInputs,
  patchAsyncProps,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';
import { computed, isSignal } from '@angular/core';
import { setDirectives } from '@piying/view-angular';
import { map, startWith, Subject } from 'rxjs';
import { ExpandRowDirective } from '@piying/angular-daisyui/extension';

export const TableDefine = v.object({
  table: v.pipe(
    NFCSchema,
    setComponent('table'),
    setWrappers(['table-status', 'sort-table', 'table-resource']),
    patchInputs({
      define: {
        row: {
          body: [
            {
              define: v.pipe(
                v.tuple([]),
                setComponent('tr'),
                setDirectives([
                  {
                    type: ExpandRowDirective,
                  },
                ]),
              ),
              columns: ['1'],
            },
            { define: v.pipe(v.tuple([]), setComponent('tr')), columns: ['extra'] },
          ],
        },
        columns: {
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
              setWrappers(['td']),
              patchAsyncInputs({
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
              patchInputs({ content: '1234' }),
              setWrappers(['td', 'sort-header']),
              patchProps({
                key: 'title1',
              }),
            ),
          },
          '3': {
            head: v.pipe(
              NFCSchema,
              setComponent('button'),
              patchInputs({ content: '666' }),
              setWrappers(['td', 'sort-header']),
              patchProps({
                key: 'badge1',
                direction: 1,
              }),
            ),
          },
          extra: {
            body: v.pipe(
              NFCSchema,
              setComponent('button'),
              setWrappers(['td']),
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
      },
    }),
    patchProps({ sortList: ['title1', 'badge1'] }),
    patchAsyncProps({
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
    patchAsyncProps({
      queryParams: (field) => {
        let { props } = field;
        let pageProps = field.get(['..', 'page'])?.props;
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
  ),
  page: v.pipe(
    NFCSchema,
    setComponent('pagination'),
    patchInputs({
      value: {
        size: 2,
        index: 0,
      },
    }),
    patchAsyncInputs({
      count: (field) => {
        let tableField = field.get(['..', 'table'])!;
        return computed(() => {
          return tableField.props()['count$$']();
        });
      },
    }),
  ),
});
