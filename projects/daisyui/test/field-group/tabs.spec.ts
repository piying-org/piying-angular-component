import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';

describe('tabs', () => {
  const BaseDefine = v.pipe(
    v.object({
      k1: v.pipe(v.object({}), v.title('k1-title')),
      k2: v.pipe(v.object({}), v.title('k2-title')),
    }),
    setComponent('tabs'),
  );
  const prefix = 'pc-tabs';

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
    const list = element.querySelectorAll(`.pc-tab`);
    expect(list.length).toEqual(2);
    const list2 = element.querySelectorAll(`.pc-tab-content`);
    expect(list2.length).toEqual(2);
    const list3 = element.querySelectorAll(`.pc-tab`);
    expect(list3[0].textContent.trim()).toEqual('k1-title');
  });
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInput('type', 'box', prefix, BaseDefine);
  testClassInput('placement', 'top', prefix, BaseDefine);
  it('tabContentClass', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ tabContentClass: 'content1' }),
      v.title('title1'),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    const result = element.querySelector(`.content1`);
    expect(result).toBeTruthy();
  });
  it('input-activatedIndex', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ activatedIndex: 1 }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });

    const list = element.querySelectorAll(`label`);
    expect(list.length).toEqual(2);
    expect(list[1].classList.contains(`pc-tab-active`)).toBeTrue();
  });
});
