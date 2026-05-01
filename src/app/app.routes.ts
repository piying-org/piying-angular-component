import { Routes } from '@angular/router';
import { MainPage } from './piying/page/main';
import { LoginDefine } from './piying/page/component/login';
import { LoginPageDefine } from './piying/page/login';
import { inject } from '@angular/core';
import { AccountService } from './service/account.service';
import { FormDefine } from './piying/page/component/form';

import { QueryTable2Define } from './piying/page/demo/query-table2';
import { OverlayDefine } from './piying/page/component/overlay';
import { SchemaViewPage } from '@piying-lib/angular-core';
import { FieldGlobalConfig } from './piying/define';
import { PageInputDefine } from './piying/page/component/page-input';
import { IonicDevDefine } from '@@py/page/ionic/dev';
import { IonFieldGlobalConfig } from '@@py/page/ionic/define';
import { DaiMobileDev } from '@@py/page/component/mobile/mobile';
import * as v from 'valibot';
import { ExampleFormRouterConfig, ExampleRouterConfig } from './const/example.router.define';
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
const IonOptions = {
  fieldGlobalConfig: IonFieldGlobalConfig,
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
            redirectTo: 'login',
            pathMatch: 'full',
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
            path: 'form',
            component: SchemaViewPage,
            data: {
              schema: () => FormDefine,
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
      {
        path: 'example',
        children: [
          {
            path: '',
            redirectTo: 'button',
            pathMatch: 'full',
          },

          ...ExampleRouterConfig.map((item) => item.define),
          {
            path: 'form',
            children: ExampleFormRouterConfig.map((item) => item.define),
          },
        ],
      },

      {
        path: 'ionic',
        children: [
          {
            path: 'dev',
            component: SchemaViewPage,
            data: {
              schema: () => IonicDevDefine,
              options: () => IonOptions,
            },
          },
        ],
      },
      {
        path: 'mobile',
        children: [
          {
            path: 'dev',
            component: SchemaViewPage,
            data: {
              schema: () => DaiMobileDev,
              options: () => options,
            },
            children: [
              {
                path: 'tab1',
                component: SchemaViewPage,
                data: {
                  schema: () => v.string(),
                  options: () => options,
                },
              },
              {
                path: 'tab2',
                component: SchemaViewPage,
                data: {
                  schema: () => v.string(),
                  options: () => options,
                },
              },
              {
                path: 'tab3',
                component: SchemaViewPage,
                data: {
                  schema: () => v.string(),
                  options: () => options,
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
