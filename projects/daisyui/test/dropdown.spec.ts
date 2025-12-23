import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
describe('dropdown', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('dropdown'));
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown');
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-hover', true);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-start', true);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-top', true);
  });
  it('input-title', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ title: 'input1' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown div', 'input1');
  });
  it('input-titleClass', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ title: 'input1', titleClass: 'abc' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown .abc', 'input1');
  });
  it('input-content', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input2' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown div+div', 'input2');
  });
  it('input-contentClass', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input2', contentClass: 'bcd' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-dropdown .bcd', 'input2');
  });
  it('input-align', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ align: 'start' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-start');
  });
  it('input-position', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ position: 'top' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-top');
  });
  it('input-triggerAction', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ triggerAction: 'hover' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-dropdown.pc-dropdown-hover');
  });
});
