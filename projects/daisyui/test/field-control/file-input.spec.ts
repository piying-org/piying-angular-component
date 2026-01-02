import * as v from 'valibot';
import { setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';

describe('file-input', () => {
  const BaseDefine = v.pipe(v.any(), setComponent('file-input'));
  const prefix = 'pc-file-input';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);
});
