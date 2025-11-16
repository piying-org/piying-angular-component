import { Routes } from '@angular/router';
import { SchemaViewRC } from './schema-view/component';
import { MainPage } from './piying/page/main';
import { TableDefine } from './piying/page/table';

export const routes: Routes = [
  {
    path: '',
    data: {
      schema: () => MainPage,
    },
    component: SchemaViewRC,
    children: [
      {
        path: 'table',
        component: SchemaViewRC,
        data: {
          schema: () => TableDefine,
        },
      },
    ],
  },
];
