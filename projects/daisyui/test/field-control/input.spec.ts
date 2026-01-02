import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('input', () => {
  const BaseDefine = v.pipe(v.string(), setComponent('input'));
  const prefix = 'pc-input';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);
  it(`input-type`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ type: 'number' }));
    const { element } = await createSchemaComponent(signal(schema), signal(123), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}[type="number"]`);
    expect(element.querySelector('input')!.value).toEqual('123');
  });
});
