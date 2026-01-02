import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('textarea', () => {
  const BaseDefine = v.pipe(v.string(), setComponent('textarea'));
  const prefix = 'pc-textarea';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);
  it(`model`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({}));
    const { element } = await createSchemaComponent(signal(schema), signal('123'), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    expect(element.querySelector('textarea')!.value).toEqual('123');
  });
});
