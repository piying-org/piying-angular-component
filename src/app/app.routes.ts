import { Routes } from '@angular/router';
import { MainPage } from './piying/page/main';
import { TableDefine } from './piying/page/component/table';
import { LoginDefine } from './piying/page/component/login';
import { LoginPageDefine } from './piying/page/login';
import { inject } from '@angular/core';
import { AccountService } from './service/account.service';
import { CategoryDefine } from './piying/page/component/category';
import { CardDefine } from './piying/page/component/field-group/card';
import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
import { FormDefine } from './piying/page/component/form';

import { QueryTable2Define } from './piying/page/demo/query-table2';
import { ArrayDefine } from './piying/page/component/array';
import { LogicDefine } from './piying/page/component/logic';
import { OverlayDefine } from './piying/page/component/overlay';
import { GroupDefine } from './piying/page/component/group';
import { SchemaViewPage } from '@piying-lib/angular-core';
import { FieldGlobalConfig } from './piying/define';
import { PageInputDefine } from './piying/page/component/page-input';
import { ButtonDefine } from './piying/page/component/non-field-control/button';
import { AlertDefine } from './piying/page/component/non-field-control/alert';
import { AvatarDefine } from './piying/page/component/non-field-control/avatar';
import { BadgeDefine } from './piying/page/component/non-field-control/badge';
import { BreadcrumbsDefine } from './piying/page/component/non-field-control/breadcrumbs';
import { DividerDefine } from './piying/page/component/non-field-control/divider';
import { FabDefine } from './piying/page/component/non-field-control/fab';
import { FileInputButtonDefine } from './piying/page/component/non-field-control/file-input-button';
import { InputButtonDefine } from './piying/page/component/non-field-control/input-button';
import { KbdDefine } from './piying/page/component/non-field-control/kbd';
import { LoadingDefine } from './piying/page/component/non-field-control/loading';
import { ProgressDefine } from './piying/page/component/non-field-control/progress';
import { RadialProgressDefine } from './piying/page/component/non-field-control/radial-progress';
import { StatDefine } from './piying/page/component/non-field-control/stat';
import { StatusDefine } from './piying/page/component/non-field-control/status';
import { ThemeControllerDefine } from './piying/page/component/non-field-control/theme-controller';
import { DropdownDefine } from './piying/page/component/non-field-control/dropdown';
import { CheckboxDefine } from './piying/page/component/field-control/checkbox';
import { EditableBadgeDefine } from './piying/page/component/field-control/editable-badge';
import { FileInputDefine } from './piying/page/component/field-control/file-input';
import { PasswordDefine } from './piying/page/component/field-control/password';
import { RadioDefine } from './piying/page/component/field-control/radio';
import { RangeDefine } from './piying/page/component/field-control/range';
import { RatingDefine } from './piying/page/component/field-control/rating';
import { SwapDefine } from './piying/page/component/field-control/swap';
import { ToggleDefine } from './piying/page/component/field-control/toggle';
import { TextareaDefine } from './piying/page/component/field-control/textarea';
import { StepsDefine } from './piying/page/component/field-group/steps';
import { DrawerDefine } from './piying/page/component/field-group/drawer';
import { DockDefine } from './piying/page/component/field-group/dock';
import { CarouselDefine } from './piying/page/component/field-group/carousel';
import { EditableGroupDefine } from './piying/page/component/extension/editable-group';
import { PaginationDefine } from './piying/page/component/extension/pagination';
import { MenuTreeDefine } from './piying/page/component/extension/menu-tree';
import { IonicDevDefine } from '@@py/page/ionic/dev';
import { IonFieldGlobalConfig } from '@@py/page/ionic/define';
import { DaiMobileDev } from '@@py/page/component/mobile/mobile';
import * as v from 'valibot';
import { PickerRefDefine } from '@@py/page/component/extension/picker-ref';
import { ExampleRouterConfig } from './const/example.router.define';
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
            redirectTo: 'category',
            pathMatch: 'full',
          },
          {
            path: 'table',
            component: SchemaViewPage,
            data: {
              schema: () => TableDefine,
              options: () => options,
              id: () => 'table-page',
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
