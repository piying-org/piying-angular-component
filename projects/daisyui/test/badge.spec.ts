import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
describe('badge', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('badge'));
  const prefix = 'pc-badge';
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
  it('input-style', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ style: 'outline' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-outline`);
  });
  it('input-color', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ color: 'neutral' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-neutral`);
  });
  it('input-size', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ size: 'xs' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-xs`);
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
