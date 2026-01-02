import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInput, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';

describe('checkbox', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('checkbox'));
  const prefix = 'pc-checkbox';

  testHello(prefix, BaseDefine);
  testClassInput('color', 'neutral', prefix, BaseDefine);
  testClassInput('size', 'xs', prefix, BaseDefine);

  it(`input-indeterminate`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ indeterminate: true }));
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    expect(element.querySelector('input')!.indeterminate).toBeTrue();
  });
});
