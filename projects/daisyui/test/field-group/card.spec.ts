import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist, assertElementSelector } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { uniq } from 'es-toolkit';

describe('card', () => {
  const BaseDefine = v.pipe(
    v.object({
      figure: v.string(),
      title: v.string(),
      k2: v.pipe(v.object({}), v.title('k2-title')),
      actions: v.object({
        __btn: v.pipe(NFCSchema, setComponent('button')),
      }),
    }),
    setComponent('card'),
  );
  const prefix = 'pc-card';

  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    assertElementSelector(element, `.${prefix}-body`);
    assertElementSelector(element, `.${prefix}-title`);
    assertElementSelector(element, `.${prefix}-actions`);
    assertElementSelector(element, `figure`);
    expect(
      uniq([...element.querySelectorAll('input').values()].map((item) => item.name)).length,
    ).toEqual(1);
  });
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInput('border', 'dash', prefix, BaseDefine);
  it('hello', async () => {
    let schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        bodyClass: 'body1',
        figureClass: 'figure1',
        actionsClass: 'actions1',
      }),
    );
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.body1`);
    assertElementSelector(element, `.figure1`);
    assertElementSelector(element, `.actions1`);
  });
});
