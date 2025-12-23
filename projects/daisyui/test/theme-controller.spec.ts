import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daisyui } from './daisyui';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist, assertElementSelector } from './util/element';
import { htmlInput } from './util/action';
import { testClassInput, testContentInput, testHello } from './util/helper';
describe('theme-controller', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('theme-controller'));
  const prefix = 'pc-theme-controller';
  testHello(prefix, BaseDefine);
});
