import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
describe('breadcrumbs', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('breadcrumbs'));
  const prefix = 'pc-breadcrumbs';
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });

  it('input-options-label', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ options: [{ label: 'input1' }] }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
  });
  it('input-options-link', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ options: [{ label: 'input1', url: '/path/to' }] }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} a span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
    expect(element.querySelector('a')!.href).toContain('/path/to');
  });
  it('input-options-extraLink', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        options: [{ label: 'input1', url: 'http://a.b.c', extraLink: true }],
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} a span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
    expect(element.querySelector('a')!.href.startsWith('http://a.b.c')).toBeTrue();
  });
  it('input-optionClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ options: [{ label: 'input1' }], optionClass: 'test1' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} .test1`);
  });
});
