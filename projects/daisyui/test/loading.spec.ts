import * as v from 'valibot';
import { NFCSchema, setComponent } from '@piying/view-angular-core';
import { testClassInput, testHello } from './util/helper';
describe('loading', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('loading'));
  const prefix = 'pc-loading';

  testHello(prefix, BaseDefine);
  testClassInput('type', 'spinner', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
});
