import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CardBodyDemoNFCC } from '../../component/card-body/component';
import { filter } from 'rxjs';

export const CardDefine = v.object({
  card1: v.pipe(
    v.object({
      figure: v.pipe(
        NFCSchema,
        setComponent('common-data'),
        actions.inputs.patch({
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
        actions.inputs.patch({ content: faker.book.title() }),
      ),
      body: v.pipe(
        NFCSchema,
        setComponent(CardBodyDemoNFCC),
        actions.inputs.patch({
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
        __btn: v.pipe(NFCSchema, setComponent('button'), actions.inputs.patch({ content: 'Go' })),
      }),
    }),
    setComponent('card'),
    actions.class.component('shadow-sm w-100'),
  ),

  cardList2: v.pipe(
    v.object({
      search: v.object({
        title: v.pipe(v.string(), actions.attributes.patch({ placeholder: 'search Title' })),
      }),
      list: v.pipe(
        NFCSchema,
        setComponent('list-template'),
        actions.wrappers.set(['div']),
        actions.class.top('grid grid-cols-3 gap-2'),
        actions.inputs.patch({
          template: v.pipe(
            v.object({
              figure: v.pipe(
                NFCSchema,
                setComponent('common-data'),
                actions.inputs.patchAsync({
                  content: (field) => {
                    return { image: field.context['getItem']().image };
                  },
                }),
              ),
              title: v.pipe(
                NFCSchema,
                setComponent('common-data'),
                actions.inputs.patchAsync({
                  content: (field) => {
                    return field.context['getItem']().title;
                  },
                }),
              ),
              body: v.pipe(
                NFCSchema,
                setComponent(CardBodyDemoNFCC),
                actions.inputs.patchAsync({
                  data: (field) => {
                    return field.context['getItem']().body;
                  },
                }),
              ),
              actions: v.object({
                __btn: v.pipe(
                  NFCSchema,
                  setComponent('button'),
                  actions.inputs.patch({ content: 'Go' }),
                ),
              }),
            }),
            setComponent('card'),
            actions.class.component('shadow-sm w-full'),
          ),
        }),
        actions.inputs.patchAsync({
          list: (field) => {
            const list = signal<any[]>([]);
            const result = field.context['getCardList']();
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
