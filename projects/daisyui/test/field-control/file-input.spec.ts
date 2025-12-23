import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('file-input', () => {
  const BaseDefine = v.pipe(v.any(), setComponent('file-input'));
  const prefix = 'pc-file-input';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);
});
