import * as v from 'valibot';
import {
  hideWhen,
  mergeHooks,
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { setDirectives } from '@piying/view-angular';
import { ClickDirective } from '@piying/angular-daisyui/directive';
import { map, startWith, Subject } from 'rxjs';

export const TableDefine = v.pipe(
  NFCSchema,
  setComponent('table'),
  setWrappers(['table-status']),
  patchInputs({
    pagination: { enable: true, sizeOptions: [1, 10, 20, 30] },
    define: {
      row: {
        body: [
          {
            define: v.pipe(
              v.tuple([]),
              setComponent('tr'),
              setDirectives([
                {
                  type: ClickDirective,
                  outputs: {
                    clicked: (event: any, field) => {
                      field.context.status.toggleExpand(field.context.item$());
                    },
                  },
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
            setWrappers(['td', 'sort']),
          ),
        },
        '3': {
          head: v.pipe(
            NFCSchema,
            setComponent('button'),
            patchInputs({ content: '666' }),
            setWrappers(['td', 'sort']),
            patchProps({
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
            mergeHooks({
              allFieldsResolved(field) {
                field.context!['status'];
              },
            }),
          ),
        },
      },
    },

    data: [
      {
        title1: '测试内容',
        badge1: 'data1',
      },
      {
        title1: '测试内容2',
        badge1: 'data2',
      },
    ],
    page: {
      size: 1,
      index: 0,
    },
  }),
);
