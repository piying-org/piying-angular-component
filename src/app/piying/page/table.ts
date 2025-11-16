import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
export const TableDefine = v.pipe(
  NFCSchema,
  setComponent('table'),
  patchInputs({
    defineList: [
      {
        head: '测试',
        body: (data: any) => {
          console.log('输入', data);

          return data.title1;
        },
      },
      // {
      //   head: 'badge',
      //   body: v.pipe(NFCSchema, setComponent('badge')),
      // },
    ],
    data: [
      {
        title1: '测试内容',
      },
      {
        title1: '测试内容2',
      },
    ],
    page: {
      size: 1,
      index: 0,
    },
  }),
);
