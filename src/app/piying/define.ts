import * as NFCCGroup from '@piying/angular-daisyui/non-field-control';
import * as FCCGroup from '@piying/angular-daisyui/field-control';
import * as FGCGroup from '@piying/angular-daisyui/field-group';
import { reflectComponentType, Type } from '@angular/core';
import { PiViewConfig, PiyingViewGroup } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
import { DivWC } from './component/div-wrapper/component';
import { DivNFCC } from './component/div/component';
import { ExtComponentGroup, ExtWrapperGroup } from '@piying/angular-daisyui/extension';
import * as WrapperGroup from '@piying/angular-daisyui/wrapper';

const selectorPrefix = 'app-';

const list = [
  ...Object.values(NFCCGroup),
  ...Object.values(FCCGroup),
  ...Object.values(FGCGroup),
  ...Object.values(ExtComponentGroup),
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
let defaultWrapper = [...Object.values(WrapperGroup), ...Object.values(ExtWrapperGroup)].reduce(
  (obj, item) => {
    let result = reflectComponentType(item as any);
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
  },
  wrappers: {
    ...defaultWrapper,
    div: {
      type: DivWC,
    },
  },
};
