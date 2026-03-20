import { Routes } from '@angular/router';
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

import { QueryTable2Define } from './piying/page/demo/query-table2';
import { ArrayDefine } from './piying/page/component/array';
import { LogicDefine } from './piying/page/component/logic';
import { OverlayDefine } from './piying/page/component/overlay';
import { GroupDefine } from './piying/page/component/group';
import { SchemaViewPage } from '@piying-lib/angular-core';
import { FieldGlobalConfig } from './piying/define';
import { PageInputDefine } from './piying/page/component/page-input';
import { ButtonDefine } from './piying/page/component/button/button';
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: SchemaViewPage,
    data: {
      schema: () => LoginPageDefine,
      options: () => {
        return {
          ...options,
          context: {
            account: inject(AccountService),
          },
        };
      },
    },
  },
  {
    path: 'main',
    data: {
      schema: () => MainPage,
      options: () => options,
    },
    component: SchemaViewPage,
    children: [
      // {
      //   path: '',

      // },
      {
        path: 'component',
        children: [
          {
            path: '',
            redirectTo: 'category',
            pathMatch: 'full',
          },
          {
            path: 'table',
            component: SchemaViewPage,
            data: {
              schema: () => TableDefine,
              options: () => options,
            },
          },
          {
            path: 'category',
            component: SchemaViewPage,
            data: {
              schema: () => CategoryDefine,
              options: () => options,
            },
          },
          {
            path: 'login',
            component: SchemaViewPage,
            data: {
              schema: () => LoginDefine,
              options: () => options,
            },
          },
          {
            path: 'calendar',
            component: SchemaViewPage,
            data: {
              schema: () => CalendarDefine,
              options: () => options,
            },
          },
          {
            path: 'select',
            component: SchemaViewPage,
            data: {
              schema: () => SelectDefine,
              options: () => options,
            },
          },
          {
            path: 'tabs',
            component: SchemaViewPage,
            data: {
              schema: () => TabsDefine,
              options: () => options,
            },
          },
          {
            path: 'card',
            component: SchemaViewPage,
            data: {
              schema: () => CardDefine,
              options: () => ({
                ...options,
                context: {
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
                },
              }),
            },
          },
          {
            path: 'stat',
            component: SchemaViewPage,
            data: {
              schema: () => StatsDefine,
              options: () => {
                const data = [
                  'text-primary',
                  'text-secondary',
                  'text-accent',
                  'text-neutral',
                  'text-base-content',
                ];
                return {
                  ...options,
                  context: {
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
                  },
                };
              },
            },
          },
          {
            path: 'form',
            component: SchemaViewPage,
            data: {
              schema: () => FormDefine,
              options: () => options,
            },
          },
          {
            path: 'array',
            component: SchemaViewPage,
            data: {
              schema: () => ArrayDefine,
              options: () => options,
            },
          },
          {
            path: 'group',
            component: SchemaViewPage,
            data: {
              schema: () => GroupDefine,
              options: () => options,
            },
          },
          {
            path: 'logic',
            component: SchemaViewPage,
            data: {
              schema: () => LogicDefine,
              options: () => options,
            },
          },
          {
            path: 'overlay',
            component: SchemaViewPage,
            data: {
              schema: () => OverlayDefine,
              options: () => options,
            },
          },
          {
            path: 'page-input',
            component: SchemaViewPage,
            data: {
              schema: () => PageInputDefine,
              options: () => options,
              model: () => {
                return { l1: '12345' };
              },
            },
          },
          {
            path: 'button',
            component: SchemaViewPage,
            data: {
              schema: () => ButtonDefine,
              options: () => options,
            },
          },
        ],
      },
      {
        path: 'demo',
        children: [
          {
            path: '',
            redirectTo: 'query-table2',
            pathMatch: 'full',
          },

          {
            path: 'query-table2',
            component: SchemaViewPage,
            data: {
              schema: () => QueryTable2Define,
              options: () => options,
            },
          },
        ],
      },
    ],
  },
];
