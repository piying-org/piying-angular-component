import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('range', () => {
  const BaseDefine = v.pipe(v.number(), setComponent('range'));
  const prefix = 'pc-range';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);

  it(`input-min/max/step`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ min: 2, max: 10, step: 1 }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(3),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('input')!.min).toEqual('2')
    expect(element.querySelector('input')!.max).toEqual('10')
    expect(element.querySelector('input')!.step).toEqual('1')
    expect(element.querySelector('input')!.value).toEqual('3')
  });
});
