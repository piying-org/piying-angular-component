import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
describe('breadcrumbs', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('breadcrumbs'));
  const prefix = 'pc-breadcrumbs';
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });

  it('input-options-label', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ options: [{ label: 'input1' }] }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
  });
  it('input-options-link', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({ options: [{ label: 'input1', url: '/path/to' }] }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} a span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
    expect(element.querySelector('a')!.href).toContain('/path/to');
  });
  it('input-options-extraLink', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({ options: [{ label: 'input1', url: 'http://a.b.c', extraLink: true }] }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} a span`);
    assertElementContent(element, `.${prefix} span`, 'input1');
    expect(element.querySelector('a')!.href.startsWith('http://a.b.c')).toBeTrue();
  });
  it('input-optionClass', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({ options: [{ label: 'input1' }], optionClass: 'test1' }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} .test1`);
  });
});
