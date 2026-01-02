import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('steps', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('steps'),
  );
  const prefix = 'pc-steps';

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    const list = element.querySelectorAll(`li.pc-step`);
    expect(list.length).toEqual(2);
  });
  testClassInput('direction', 'vertical', prefix, BaseDefine);
  it('input-stepColor', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ stepColor: 'success' }),
      v.title('title1'),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    const result = element.querySelector(`li.pc-step-success`);
    expect(result).toBeTruthy();
  });
});
