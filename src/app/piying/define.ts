import { typedComponent } from '@piying/view-angular';

import { PresetDefine } from '@piying-lib/angular-daisyui/preset';
import { CodeTabsNFCC } from './component/code-panel/component';
export const safeDefine = typedComponent({
  ...PresetDefine,
  types: {
    ...PresetDefine.types,
    'code-tabs': { type: CodeTabsNFCC },
  },
});
export const FieldGlobalConfig = safeDefine.define;
