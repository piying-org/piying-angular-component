import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchAsyncInputs,
  patchAttributes,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
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
          author: faker.book.author(),
          format: faker.book.format(),
          genre: faker.book.genre(),
          publisher: faker.book.publisher(),
          series: faker.book.series(),
        }),
      ),
      actions: v.object({
        __btn: v.pipe(NFCSchema, setComponent('button'), patchInputs({ content: 'Go' })),
      }),
    }),
    setComponent('card'),
    componentClass('shadow-sm w-100'),
  ),
});
