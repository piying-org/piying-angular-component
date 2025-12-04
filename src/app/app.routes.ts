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
            },
          },
        ],
      },
    ],
  },
];
