import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput, testHello } from './util/helper';
describe('status', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('status'));
  const prefix = 'pc-status';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `div .${prefix}`);
  });
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  it('input-content', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ content: 'input1' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `div`, 'input1');
  });
  it(`input-animatePing`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ animatePing: true }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    assertElementSelector(element, `div .pc-animate-ping`);
    assertElementSelector(element, `div .${prefix}`);
  });
  it(`input-animateBounce`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ animateBounce: true }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    assertElementSelector(element, `div .pc-animate-bounce`);
    assertElementSelector(element, `div .${prefix}`);
  });
});
