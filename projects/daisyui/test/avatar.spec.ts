import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
describe('avatar', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('avatar'));
  const prefix = 'pc-avatar';
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
  it('input-placeholder', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ placeholder: 'input1', placeholderClass: 'test1' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} span`);
    assertElementContent(element, `.${prefix} span.test1`, 'input1');
  });
  it('input-imgUrl', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ imgUrl: 'http://a.b.com' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} img`);
  });
  it('input-wrapperClass', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ wrapperClass: 'test1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} .test1`);
  });
  it('input-status', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ status: 'online' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-online`);
  });
});
