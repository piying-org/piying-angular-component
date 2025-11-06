import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
describe('Button', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('button'));

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn');
    assertElementSelector(element, '.pc-btn .pc-loading', true);
    assertElementContent(element, 'button', 'Default');
  });
  it('input-color', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ color: 'primary' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-primary');
  });
  it('input-style', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ style: 'outline' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-outline');
  });
  it('input-size', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ size: 'xs' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-xs');
  });
  it('input-active', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ active: true }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-active');
  });
  it('input-shape', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ shape: 'wide' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, 'button.pc-btn-wide');
  });
  it('input-content', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ content: 'input1' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, 'button', 'input1');
  });
  it('input-loading', async () => {
    let p = Promise.withResolvers<void>();
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        clicked: () => {
          return p.promise;
        },
      }),
    );
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    htmlInput(element, 'button');
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading');
    p.resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
  });
  it('input-loading-disable', async () => {
    let p = Promise.withResolvers<void>();
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        clicked: () => {
          return p.promise;
        },
        disableLoadingIcon: true,
      }),
    );
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    htmlInput(element, 'button');
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
    p.resolve();
    await fixture.whenStable();
    fixture.detectChanges();
    assertElementSelector(element, '.pc-btn .pc-loading', true);
  });
});
