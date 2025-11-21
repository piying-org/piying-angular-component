import * as NFCCGroup from '@piying/angular-daisyui/non-field-control';
import * as FCCGroup from '@piying/angular-daisyui/field-control';
import * as FGCGroup from '@piying/angular-daisyui/field-group';
import { reflectComponentType, Type } from '@angular/core';
import { PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
import { DivWC } from './component/div-wrapper/component';
import { DivNFCC } from './component/div/component';
import { MenuTreeNFCC, TableNFCC } from '@piying/angular-daisyui/extension';
import { ThWC, TdWC, SortHeaderWC } from '@piying/angular-daisyui/wrapper';
import * as WrapperGroup from '@piying/angular-daisyui/wrapper';
import * as ExtensionGroup from '@piying/angular-daisyui/extension';

const selectorPrefix = 'app-';

const list = [
  ...Object.values(NFCCGroup),
  ...Object.values(FCCGroup),
  ...Object.values(FGCGroup),
  ...Object.values(ExtensionGroup),
] as Type<any>[];

const types = list.reduce(
  (obj, item) => {
    let result = reflectComponentType(item);
    if (!result) {
      return obj;
    }
    obj[
      result.selector.startsWith(selectorPrefix)
        ? result.selector.slice(selectorPrefix.length)
        : result.selector
    ] = {
      type: item,
    };
    return obj;
  },
  {} as Record<string, any>,
);
let defaultWrapper = Object.values(WrapperGroup).reduce(
  (obj, item) => {
    let result = reflectComponentType(item);
    if (!result) {
      return obj;
    }
    obj[
      result.selector.startsWith(selectorPrefix)
        ? result.selector.slice(selectorPrefix.length)
        : result.selector
    ] = {
      type: item,
    };
    return obj;
  },
  {} as Record<string, any>,
);

export const FieldGlobalConfig: PiViewConfig = {
  types: {
    ...types,
    'router-outlet': { type: RouterOutlet },
    object: { type: PiyingViewGroup },
    div: {
      type: DivNFCC,
    },
    'menu-tree': {
      type: MenuTreeNFCC,
    },
    table: {
      type: TableNFCC,
    },
  },
  wrappers: {
    ...defaultWrapper,
    div: {
      type: DivWC,
    },
    th: {
      type: ThWC,
    },
    td: {
      type: TdWC,
    },
    sort: {
      type: SortHeaderWC,
    },
  },
};
