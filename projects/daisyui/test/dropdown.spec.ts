import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
describe('dropdown', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('dropdown'));
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown');
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-hover', true);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-start', true);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-top', true);
  });
  it('input-title', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ title: 'input1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown div', 'input1');
  });
  it('input-titleClass', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ title: 'input1', titleClass: 'abc' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown .abc', 'input1');
  });
  it('input-content', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input2' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown div+div', 'input2');
  });
  it('input-contentClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ content: 'input2', contentClass: 'bcd' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown .bcd', 'input2');
  });
  it('input-align', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ align: 'start' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-start');
  });
  it('input-position', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ position: 'top' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-top');
  });
  it('input-triggerAction', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ triggerAction: 'hover' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-hover');
  });
});
