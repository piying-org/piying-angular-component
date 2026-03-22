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
import { ButtonDefine } from './piying/page/component/button';
import { AlertDefine } from './piying/page/component/alert';
import { AvatarDefine } from './piying/page/component/avatar';
import { BadgeDefine } from './piying/page/component/badge';
import { BreadcrumbsDefine } from './piying/page/component/breadcrumbs';
import { CheckboxDefine } from './piying/page/component/checkbox';
import { DividerDefine } from './piying/page/component/divider';
import { EditableBadgeDefine } from './piying/page/component/editable-badge';
import { EditableGroupDefine } from './piying/page/component/editable-group';
import { FabDefine } from './piying/page/component/fab';
import { FileInputDefine } from './piying/page/component/file-input';
import { FileInputButtonDefine } from './piying/page/component/file-input-button';
import { InputButtonDefine } from './piying/page/component/input-button';
import { KbdDefine } from './piying/page/component/kbd';
import { LoadingDefine } from './piying/page/component/loading';
import { PasswordDefine } from './piying/page/component/password';
import { ProgressDefine } from './piying/page/component/progress';
import { RadialProgressDefine } from './piying/page/component/radial-progress';
import { RadioDefine } from './piying/page/component/radio';
import { RangeDefine } from './piying/page/component/range';
import { RatingDefine } from './piying/page/component/rating';
import { StatDefine } from './piying/page/component/stat';
import { StatusDefine } from './piying/page/component/status';
import { StepsDefine } from './piying/page/component/steps';
import { SwapDefine } from './piying/page/component/swap';
import { ThemeControllerDefine } from './piying/page/component/theme-controller';
import { ToggleDefine } from './piying/page/component/toggle';
import { PaginationDefine } from './piying/page/component/pagination';
import { DrawerDefine } from './piying/page/component/drawer';
import { DropdownDefine } from './piying/page/component/dropdown';
import { DockDefine } from './piying/page/component/dock';
import { CarouselDefine } from './piying/page/component/carousel';
import { MenuTreeDefine } from './piying/page/component/menu-tree';
import { TextareaDefine } from './piying/page/component/textarea';
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

          {
            path: 'button',
            component: SchemaViewPage,
            data: {
              schema: () => ButtonDefine,
              options: () => options,
            },
          },
          {
            path: 'alert',
            component: SchemaViewPage,
            data: {
              schema: () => AlertDefine,
              options: () => options,
            },
          },
          {
            path: 'avatar',
            component: SchemaViewPage,
            data: {
              schema: () => AvatarDefine,
              options: () => options,
            },
          },
          {
            path: 'badge',
            component: SchemaViewPage,
            data: {
              schema: () => BadgeDefine,
              options: () => options,
            },
          },
          {
            path: 'breadcrumbs',
            component: SchemaViewPage,
            data: {
              schema: () => BreadcrumbsDefine,
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
            path: 'card',
            component: SchemaViewPage,
            data: {
              schema: () => CardDefine,
              options: () => options,
            },
          },
          {
            path: 'carousel',
            component: SchemaViewPage,
            data: {
              schema: () => CarouselDefine,
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
            path: 'checkbox',
            component: SchemaViewPage,
            data: {
              schema: () => CheckboxDefine,
              options: () => options,
            },
          },
          {
            path: 'divider',
            component: SchemaViewPage,
            data: {
              schema: () => DividerDefine,
              options: () => options,
            },
          },
          {
            path: 'dock',
            component: SchemaViewPage,
            data: {
              schema: () => DockDefine,
              options: () => options,
            },
          },
          {
            path: 'drawer',
            component: SchemaViewPage,
            data: {
              schema: () => DrawerDefine,
              options: () => options,
            },
          },
          {
            path: 'dropdown',
            component: SchemaViewPage,
            data: {
              schema: () => DropdownDefine,
              options: () => options,
            },
          },
          {
            path: 'editable-badge',
            component: SchemaViewPage,
            data: {
              schema: () => EditableBadgeDefine,
              options: () => options,
            },
          },
          {
            path: 'editable-group',
            component: SchemaViewPage,
            data: {
              schema: () => EditableGroupDefine,
              options: () => options,
            },
          },
          {
            path: 'fab',
            component: SchemaViewPage,
            data: {
              schema: () => FabDefine,
              options: () => options,
            },
          },
          {
            path: 'file-input',
            component: SchemaViewPage,
            data: {
              schema: () => FileInputDefine,
              options: () => options,
            },
          },
          {
            path: 'file-input-button',
            component: SchemaViewPage,
            data: {
              schema: () => FileInputButtonDefine,
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
            path: 'group',
            component: SchemaViewPage,
            data: {
              schema: () => GroupDefine,
              options: () => options,
            },
          },
          {
            path: 'input-button',
            component: SchemaViewPage,
            data: {
              schema: () => InputButtonDefine,
              options: () => options,
            },
          },
          {
            path: 'kbd',
            component: SchemaViewPage,
            data: {
              schema: () => KbdDefine,
              options: () => options,
            },
          },
          {
            path: 'loading',
            component: SchemaViewPage,
            data: {
              schema: () => LoadingDefine,
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
            path: 'logic',
            component: SchemaViewPage,
            data: {
              schema: () => LogicDefine,
              options: () => options,
            },
          },
          {
            path: 'menu-tree',
            component: SchemaViewPage,
            data: {
              schema: () => MenuTreeDefine,
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
            path: 'pagination',
            component: SchemaViewPage,
            data: {
              schema: () => PaginationDefine,
              options: () => options,
            },
          },
          {
            path: 'password',
            component: SchemaViewPage,
            data: {
              schema: () => PasswordDefine,
              options: () => options,
            },
          },
          {
            path: 'progress',
            component: SchemaViewPage,
            data: {
              schema: () => ProgressDefine,
              options: () => options,
            },
          },
          {
            path: 'radial-progress',
            component: SchemaViewPage,
            data: {
              schema: () => RadialProgressDefine,
              options: () => options,
            },
          },
          {
            path: 'radio',
            component: SchemaViewPage,
            data: {
              schema: () => RadioDefine,
              options: () => options,
            },
          },
          {
            path: 'range',
            component: SchemaViewPage,
            data: {
              schema: () => RangeDefine,
              options: () => options,
            },
          },
          {
            path: 'rating',
            component: SchemaViewPage,
            data: {
              schema: () => RatingDefine,
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
            path: 'stat',
            component: SchemaViewPage,
            data: {
              schema: () => StatDefine,
              options: () => options,
            },
          },
          {
            path: 'status',
            component: SchemaViewPage,
            data: {
              schema: () => StatusDefine,
              options: () => options,
            },
          },
          {
            path: 'steps',
            component: SchemaViewPage,
            data: {
              schema: () => StepsDefine,
              options: () => options,
            },
          },
          {
            path: 'swap',
            component: SchemaViewPage,
            data: {
              schema: () => SwapDefine,
              options: () => options,
            },
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
            path: 'tabs',
            component: SchemaViewPage,
            data: {
              schema: () => TabsDefine,
              options: () => options,
            },
          },
          {
            path: 'textarea',
            component: SchemaViewPage,
            data: {
              schema: () => TextareaDefine,
              options: () => options,
            },
          },
          {
            path: 'theme-controller',
            component: SchemaViewPage,
            data: {
              schema: () => ThemeControllerDefine,
              options: () => options,
            },
          },
          {
            path: 'toggle',
            component: SchemaViewPage,
            data: {
              schema: () => ToggleDefine,
              options: () => options,
            },
          },
        ],
      },
    ],
  },
];
