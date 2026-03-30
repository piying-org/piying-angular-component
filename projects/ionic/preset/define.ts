import { PiyingViewGroup } from '@piying/view-angular';
import { DivNFCC, DivWC, StrOrTemplateComponent } from '@piying-lib/angular-core';
import { IonInputFCC } from '../field-control';
import { IonRadioGroupFCC } from '../field-control/radio-group';

export const PresetDefine = {
  types: {
    string: { type: IonInputFCC },
    radioGroup: { type: IonRadioGroupFCC },
    object: { type: PiyingViewGroup },
    tuple: { type: PiyingViewGroup },
    div: { type: DivNFCC },
    'common-data': { type: StrOrTemplateComponent },
  },
  wrappers: {
    div: { type: DivWC },
  },
};
