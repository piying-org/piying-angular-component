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
import { StrOrTemplateComponent } from '@piying/angular-core';
import { actions, setComponent } from '@piying/view-angular-core';
const selectorPrefix = 'app-';

const list = [
  ...Object.values(NFCCGroup),
  ...Object.values(FCCGroup),
  ...Object.values(FGCGroup),
  ...Object.values(ExtComponentGroup),
] as Type<any>[];

const types = list.reduce(
  (obj, item) => {
    const result = reflectComponentType(item);
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
const defaultWrapper = [...Object.values(WrapperGroup), ...Object.values(ExtWrapperGroup)].reduce(
  (obj, item) => {
    const result = reflectComponentType(item as any);
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
    actions: [setComponent(InputFCC), actions.wrappers.set(['label-wrapper'])],
  },
  number: {
    actions: [
      setComponent(InputFCC),
      actions.inputs.set({ type: 'number' }),
      actions.wrappers.set(['label-wrapper']),
    ],
  },
  range: {
    actions: [setComponent(FCCGroup.RangeFCC), actions.wrappers.set(['label-wrapper'])],
  },
  date: {
    actions: [
      setComponent(InputFCC),
      actions.inputs.set({ type: 'date' }),
      actions.wrappers.set(['label-wrapper']),
    ],
  },
  boolean: {
    actions: [
      setComponent(FCCGroup.CheckboxFCC),
      actions.wrappers.set(['label-wrapper']),
      actions.props.patch({
        labelPosition: 'right',
      }),
    ],
  },
  toggle: {
    actions: [
      setComponent(FCCGroup.ToggleFCC),
      actions.wrappers.set(['label-wrapper']),
      actions.props.patch({
        labelPosition: 'right',
      }),
    ],
  },
  select: {
    actions: [setComponent(FCCGroup.SelectFCC), actions.wrappers.set(['label-wrapper'])],
  },
  radio: {
    actions: [setComponent(FCCGroup.RadioFCC), actions.wrappers.set(['label-wrapper'])],
  },
  textarea: {
    actions: [setComponent(FCCGroup.TextareaFCC), actions.wrappers.set(['label-wrapper'])],
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
