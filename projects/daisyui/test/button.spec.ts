import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlClick } from './util/action';
describe('Button', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('button'));

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn');
    assertElementSelector(element, '.pc-btn .pc-loading', true);
    assertElementContent(element, 'button', 'Default');
  });
  it('input-color', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ color: 'primary' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-primary');
  });
  it('input-style', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ style: 'outline' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-outline');
  });
  it('input-size', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ size: 'xs' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-xs');
  });
  it('input-active', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ active: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-active');
  });
  it('input-shape', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ shape: 'wide' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-wide');
  });
  it('input-content', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input1' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, 'button', 'input1');
  });
  it('input-loading', async () => {
    const p = Promise.withResolvers<void>();
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        clicked: () => {
          return p.promise;
        },
      }),
    );
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    htmlClick(element, 'button');
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading');
    p.resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
  });
  it('input-loading-disable', async () => {
    const p = Promise.withResolvers<void>();
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        clicked: () => {
          return p.promise;
        },
        disableLoadingIcon: true,
      }),
    );
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    htmlClick(element, 'button');
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
    p.resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
  });
});
