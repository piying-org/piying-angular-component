import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput } from './util/helper';
describe('kbd', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('kbd'));
  const prefix = 'pc-kbd';
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
  testClassInput('size', 'xs', prefix, BaseDefine);
  testContentInput('input1', prefix, BaseDefine);

});
