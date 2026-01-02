import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { testClassInput } from './util/helper';
describe('divider', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('divider'));
  const prefix = 'pc-divider';
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });

  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('direction', 'horizontal', prefix, BaseDefine);
  testClassInput('contentPosition', 'start', prefix, BaseDefine);

  it('input-content', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, 'input1');
  });
});
