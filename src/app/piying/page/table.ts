import * as v from 'valibot';
import {
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
export const TableDefine = v.pipe(
  NFCSchema,
  setComponent('table'),
  patchInputs({
    pagination: { enable: true, sizeOptions: [1, 10, 20, 30] },
    define: {
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
