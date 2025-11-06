import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('select', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('select'));
  const prefix = 'pc-select';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);

  it(`input-native`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ native: true }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('select')!.classList.contains('pc-:appearance-none')).toBeTrue();
  });
  it(`input-options`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ options: [1, 2, 3] }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelectorAll('option').length).toEqual(4);
  });
  it(`input-multiple`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ multiple: true, options: [1, 2, 3] }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('select')!.multiple).toEqual(true);
  });
});
