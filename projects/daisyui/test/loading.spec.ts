import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput, testHello } from './util/helper';
describe('loading', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('loading'));
  const prefix = 'pc-loading';

  testHello(prefix, BaseDefine);
  testClassInput('type', 'spinner', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
});
