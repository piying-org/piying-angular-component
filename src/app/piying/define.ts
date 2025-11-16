import * as NFCCGroup from '@piying/angular-daisyui/non-field-control';
import * as FCCGroup from '@piying/angular-daisyui/field-control';
import * as FGCGroup from '@piying/angular-daisyui/field-group';
import { reflectComponentType, Type } from '@angular/core';
import { PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
import { DivWC } from './component/div-wrapper/component';
import { DivNFCC } from './component/div/component';
import { MenuTreeNFCC, TableNFCC } from '@piying/angular-daisyui/extension';
import { ThWC, TdWC } from '@piying/angular-daisyui/wrapper';
const selectorPrefix = 'app-';

const list = [
  ...Object.values(NFCCGroup),
  ...Object.values(FCCGroup),
  ...Object.values(FGCGroup),
] as Type<any>[];

const types = list.reduce(
  (obj, item) => {
    let { selector } = reflectComponentType(item)!;
    obj[selector.slice(selectorPrefix.length)] = {
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
    div: {
      type: DivWC,
    },
    th: {
      type: ThWC,
    },
    td: {
      type: TdWC,
    },
  },
};
