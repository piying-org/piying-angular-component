import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementExist, assertElementSelector } from './util/element';
import { testClassInput, testHello } from './util/helper';
describe('progress', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('progress'));
  const prefix = 'pc-progress';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  it(`input-value`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ value: 10 }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}[value="10"]`);
  });
  it(`input-max`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ max: 99 }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}[max="99"]`);
  });
});
