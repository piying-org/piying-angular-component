import { typedComponent } from '@piying/view-angular';

import { PresetDefine } from '@piying-lib/angular-daisyui/preset';
const safeDefine = typedComponent(PresetDefine);
export const FieldGlobalConfig = safeDefine.define;
