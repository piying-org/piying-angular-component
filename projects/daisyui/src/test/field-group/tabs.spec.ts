import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('tabs', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('tabs'),
  );
  const prefix = 'pc-tabs';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    let list = element.querySelectorAll(`.pc-tab`);
    expect(list.length).toEqual(2);
    let list2 = element.querySelectorAll(`.pc-tab-content`);
    expect(list2.length).toEqual(2);
    let list3 = element.querySelectorAll(`.pc-tab-label`);

    expect(list3[0].textContent.trim()).toEqual('k1-title');
  });
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInput('type', 'box', prefix, BaseDefine);
  testClassInput('placement', 'top', prefix, BaseDefine);
  it('tabContentClass', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({ tabContentClass: 'content1' }),
      v.title('title1'),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    let result = element.querySelector(`.content1`);
    expect(result).toBeTruthy();
  });
  it('input-activatedIndex', async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ activatedIndex: 1 }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    let list = element.querySelectorAll(`label`);
    expect(list.length).toEqual(2);
    expect(list[1].classList.contains(`pc-tab-active`)).toBeTrue();
  });
});
