import { Routes } from '@angular/router';
import { MainPage } from './piying/page/main';

import { SchemaViewPage } from '@piying-lib/angular-core';
import { FieldGlobalConfig } from './piying/define';
import { IonicDevDefine } from '@@py/page/ionic/dev';
import { IonFieldGlobalConfig } from '@@py/page/ionic/define';
import { DaiMobileDev } from '@@py/page/component/mobile/mobile';
import * as v from 'valibot';
import {
  FunctionRouterConfig,
  ExampleExtensionRouterConfig,
  ExampleFieldControlRouterConfig,
  ExampleFieldGroupRouterConfig,
  ExampleFormRouterConfig,
  ExampleNonFieldControlRouterConfig,
  OverlayRouterConfig,
} from './const/example.router.define';
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
    path: 'main',
    data: {
      schema: () => MainPage,
      options: () => options,
    },
    component: SchemaViewPage,
    children: [
      {
        path: 'example',
        children: [
          {
            path: '',
            redirectTo: 'button',
            pathMatch: 'full',
          },

          {
            path: 'field-control',
            children: ExampleFieldControlRouterConfig.map((item) => item.define),
          },
          {
            path: 'field-group',
            children: ExampleFieldGroupRouterConfig.map((item) => item.define),
          },
          {
            path: 'non-field-control',
            children: ExampleNonFieldControlRouterConfig.map((item) => item.define),
          },
          {
            path: 'extension',
            children: ExampleExtensionRouterConfig.map((item) => item.define),
          },
          {
            path: 'form',
            children: ExampleFormRouterConfig.map((item) => item.define),
          },
          {
            path: 'overlay',
            children: OverlayRouterConfig.map((item) => item.define),
          },
          {
            path: 'function',
            children: FunctionRouterConfig.map((item) => item.define),
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
