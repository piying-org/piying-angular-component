import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput, testHello } from './util/helper';
describe('progress', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('progress'));
  const prefix = 'pc-progress';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  it(`input-value`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ value: 10 }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}[value="10"]`);
  });
  it(`input-max`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ max: 99 }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}[max="99"]`);
  });
});
