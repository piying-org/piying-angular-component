import { PiyingViewGroup, typedComponent } from '@piying/view-angular';

import { PresetDefine } from '@piying-lib/angular-daisyui/preset';
import { CodeTabsNFCC } from './component/code-tabs/component';
import { CodeHeaderNFCC } from './component/code-header/component';
export const safeDefine = typedComponent({
  ...PresetDefine,
  types: {
    ...PresetDefine.types,
    'code-tabs': { type: CodeTabsNFCC },
    'code-header': { type: CodeHeaderNFCC },
    tuple: { type: PiyingViewGroup },
  },
});
export const FieldGlobalConfig = safeDefine.define;
