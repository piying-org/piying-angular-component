import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('accordion', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('accordion'),
  );
  const prefix = 'pc-accordion';
  const prefix2 = 'pc-collapse';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix2}`);
    assertElementSelector(element, `.pc-join`);
    expect(
      uniq([...element.querySelectorAll('input').values()].map((item) => item.name)).length,
    ).toEqual(1);
    [...element.querySelectorAll('.pc-collapse-title').values()].forEach((item, i) => {
      expect(item.textContent.trim()).toEqual(`k${i + 1}-title`);
    });
  });
  it(`input-collapseIcon`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ collapseIcon: 'arrow' }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector(`.${prefix2}-arrow`)!).toBeTruthy();
  });
  it(`input-joinChild`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ joinChild: false }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementSelector(element, `.pc-join`, true);
  });
  it(`input-childClass`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ childClass: 'child1' }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementSelector(element, `.child1`);
  });
  it(`input-multi`, async () => {
    let schema = v.pipe(BaseDefine, patchInputs({ multi: true }));
    let { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(
      uniq([...element.querySelectorAll('input').values()].map((item) => item.name)).length,
    ).toBeGreaterThan(1);

    // assertElementSelector(element, `.child1`);
  });
});
