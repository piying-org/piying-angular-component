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
import { InputFCC } from '@piying/angular-daisyui/field-control';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { patchProps, setComponent, setInputs, setWrappers } from '@piying/view-angular-core';
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
export const FormDefine = {
  string: {
    actions: [setComponent(InputFCC), setWrappers(['label-wrapper'])],
  },
  number: {
    actions: [
      setComponent(InputFCC),
      setInputs({ type: 'number' }),
      setWrappers(['label-wrapper']),
    ],
  },
  range: {
    actions: [setComponent(FCCGroup.RangeFCC), setWrappers(['label-wrapper'])],
  },
  date: {
    actions: [setComponent(InputFCC), setInputs({ type: 'date' }), setWrappers(['label-wrapper'])],
  },
  boolean: {
    actions: [
      setComponent(FCCGroup.CheckboxFCC),
      setWrappers(['label-wrapper']),
      patchProps({
        labelPosition: 'right',
      }),
    ],
  },
  toggle: {
    actions: [
      setComponent(FCCGroup.ToggleFCC),
      setWrappers(['label-wrapper']),
      patchProps({
        labelPosition: 'right',
      }),
    ],
  },
  select: {
    actions: [setComponent(FCCGroup.SelectFCC), setWrappers(['label-wrapper'])],
  },
  radio: {
    actions: [setComponent(FCCGroup.RadioFCC), setWrappers(['label-wrapper'])],
  },
  textarea: {
    actions: [setComponent(FCCGroup.TextareaFCC), setWrappers(['label-wrapper'])],
  },
} as PiViewConfig['types'];

export const FieldGlobalConfig: PiViewConfig = {
  types: {
    ...types,
    ...FormDefine,
    'router-outlet': { type: RouterOutlet },
    object: { type: PiyingViewGroup },
    div: {
      type: DivNFCC,
    },

    'common-data': {
      type: StrOrTemplateComponent,
    },
  },
  wrappers: {
    ...defaultWrapper,
    div: {
      type: DivWC,
    },
  },
};
