import { signal } from '@angular/core';

import * as v from 'valibot';
import { setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('navbar', () => {
  const BaseDefine = v.pipe(
    v.object({
      start: v.pipe(v.object({}), v.title('k1-title')),
      center: v.pipe(v.object({}), v.title('k2-title')),
      end: v.pipe(v.object({}), v.title('k3-title')),
      other: v.pipe(v.string(), v.title('other-title')),
    }),
    setComponent('navbar'),
  );
  const prefix = 'pc-navbar';

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    expect(element.querySelector(`.${prefix}-start`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-center`)).toBeTruthy();
    expect(element.querySelector(`.${prefix}-end`)).toBeTruthy();
    expect(element.querySelector(`input`)).toBeTruthy();
  });
});
