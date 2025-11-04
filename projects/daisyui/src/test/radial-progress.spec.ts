import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput, testHello } from './util/helper';
describe('radial-progress', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('radial-progress'));
  const prefix = 'pc-radial-progress';

  testHello(prefix, BaseDefine);
  // testClassInput('color', 'neutral', prefix, BaseDefine);
  it(`input-value`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ value: 0.1 }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, '10%');
    let el = element.querySelector(`.${prefix}`)! as HTMLElement;
    expect(getComputedStyle(el).getPropertyValue('--pc-value')).toEqual('10');
  });
  it(`input-strokeWidth`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ strokeWidth: '6px' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    let el = element.querySelector(`.${prefix}`)! as HTMLElement;
    expect(getComputedStyle(el).getPropertyValue('--pc-thickness')).toEqual('6px');
  });
  it(`input-valueMap`, async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        valueMap: () => {
          return '123';
        },
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, '123');
  });
});
