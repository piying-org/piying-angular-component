import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

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
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
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
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        contentClass: 'content1',
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.content1`)).toBeTruthy();
  });
  it('input-sideClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        sideClass: 'side1',
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.side1`)).toBeTruthy();
  });
  it('input-overlayClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        overlayClass: 'overlay1',
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.overlay1`)).toBeTruthy();
  });
  it('input-opened/mode', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        mode: 'side',
        opened: true,
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    expect(element.querySelector(`.${prefix}-open`)).toBeTruthy();
  });
});
