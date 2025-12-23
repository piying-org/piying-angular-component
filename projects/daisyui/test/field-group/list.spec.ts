import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('list', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('list'),
  );
  const prefix = 'pc-list';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    let list = element.querySelectorAll(`li.${prefix}-row`);
    expect(list.length).toEqual(2);
  });
  it('input-title/titleClass', async () => {
    let schema = v.pipe(BaseDefine, actions.inputs.patch({ titleClass: 'title2' }), v.title('title1'));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    let result = element.querySelector(`li.title2`);
    expect(result).toBeTruthy();
    expect(result?.textContent.trim()).toEqual('title1');
  });
});
