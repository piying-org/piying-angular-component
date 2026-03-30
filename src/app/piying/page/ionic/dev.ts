import * as v from 'valibot';
import { formConfig, NFCSchema, setComponent } from '@piying/view-angular-core';
import { computed } from '@angular/core';
import { actions } from '@piying/view-angular';
import { FormBase } from '../component/form';
import { safeDefine } from './define';
import { provideIonicAngular } from '@ionic/angular/standalone';

export const IonicDevDefine = v.pipe(
  v.object({
    string: v.pipe(
      v.string(),
      safeDefine.setComponent('string', (actions) => {
        return [actions.inputs.patch({ label: 'label1' })];
      }),
    ),
    radioGroup: v.pipe(
      v.string(),
      safeDefine.setComponent('radioGroup', (actions) => {
        return [actions.inputs.patch({ options: ['l1', 'l2'] })];
      }),
    ),
  }),
  actions.wrappers.patch(['div']),
  actions.class.top('ionic-page'),
  // actions.providers.patch([]),
);
