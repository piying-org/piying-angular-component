import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchAsyncInputs,
  patchAsyncProps,
  patchAttributes,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CardBodyDemoNFCC } from '../../component/card-body/component';

export const CardDefine = v.object({
  card1: v.pipe(
    v.object({
      figure: v.pipe(
        NFCSchema,
        setComponent('common-data'),
        patchInputs({
          content: {
            image: {
              src: faker.image.url({ width: 400, height: 400 }),
            },
          },
        }),
      ),
      title: v.pipe(
        NFCSchema,
        setComponent('common-data'),
        patchInputs({ content: faker.book.title() }),
      ),
      body: v.pipe(
        NFCSchema,
        setComponent(CardBodyDemoNFCC),
        patchInputs({
          data: {
            author: faker.book.author(),
            format: faker.book.format(),
            genre: faker.book.genre(),
            publisher: faker.book.publisher(),
            series: faker.book.series(),
          },
        }),
      ),
      actions: v.object({
        __btn: v.pipe(NFCSchema, setComponent('button'), patchInputs({ content: 'Go' })),
      }),
    }),
    setComponent('card'),
    componentClass('shadow-sm w-100'),
  ),
  cardList1: v.pipe(
    NFCSchema,
    setComponent('list-template'),
    setWrappers(['div']),
    topClass('grid grid-cols-3 gap-2'),
    patchInputs({
      template: v.pipe(
        v.object({
          figure: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            patchAsyncInputs({
              content: (field) => {
                return { image: field.context['getItem']().image };
              },
            }),
          ),
          title: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            patchAsyncInputs({
              content: (field) => {
                return field.context['getItem']().title;
              },
            }),
          ),
          body: v.pipe(
            NFCSchema,
            setComponent(CardBodyDemoNFCC),
            patchAsyncInputs({
              data: (field) => {
                return field.context['getItem']().body;
              },
            }),
          ),
          actions: v.object({
            __btn: v.pipe(NFCSchema, setComponent('button'), patchInputs({ content: 'Go' })),
          }),
        }),
        setComponent('card'),
        componentClass('shadow-sm w-full'),
      ),
    }),
    patchAsyncInputs({
      list: (field) => {
        return field.context['getCardList']();
      },
    }),
  ),
});
