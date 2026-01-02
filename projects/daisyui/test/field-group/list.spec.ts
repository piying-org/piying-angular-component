import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

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
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    const list = element.querySelectorAll(`li.${prefix}-row`);
    expect(list.length).toEqual(2);
  });
  it('input-title/titleClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ titleClass: 'title2' }),
      v.title('title1'),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    const result = element.querySelector(`li.title2`);
    expect(result).toBeTruthy();
    expect(result?.textContent.trim()).toEqual('title1');
  });
});
