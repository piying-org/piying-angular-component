import { actions, PiyingViewGroup } from '@piying/view-angular';
import { DivNFCC, DivWC, StrOrTemplateComponent } from '@piying-lib/angular-core';
import {
  IonCheckboxFCC,
  IonDatetimeButtonFCC,
  IonInputFCC,
  IonRadioGroupFCC,
  IonSelectFCC,
  IonTextareaFCC,
  IonToggleFCC,
} from '@piying-lib/angular-ionic/field-control';
import { IonInputPasswordToggleWC } from '../wrapper';

export const PresetDefine = {
  types: {
    string: { type: IonInputFCC },
    password: {
      type: IonInputFCC,
      actions: [
        actions.wrappers.set([{ type: IonInputPasswordToggleWC }]),
        actions.inputs.set({ type: 'password' }),
      ],
    },
    radioGroup: { type: IonRadioGroupFCC },
    boolean: { type: IonCheckboxFCC },
    date: {
      type: IonDatetimeButtonFCC,
    },
    select: { type: IonSelectFCC },
    toggle: { type: IonToggleFCC },
    textarea: { type: IonTextareaFCC },
    object: { type: PiyingViewGroup },
    tuple: { type: PiyingViewGroup },
    div: { type: DivNFCC },
    'common-data': { type: StrOrTemplateComponent },
  },
  wrappers: {
    div: { type: DivWC },
  },
};
