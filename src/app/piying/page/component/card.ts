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
import { computed, signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CardBodyDemoNFCC } from '../../component/card-body/component';
import { filter } from 'rxjs';

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

  cardList2: v.pipe(
    v.object({
      search: v.object({
        title: v.pipe(v.string(), patchAttributes({ placeholder: 'search Title' })),
      }),
      list: v.pipe(
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
            let list = signal<any[]>([]);
            let result = field.context['getCardList']();
            result.then((value: any) => {
              list.set(value);
            });
            field
              .get(['..', 'search'])
              ?.form.control?.valueChanges.pipe(filter(Boolean))
              .subscribe((searchObj) => {
                result.then((value: any[]) => {
                  if (searchObj.title) {
                    list.set(
                      value.filter((item) => {
                        return (item.title as string).toLowerCase().includes(searchObj.title);
                      }),
                    );
                  }
                });
              });

            return list;
          },
        }),
      ),
    }),
  ),
});
