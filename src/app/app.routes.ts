import { Routes } from '@angular/router';
import { SchemaViewRC } from './schema-view/component';
import { MainPage } from './piying/page/main';
import { TableDefine } from './piying/page/component/table';
import { LoginDefine } from './piying/page/component/login';
import { LoginPageDefine } from './piying/page/login';
import { inject } from '@angular/core';
import { AccountService } from './service/account.service';
import { CategoryDefine } from './piying/page/component/category';
import { CalendarDefine } from './piying/page/component/calendar';
import { SelectDefine } from './piying/page/component/select';
import { TabsDefine } from './piying/page/component/tabs';
import { CardDefine } from './piying/page/component/card';
import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
import { StatsDefine } from './piying/page/component/stats';
import { FormDefine } from './piying/page/component/form';
import { QueryTableDefine } from './piying/page/demo/query-table';

import { DialogService } from './service/dialog.service';
import { FieldGlobalConfig } from './piying/define';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SchemaViewRC,
    data: {
      schema: () => LoginPageDefine,
      context: () => {
        return {
          account: inject(AccountService),
        };
      },
    },
  },
  {
    path: 'main',
    data: {
      schema: () => MainPage,
    },
    component: SchemaViewRC,
    children: [
      // {
      //   path: '',

      // },
      {
        path: 'component',
        children: [
          {
            path: '',
            redirectTo: 'table',
            pathMatch: 'full',
          },
          {
            path: 'table',
            component: SchemaViewRC,
            data: {
              schema: () => TableDefine,
            },
          },
          {
            path: 'category',
            component: SchemaViewRC,
            data: {
              schema: () => CategoryDefine,
            },
          },
          {
            path: 'login',
            component: SchemaViewRC,
            data: {
              schema: () => LoginDefine,
            },
          },
          {
            path: 'calendar',
            component: SchemaViewRC,
            data: {
              schema: () => CalendarDefine,
            },
          },
          {
            path: 'select',
            component: SchemaViewRC,
            data: {
              schema: () => SelectDefine,
            },
          },
          {
            path: 'tabs',
            component: SchemaViewRC,
            data: {
              schema: () => TabsDefine,
            },
          },
          {
            path: 'card',
            component: SchemaViewRC,
            data: {
              schema: () => CardDefine,
              context: () => {
                return {
                  getCardList: async () => {
                    return range(10).map((a) => {
                      return {
                        image: {
                          src: faker.image.url({ width: 400, height: 400 }),
                        },
                        title: faker.book.title(),
                        body: {
                          author: faker.book.author(),
                          format: faker.book.format(),
                          genre: faker.book.genre(),
                          publisher: faker.book.publisher(),
                          series: faker.book.series(),
                        },
                      };
                    });
                  },
                };
              },
            },
          },
          {
            path: 'stat',
            component: SchemaViewRC,
            data: {
              schema: () => StatsDefine,
              context: () => {
                const data = [
                  'text-primary',
                  'text-secondary',
                  'text-accent',
                  'text-neutral',
                  'text-base-content',
                ];
                return {
                  getStatList: async () => {
                    return range(10).map((a) => {
                      const value = faker.number.int(8);
                      return {
                        title: faker.food.fruit(),
                        value: value,
                        desc: faker.food.description().slice(0, 10),
                        valueClass: data[value % 5],
                      };
                    });
                  },
                };
              },
            },
          },
          {
            path: 'form',
            component: SchemaViewRC,
            data: {
              schema: () => FormDefine,
            },
          },
        ],
      },
      {
        path: 'demo',
        children: [
          {
            path: '',
            redirectTo: 'query-table',
            pathMatch: 'full',
          },
          {
            path: 'query-table',
            component: SchemaViewRC,
            data: {
              schema: () => QueryTableDefine,
              context: () => {
                const service = inject(DialogService);
                service.setPiyingOptions({
                  fieldGlobalConfig: FieldGlobalConfig,
                });
                return {
                  dialog: service,
                };
              },
            },
          },
        ],
      },
    ],
  },
];
