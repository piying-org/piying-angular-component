import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('rating', () => {
  const BaseDefine = v.pipe(v.number(), setComponent('rating'));
  const prefix = 'pc-rating';

  testHello(prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);

  it(`input-min/max`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ min: 2, max: 5 }));
    let { element, fixture } = await createSchemaComponent(signal(schema), signal(3), undefined, {
      teardown: { destroyAfterEach: false },
    });
    let list = element.querySelectorAll('input');
    expect(list.length).toEqual(4);
    expect(list[0].classList.contains(`${prefix}-hidden`)).toBeTrue();
  });
  it(`input-half`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ min: 2, max: 5, half: true }));
    let { element, fixture } = await createSchemaComponent(signal(schema), signal(3), undefined, {
      teardown: { destroyAfterEach: false },
    });
    let list = element.querySelectorAll('input');
    expect(list.length).toEqual(7);
  });
});
