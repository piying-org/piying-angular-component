import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
describe('alert', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('alert'));
  const prefix = 'pc-alert';
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
  it('input-style', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ style: 'outline' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-outline`);
  });
  it('input-color', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ color: 'info' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-info`);
  });
  it('input-direction', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ direction: 'vertical' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-vertical`);
  });
  it('input-content', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, 'input1');
  });
});
