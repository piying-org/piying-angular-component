import { signal } from '@angular/core';

import * as v from 'valibot';
import { setComponent } from '@piying/view-angular-core';
import { testClassInput } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('carousel', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('carousel'),
  );
  const prefix = 'pc-carousel';

  testClassInput('direction', 'horizontal', prefix, BaseDefine);
  testClassInput('scrollAlign', 'start', prefix, BaseDefine);
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    const list = element.querySelectorAll(`.${prefix}-item`);
    expect(list.length).toEqual(2);
  });
});
