import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('drawer', () => {
  const BaseDefine = v.pipe(
    v.object({
      content: v.pipe(v.object({}), v.title('k1-title')),
      side: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('drawer'),
  );
  const prefix = 'pc-drawer';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    expect(element.querySelector(`.${prefix}-content`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-side`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-overlay`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-toggle`)).toBeTruthy();
  });
  it('input-contentClass', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        contentClass: 'content1',
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.content1`)).toBeTruthy();
  });
  it('input-sideClass', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        sideClass: 'side1',
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.side1`)).toBeTruthy();
  });
  it('input-overlayClass', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        overlayClass: 'overlay1',
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.overlay1`)).toBeTruthy();
  });
  it('input-opened/mode', async () => {
    let schema = v.pipe(
      BaseDefine,
      patchInputs({
        mode: 'side',
        opened: true,
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.${prefix}-open`)).toBeTruthy();
  });
});
