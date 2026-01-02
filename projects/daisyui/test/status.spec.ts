import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { testClassInput } from './util/helper';
describe('status', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('status'));
  const prefix = 'pc-status';

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `div .${prefix}`);
  });
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  it('input-content', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `div`, 'input1');
  });
  it(`input-animatePing`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ animatePing: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    assertElementSelector(element, `div .pc-animate-ping`);
    assertElementSelector(element, `div .${prefix}`);
  });
  it(`input-animateBounce`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ animateBounce: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    assertElementSelector(element, `div .pc-animate-bounce`);
    assertElementSelector(element, `div .${prefix}`);
  });
});
