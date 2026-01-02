import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist } from '../util/element';

describe('radio', () => {
  const BaseDefine = v.pipe(v.number(), setComponent('radio'));
  const prefix = 'pc-radio';

  it(`input`, async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ options: [1, 2, 3], color: 'neutral', size: 'xs' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(1), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    const list = element.querySelectorAll('input');
    expect(list.length).toEqual(3);
    for (const item of [...list]) {
      expect(item.classList.contains(`${prefix}`)).toBeTrue();
      expect(item.classList.contains(`${prefix}-neutral`)).toBeTrue();
      expect(item.classList.contains(`${prefix}-xs`)).toBeTrue();
    }
  });
  it(`input-options-description`, async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        options: [
          { label: 'v1', value: 1, description: 'd1' },
          { label: 'v2', value: 2, description: 'd2' },
        ],
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(1), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);

    const list = element.querySelectorAll('span');
    for (const item of [...list]) {
      expect(item.querySelector('input')!.classList.contains(`${prefix}`)).toBeTrue();
      expect(item.querySelector('label')).toBeTruthy();
    }
  });
});
