import * as v from 'valibot';
import { NFCSchema, setComponent } from '@piying/view-angular-core';
import { testHello } from './util/helper';
describe('theme-controller', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('theme-controller'));
  const prefix = 'pc-theme-controller';
  testHello(prefix, BaseDefine);
});
