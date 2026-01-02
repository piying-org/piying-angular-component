import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';

describe('rating', () => {
  const BaseDefine = v.pipe(v.number(), setComponent('rating'));
  const prefix = 'pc-rating';

  testHello(prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);

  it(`input-min/max`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ min: 2, max: 5 }));
    const { element, fixture } = await createSchemaComponent(signal(schema), signal(3), undefined, {
      teardown: { destroyAfterEach: false },
    });
    const list = element.querySelectorAll('input');
    expect(list.length).toEqual(4);
    expect(list[0].classList.contains(`${prefix}-hidden`)).toBeTrue();
  });
  it(`input-half`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ min: 2, max: 5, half: true }));
    const { element, fixture } = await createSchemaComponent(signal(schema), signal(3), undefined, {
      teardown: { destroyAfterEach: false },
    });
    const list = element.querySelectorAll('input');
    expect(list.length).toEqual(7);
  });
});
