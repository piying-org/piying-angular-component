import { Routes } from '@angular/router';
import { SchemaViewRC } from './schema-view/component';
import { MainPage } from './piying/page/main';
import { TableDefine } from './piying/page/component/table';
import { LoginDefine } from './piying/page/component/login';
import { LoginPageDefine } from './piying/page/login';

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
            path: 'table',
            component: SchemaViewRC,
            data: {
              schema: () => TableDefine,
            },
          },
          {
            path: 'login',
            component: SchemaViewRC,
            data: {
              schema: () => LoginDefine,
            },
          },
        ],
      },
    ],
  },
];
