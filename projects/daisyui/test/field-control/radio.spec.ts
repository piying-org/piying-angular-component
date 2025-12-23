import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';

describe('radio', () => {
  const BaseDefine = v.pipe(v.number(), setComponent('radio'));
  const prefix = 'pc-radio';

  it(`input`, async () => {
    let schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ options: [1, 2, 3], color: 'neutral', size: 'xs' }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(1), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    let list = element.querySelectorAll('input');
    expect(list.length).toEqual(3);
    for (const item of [...list]) {
      expect(item.classList.contains(`${prefix}`)).toBeTrue();
      expect(item.classList.contains(`${prefix}-neutral`)).toBeTrue();
      expect(item.classList.contains(`${prefix}-xs`)).toBeTrue();
    }
  });
  it(`input-options-description`, async () => {
    let schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        options: [
          { label: 'v1', value: 1, description: 'd1' },
          { label: 'v2', value: 2, description: 'd2' },
        ],
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(1), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    let list = element.querySelectorAll('span');
    for (const item of [...list]) {
      expect(item.querySelector('input')!.classList.contains(`${prefix}`)).toBeTrue();
      expect(item.querySelector('label')).toBeTruthy();
    }
  });
});
