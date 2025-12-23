import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('carousel', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('carousel'),
  );
  const prefix = 'pc-carousel';

  testClassInput('direction', 'horizontal', prefix, BaseDefine);
  testClassInput('scrollAlign', 'start', prefix, BaseDefine);
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    let list = element.querySelectorAll(`.${prefix}-item`);
    expect(list.length).toEqual(2);
  });
});
