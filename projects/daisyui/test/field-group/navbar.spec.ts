import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('navbar', () => {
  const BaseDefine = v.pipe(
    v.object({
      start: v.pipe(v.object({}), v.title('k1-title')),
      center: v.pipe(v.object({}), v.title('k2-title')),
      end: v.pipe(v.object({}), v.title('k3-title')),
      other: v.pipe(v.string(), v.title('other-title')),
    }),
    setComponent('navbar'),
  );
  const prefix = 'pc-navbar';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    expect(element.querySelector(`.${prefix}-start`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-center`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-end`)).toBeTruthy();
    expect(element.querySelector(`input`)).toBeTruthy();
  });
});
