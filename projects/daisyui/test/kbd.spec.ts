import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, setComponent } from '@piying/view-angular-core';
import { assertElementExist, assertElementSelector } from './util/element';
import { testClassInput, testContentInput } from './util/helper';
describe('kbd', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('kbd'));
  const prefix = 'pc-kbd';
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
  testClassInput('size', 'xs', prefix, BaseDefine);
  testContentInput('input1', prefix, BaseDefine);
});
