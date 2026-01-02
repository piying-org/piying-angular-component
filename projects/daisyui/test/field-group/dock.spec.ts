import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('dock', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('dock'),
  );
  const prefix = 'pc-dock';

  testClassInput('size', 'xs', prefix, BaseDefine);
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    const list = element.querySelectorAll(`button`);
    expect(list.length).toEqual(2);
    expect(list[0].classList.contains(`${prefix}-active`)).toBeTrue();
  });
  it('input-activatedIndex', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ activatedIndex: 1 }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    const list = element.querySelectorAll(`button`);
    expect(list.length).toEqual(2);
    expect(list[1].classList.contains(`${prefix}-active`)).toBeTrue();
  });
});
