import { typedComponent } from '@piying/view-angular';

import { PresetDefine } from '@piying-lib/angular-daisyui/preset';
let safeDefine = typedComponent(PresetDefine);
export const FieldGlobalConfig = safeDefine.define;
