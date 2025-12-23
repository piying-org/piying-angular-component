import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('checkbox', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('checkbox'));
  const prefix = 'pc-checkbox';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);

  it(`input-indeterminate`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ indeterminate: true }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('input')!.indeterminate).toBeTrue();
  });

});
