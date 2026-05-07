import { range } from 'es-toolkit';
import { faker } from '@faker-js/faker';
import { SchemaViewPage } from '@piying-lib/angular-core';
import { PickerRefDefine } from '@@py/page/component/extension/picker-ref';
import { FieldGlobalConfig } from '@@piying-define';
import { FunctionLoginDefine } from '../piying/page/component/function/login';
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
import { CalendarDefine } from '@@py/page/component/field-control/calendar';
import { SelectDefine } from '@@py/page/component/field-control/select';
import { TabsDefine } from '@@py/page/component/field-group/tabs';
import { TableDefine } from '@@py/page/component/extension/table';
import { FormArrayDefine } from '@@py/page/component/form/array';
import { FormCheckListDefine } from '@@py/page/component/form/check-llist';
import { FormFieldDefine } from '@@py/page/component/form/field';
import { FormLogicDefine } from '@@py/page/component/form/logic';
import { DialogDefine } from '@@py/page/component/overlay/dialog';
import { ToastDefine } from '@@py/page/component/overlay/toast';
import { ConfirmDefine } from '@@py/page/component/overlay/confirm';
import { EditableRowDefine } from '@@py/page/component/extension/editable-row';
import { InputDefine } from '@@py/page/component/field-control/input';
import { InputNumberDefine } from '@@py/page/component/field-control/input-number';
import { PickerRefWrapperDefine } from '@@py/page/component/non-field-control/picker-ref';
import { FunctionTableDefine } from '@@py/page/component/function/table';
import { Card2Define } from '@@py/page/component/non-field-control/card2';
import { FunctionDashboardDefine } from '@@py/page/component/function/dashboard';
import { SearchGroupDefine } from '@@py/page/component/extension/search-group';
import { AutoCompleteDefine } from '@@py/page/component/field-control/autocomplete';
import { ButtonInputFCC } from '@piying-lib/angular-daisyui/field-control';
import { ButtonInputDefine } from '@@py/page/component/field-control/button-input';
import { LabelDefine } from '@@py/page/component/field-control/label';
const options = {
  fieldGlobalConfig: FieldGlobalConfig,
};
export const ExampleFieldControlRouterConfig = [
  {
    config: { title: 'calendar', router: { routerLink: './example/field-control/calendar' } },
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
    config: { title: 'checkbox', router: { routerLink: './example/field-control/checkbox' } },
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
    config: {
      title: 'editable-badge',
      router: { routerLink: './example/field-control/editable-badge' },
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
      title: 'file-input',
      router: { routerLink: './example/field-control/file-input' },
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
    config: { title: 'password', router: { routerLink: './example/field-control/password' } },
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
    config: { title: 'radio', router: { routerLink: './example/field-control/radio' } },
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
    config: { title: 'range', router: { routerLink: './example/field-control/range' } },
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
    config: { title: 'rating', router: { routerLink: './example/field-control/rating' } },
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
    config: { title: 'select', router: { routerLink: './example/field-control/select' } },
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
    config: { title: 'swap', router: { routerLink: './example/field-control/swap' } },
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
    config: { title: 'textarea', router: { routerLink: './example/field-control/textarea' } },
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
    config: { title: 'toggle', router: { routerLink: './example/field-control/toggle' } },
    define: {
      path: 'toggle',
      component: SchemaViewPage,
      data: {
        schema: () => ToggleDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'input', router: { routerLink: './example/field-control/input' } },
    define: {
      path: 'input',
      component: SchemaViewPage,
      data: {
        schema: () => InputDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'input-number',
      router: { routerLink: './example/field-control/input-number' },
    },
    define: {
      path: 'input-number',
      component: SchemaViewPage,
      data: {
        schema: () => InputNumberDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'autocomplete',
      router: { routerLink: './example/field-control/autocomplete' },
    },
    define: {
      path: 'autocomplete',
      component: SchemaViewPage,
      data: {
        schema: () => AutoCompleteDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'button-input',
      router: { routerLink: './example/field-control/button-input' },
    },
    define: {
      path: 'button-input',
      component: SchemaViewPage,
      data: {
        schema: () => ButtonInputDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'label',
      router: { routerLink: './example/field-control/label' },
    },
    define: {
      path: 'label',
      component: SchemaViewPage,
      data: {
        schema: () => LabelDefine,
        options: () => options,
      },
    },
  },
];

export const ExampleFieldGroupRouterConfig = [
  {
    config: { title: 'card', router: { routerLink: './example/field-group/card' } },
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
    config: { title: 'carousel', router: { routerLink: './example/field-group/carousel' } },
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
    config: { title: 'dock', router: { routerLink: './example/field-group/dock' } },
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
    config: { title: 'drawer', router: { routerLink: './example/field-group/drawer' } },
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
    config: { title: 'steps', router: { routerLink: './example/field-group/steps' } },
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
    config: { title: 'tabs', router: { routerLink: './example/field-group/tabs' } },
    define: {
      path: 'tabs',
      component: SchemaViewPage,
      data: {
        schema: () => TabsDefine,
        options: () => options,
      },
    },
  },
];

export const ExampleNonFieldControlRouterConfig = [
  {
    config: { title: 'alert', router: { routerLink: './example/non-field-control/alert' } },
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
    config: { title: 'avatar', router: { routerLink: './example/non-field-control/avatar' } },
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
    config: { title: 'badge', router: { routerLink: './example/non-field-control/badge' } },
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
      router: { routerLink: './example/non-field-control/breadcrumbs' },
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
    config: { title: 'button', router: { routerLink: './example/non-field-control/button' } },
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
    config: { title: 'divider', router: { routerLink: './example/non-field-control/divider' } },
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
    config: { title: 'dropdown', router: { routerLink: './example/non-field-control/dropdown' } },
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
    config: { title: 'fab', router: { routerLink: './example/non-field-control/fab' } },
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
      title: 'file-input-button',
      router: { routerLink: './example/non-field-control/file-input-button' },
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
    config: {
      title: 'input-button',
      router: { routerLink: './example/non-field-control/input-button' },
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
    config: { title: 'kbd', router: { routerLink: './example/non-field-control/kbd' } },
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
    config: { title: 'loading', router: { routerLink: './example/non-field-control/loading' } },
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
    config: { title: 'progress', router: { routerLink: './example/non-field-control/progress' } },
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
      title: 'radial-progress',
      router: { routerLink: './example/non-field-control/radial-progress' },
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
    config: { title: 'stat', router: { routerLink: './example/non-field-control/stat' } },
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
    config: { title: 'status', router: { routerLink: './example/non-field-control/status' } },
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
    config: {
      title: 'theme-controller',
      router: { routerLink: './example/non-field-control/theme-controller' },
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
    config: {
      title: 'picker-ref',
      router: { routerLink: './example/non-field-control/picker-ref' },
    },
    define: {
      path: 'picker-ref',
      component: SchemaViewPage,
      data: {
        schema: () => PickerRefWrapperDefine,
        options: () => options,
      },
    },
  },
  {
    config: {
      title: 'card2',
      router: { routerLink: './example/non-field-control/card2' },
    },
    define: {
      path: 'card2',
      component: SchemaViewPage,
      data: {
        schema: () => Card2Define,
        options: () => options,
      },
    },
  },
];

export const ExampleExtensionRouterConfig = [
  {
    config: {
      title: 'editable-group',
      router: { routerLink: './example/extension/editable-group' },
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
    config: {
      title: 'menu-tree',
      router: { routerLink: './example/extension/menu-tree' },
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
      router: { routerLink: './example/extension/pagination' },
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
    config: {
      title: 'picker-ref',
      router: { routerLink: './example/extension/picker-ref' },
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
    config: { title: 'table', router: { routerLink: './example/extension/table' } },
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
    config: { title: 'editable-row', router: { routerLink: './example/extension/editable-row' } },
    define: {
      path: 'editable-row',
      component: SchemaViewPage,
      data: {
        schema: () => EditableRowDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'search-group', router: { routerLink: './example/extension/search-group' } },
    define: {
      path: 'search-group',
      component: SchemaViewPage,
      data: {
        schema: () => SearchGroupDefine,
        options: () => options,
      },
    },
  },
];

export const ExampleFormRouterConfig = [
  {
    config: { title: 'array', router: { routerLink: './example/form/array' } },
    define: {
      path: 'array',
      component: SchemaViewPage,
      data: {
        schema: () => FormArrayDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'check-list', router: { routerLink: './example/form/check-list' } },
    define: {
      path: 'check-list',
      component: SchemaViewPage,
      data: {
        schema: () => FormCheckListDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'field', router: { routerLink: './example/form/field' } },
    define: {
      path: 'field',
      component: SchemaViewPage,
      data: {
        schema: () => FormFieldDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'logic', router: { routerLink: './example/form/logic' } },
    define: {
      path: 'logic',
      component: SchemaViewPage,
      data: {
        schema: () => FormLogicDefine,
        options: () => options,
      },
    },
  },
];
export const OverlayRouterConfig = [
  {
    config: { title: 'dialog', router: { routerLink: './example/overlay/dialog' } },
    define: {
      path: 'dialog',
      component: SchemaViewPage,
      data: {
        schema: () => DialogDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'toast', router: { routerLink: './example/overlay/toast' } },
    define: {
      path: 'toast',
      component: SchemaViewPage,
      data: {
        schema: () => ToastDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'confirm', router: { routerLink: './example/overlay/confirm' } },
    define: {
      path: 'confirm',
      component: SchemaViewPage,
      data: {
        schema: () => ConfirmDefine,
        options: () => options,
      },
    },
  },
];

export const FunctionRouterConfig = [
  {
    config: { title: 'login', router: { routerLink: './example/function/login' } },
    define: {
      path: 'login',
      component: SchemaViewPage,
      data: {
        schema: () => FunctionLoginDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'table', router: { routerLink: './example/function/table' } },
    define: {
      path: 'table',
      component: SchemaViewPage,
      data: {
        schema: () => FunctionTableDefine,
        options: () => options,
      },
    },
  },
  {
    config: { title: 'dashboard', router: { routerLink: './example/function/dashboard' } },
    define: {
      path: 'dashboard',
      component: SchemaViewPage,
      data: {
        schema: () => FunctionDashboardDefine,
        options: () => options,
      },
    },
  },
];
