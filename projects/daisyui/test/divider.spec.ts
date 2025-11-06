import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput } from './util/helper';
describe('divider', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('divider'));
  const prefix = 'pc-divider';
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });

  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('direction', 'horizontal', prefix, BaseDefine);
  testClassInput('contentPosition', 'start', prefix, BaseDefine);

  it('input-content', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ content: 'input1' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, 'input1');
  });
});
