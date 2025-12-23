import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
describe('avatar', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('avatar'));
  const prefix = 'pc-avatar';
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
  it('input-placeholder', async () => {
    let schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ placeholder: 'input1', placeholderClass: 'test1' }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} span`);
    assertElementContent(element, `.${prefix} span.test1`, 'input1');
  });
  it('input-imgUrl', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ imgUrl: 'htpp://a.b.com' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} img`);
  });
  it('input-wrapperClass', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ wrapperClass: 'test1', }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix} .test1`);
  });
  it('input-status', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ status: 'online' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-online`);
  });
});
