import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';

describe('select', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('select'));
  const prefix = 'pc-select';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);
  testClassInputBoolean('ghost', 'ghost', prefix, BaseDefine);

  it(`input-native`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ native: true }));
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('select')!.classList.contains('pc-:appearance-none')).toBeTrue();
  });
  it(`input-options`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ options: [1, 2, 3] }));
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelectorAll('option').length).toEqual(4);
  });
  it(`input-multiple`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ multiple: true, options: [1, 2, 3] }));
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('select')!.multiple).toEqual(true);
  });
});
