import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('textarea', () => {
  const BaseDefine = v.pipe(v.string(), setComponent('textarea'));
  const prefix = 'pc-textarea';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);
  it(`model`, async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({}));
    let { element } = await createSchemaComponent(signal(schema), signal('123'), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    expect(element.querySelector('textarea')!.value).toEqual('123');
  });
});
