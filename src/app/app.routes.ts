import { Routes } from '@angular/router';
import { SchemaViewRC } from './schema-view/component';
import { MainPage } from './piying/page/main';

export const routes: Routes = [
  {
    path: '',
    data: {
      schema: () => MainPage,
    },
    component: SchemaViewRC,
  },
];
