import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('swap', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('swap'));
  const prefix = 'pc-swap';

  testHello(prefix, BaseDefine);
  it(`input-onContent/offContent`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ onContent: 'y', offContent: 'x' }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(true),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementContent(element, `.${prefix} .${prefix}-on`, 'y');
    assertElementContent(element, `.${prefix} .${prefix}-off`, 'x');
    expect(element.querySelector('input')!.checked).toBeTrue();
    fixture.detectChanges();
    await fixture.whenStable();
    htmlInput(element, 'input');
    expect(element.querySelector('input')!.checked).toBeFalse();
  });
  it(`input-indeterminate/indeterminateContent`, async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({ indeterminate: true, indeterminateContent: '-' }),
    );
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementContent(element, `.${prefix} .${prefix}-indeterminate`, '-');
    expect(element.querySelector('input')!.indeterminate).toBeTrue();
  });
  testClassInputBoolean('rotate', `rotate`, prefix, BaseDefine);
  testClassInputBoolean('flip', `flip`, prefix, BaseDefine);
});
