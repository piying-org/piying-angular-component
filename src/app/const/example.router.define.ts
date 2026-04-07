import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
import { SchemaViewPage } from '@piying-lib/angular-core';
import { PickerRefDefine } from '@@py/page/component/extension/picker-ref';
import { FieldGlobalConfig } from '@@piying-define';
import { CalendarDefine } from '@@py/page/component/calendar';
import { CategoryDefine } from '@@py/page/component/category';
import { EditableGroupDefine } from '@@py/page/component/extension/editable-group';
import { MenuTreeDefine } from '@@py/page/component/extension/menu-tree';
import { PaginationDefine } from '@@py/page/component/extension/pagination';
import { CheckboxDefine } from '@@py/page/component/field-control/checkbox';
import { EditableBadgeDefine } from '@@py/page/component/field-control/editable-badge';
import { FileInputDefine } from '@@py/page/component/field-control/file-input';
import { PasswordDefine } from '@@py/page/component/field-control/password';
import { RadioDefine } from '@@py/page/component/field-control/radio';
import { RangeDefine } from '@@py/page/component/field-control/range';
import { RatingDefine } from '@@py/page/component/field-control/rating';
import { SwapDefine } from '@@py/page/component/field-control/swap';
import { TextareaDefine } from '@@py/page/component/field-control/textarea';
import { ToggleDefine } from '@@py/page/component/field-control/toggle';
import { CardDefine } from '@@py/page/component/field-group/card';
import { CarouselDefine } from '@@py/page/component/field-group/carousel';
import { DockDefine } from '@@py/page/component/field-group/dock';
import { DrawerDefine } from '@@py/page/component/field-group/drawer';
import { StepsDefine } from '@@py/page/component/field-group/steps';
import { FormDefine } from '@@py/page/component/form';
import { GroupDefine } from '@@py/page/component/group';
import { LogicDefine } from '@@py/page/component/logic';
import { AlertDefine } from '@@py/page/component/non-field-control/alert';
import { AvatarDefine } from '@@py/page/component/non-field-control/avatar';
import { BadgeDefine } from '@@py/page/component/non-field-control/badge';
import { BreadcrumbsDefine } from '@@py/page/component/non-field-control/breadcrumbs';
import { ButtonDefine } from '@@py/page/component/non-field-control/button';
import { DividerDefine } from '@@py/page/component/non-field-control/divider';
import { DropdownDefine } from '@@py/page/component/non-field-control/dropdown';
import { FabDefine } from '@@py/page/component/non-field-control/fab';
import { FileInputButtonDefine } from '@@py/page/component/non-field-control/file-input-button';
import { InputButtonDefine } from '@@py/page/component/non-field-control/input-button';
import { KbdDefine } from '@@py/page/component/non-field-control/kbd';
import { LoadingDefine } from '@@py/page/component/non-field-control/loading';
import { ProgressDefine } from '@@py/page/component/non-field-control/progress';
import { RadialProgressDefine } from '@@py/page/component/non-field-control/radial-progress';
import { StatDefine } from '@@py/page/component/non-field-control/stat';
import { StatusDefine } from '@@py/page/component/non-field-control/status';
import { ThemeControllerDefine } from '@@py/page/component/non-field-control/theme-controller';
import { SelectDefine } from '@@py/page/component/select';
import { TableDefine } from '@@py/page/component/table';
import { TabsDefine } from '@@py/page/component/tabs';
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export const ExampleRouterConfig = [
  {
    config: { title: 'button', router: { routerLink: './example/button' } },
    define: {
      path: 'button',
      component: SchemaViewPage,
      data: {
        schema: () => ButtonDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'alert', router: { routerLink: './example/alert' } },
    define: {
      path: 'alert',
      component: SchemaViewPage,
      data: {
        schema: () => AlertDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'avatar', router: { routerLink: './example/avatar' } },
    define: {
      path: 'avatar',
      component: SchemaViewPage,
      data: {
        schema: () => AvatarDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'badge', router: { routerLink: './example/badge' } },
    define: {
      path: 'badge',
      component: SchemaViewPage,
      data: {
        schema: () => BadgeDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'breadcrumbs',
      router: { routerLink: './example/breadcrumbs' },
    },
    define: {
      path: 'breadcrumbs',
      component: SchemaViewPage,
      data: {
        schema: () => BreadcrumbsDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'calendar', router: { routerLink: './example/calendar' } },
    define: {
      path: 'calendar',
      component: SchemaViewPage,
      data: {
        schema: () => CalendarDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'card', router: { routerLink: './example/card' } },
    define: {
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
  },
  {
    config: { title: 'carousel', router: { routerLink: './example/carousel' } },
    define: {
      path: 'carousel',
      component: SchemaViewPage,
      data: {
        schema: () => CarouselDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'category', router: { routerLink: './example/category' } },
    define: {
      path: 'category',
      component: SchemaViewPage,
      data: {
        schema: () => CategoryDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'checkbox', router: { routerLink: './example/checkbox' } },
    define: {
      path: 'checkbox',
      component: SchemaViewPage,
      data: {
        schema: () => CheckboxDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'divider', router: { routerLink: './example/divider' } },
    define: {
      path: 'divider',
      component: SchemaViewPage,
      data: {
        schema: () => DividerDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'dock', router: { routerLink: './example/dock' } },
    define: {
      path: 'dock',
      component: SchemaViewPage,
      data: {
        schema: () => DockDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'drawer', router: { routerLink: './example/drawer' } },
    define: {
      path: 'drawer',
      component: SchemaViewPage,
      data: {
        schema: () => DrawerDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'dropdown', router: { routerLink: './example/dropdown' } },
    define: {
      path: 'dropdown',
      component: SchemaViewPage,
      data: {
        schema: () => DropdownDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'editable-badge',
      router: { routerLink: './example/editable-badge' },
    },
    define: {
      path: 'editable-badge',
      component: SchemaViewPage,
      data: {
        schema: () => EditableBadgeDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'editable-group',
      router: { routerLink: './example/editable-group' },
    },
    define: {
      path: 'editable-group',
      component: SchemaViewPage,
      data: {
        schema: () => EditableGroupDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'fab', router: { routerLink: './example/fab' } },
    define: {
      path: 'fab',
      component: SchemaViewPage,
      data: {
        schema: () => FabDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'file-input',
      router: { routerLink: './example/file-input' },
    },
    define: {
      path: 'file-input',
      component: SchemaViewPage,
      data: {
        schema: () => FileInputDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'file-input-button',
      router: { routerLink: './example/file-input-button' },
    },
    define: {
      path: 'file-input-button',
      component: SchemaViewPage,
      data: {
        schema: () => FileInputButtonDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'form', router: { routerLink: './example/form' } },
    define: {
      path: 'form',
      component: SchemaViewPage,
      data: {
        schema: () => FormDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'group', router: { routerLink: './example/group' } },
    define: {
      path: 'group',
      component: SchemaViewPage,
      data: {
        schema: () => GroupDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'input-button',
      router: { routerLink: './example/input-button' },
    },
    define: {
      path: 'input-button',
      component: SchemaViewPage,
      data: {
        schema: () => InputButtonDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'kbd', router: { routerLink: './example/kbd' } },
    define: {
      path: 'kbd',
      component: SchemaViewPage,
      data: {
        schema: () => KbdDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'loading', router: { routerLink: './example/loading' } },
    define: {
      path: 'loading',
      component: SchemaViewPage,
      data: {
        schema: () => LoadingDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'logic', router: { routerLink: './example/logic' } },
    define: {
      path: 'logic',
      component: SchemaViewPage,
      data: {
        schema: () => LogicDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'menu-tree',
      router: { routerLink: './example/menu-tree' },
    },
    define: {
      path: 'menu-tree',
      component: SchemaViewPage,
      data: {
        schema: () => MenuTreeDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'pagination',
      router: { routerLink: './example/pagination' },
    },
    define: {
      path: 'pagination',
      component: SchemaViewPage,
      data: {
        schema: () => PaginationDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'password', router: { routerLink: './example/password' } },
    define: {
      path: 'password',
      component: SchemaViewPage,
      data: {
        schema: () => PasswordDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'progress', router: { routerLink: './example/progress' } },
    define: {
      path: 'progress',
      component: SchemaViewPage,
      data: {
        schema: () => ProgressDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'picker-ref',
      router: { routerLink: './example/picker-ref' },
    },
    define: {
      path: 'picker-ref',
      component: SchemaViewPage,
      data: {
        schema: () => PickerRefDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'radial-progress',
      router: { routerLink: './example/radial-progress' },
    },
    define: {
      path: 'radial-progress',
      component: SchemaViewPage,
      data: {
        schema: () => RadialProgressDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'radio', router: { routerLink: './example/radio' } },
    define: {
      path: 'radio',
      component: SchemaViewPage,
      data: {
        schema: () => RadioDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'range', router: { routerLink: './example/range' } },
    define: {
      path: 'range',
      component: SchemaViewPage,
      data: {
        schema: () => RangeDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'rating', router: { routerLink: './example/rating' } },
    define: {
      path: 'rating',
      component: SchemaViewPage,
      data: {
        schema: () => RatingDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'select', router: { routerLink: './example/select' } },
    define: {
      path: 'select',
      component: SchemaViewPage,
      data: {
        schema: () => SelectDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'stat', router: { routerLink: './example/stat' } },
    define: {
      path: 'stat',
      component: SchemaViewPage,
      data: {
        schema: () => StatDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'status', router: { routerLink: './example/status' } },
    define: {
      path: 'status',
      component: SchemaViewPage,
      data: {
        schema: () => StatusDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'steps', router: { routerLink: './example/steps' } },
    define: {
      path: 'steps',
      component: SchemaViewPage,
      data: {
        schema: () => StepsDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'swap', router: { routerLink: './example/swap' } },
    define: {
      path: 'swap',
      component: SchemaViewPage,
      data: {
        schema: () => SwapDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'table', router: { routerLink: './example/table' } },
    define: {
      path: 'table',
      component: SchemaViewPage,
      data: {
        schema: () => TableDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'tabs', router: { routerLink: './example/tabs' } },
    define: {
      path: 'tabs',
      component: SchemaViewPage,
      data: {
        schema: () => TabsDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'textarea', router: { routerLink: './example/textarea' } },
    define: {
      path: 'textarea',
      component: SchemaViewPage,
      data: {
        schema: () => TextareaDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'theme-controller',
      router: { routerLink: './example/theme-controller' },
    },
    define: {
      path: 'theme-controller',
      component: SchemaViewPage,
      data: {
        schema: () => ThemeControllerDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'toggle', router: { routerLink: './example/toggle' } },
    define: {
      path: 'toggle',
      component: SchemaViewPage,
      data: {
        schema: () => ToggleDefine,
        options: () => options,
      },
    },
  },
];
