import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';
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
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
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
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ collapseIcon: 'arrow' }));
    const { element, fixture } = await createSchemaComponent(
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
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ joinChild: false }));
    const { element, fixture } = await createSchemaComponent(
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
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ childClass: 'child1' }));
    const { element, fixture } = await createSchemaComponent(
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
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ multi: true }));
    const { element, fixture } = await createSchemaComponent(
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
