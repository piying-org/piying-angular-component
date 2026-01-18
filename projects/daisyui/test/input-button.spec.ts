import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, NFCSchema, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from './util/create-component';
import { assertElementExist, assertElementSelector } from './util/element';

fdescribe('input-button', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('input-button'));
  const prefix = 'pc-btn';

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn');
    assertElementSelector(element, '.pc-btn .pc-loading', true);
  });
  it('input-color', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ color: 'primary' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn-primary');
  });
  it('input-style', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ style: 'outline' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn-outline');
  });
  it('input-size', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ size: 'xs' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn-xs');
  });
  it('input-active', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ active: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn-active');
  });
  it('input-shape', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ shape: 'wide' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'input.pc-btn-wide');
  });
});
