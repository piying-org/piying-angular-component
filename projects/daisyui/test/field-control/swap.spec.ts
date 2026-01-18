import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent } from '../util/element';
import { htmlClick } from '../util/action';

describe('swap', () => {
  const BaseDefine = v.pipe(v.boolean(), setComponent('swap'));
  const prefix = 'pc-swap';

  testHello(prefix, BaseDefine);
  it(`input-onContent/offContent`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ onContent: 'y', offContent: 'x' }));
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(true),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementContent(element, `.${prefix} .${prefix}-on`, 'y');
    assertElementContent(element, `.${prefix} .${prefix}-off`, 'x');
    expect(element.querySelector('input')!.checked).toBeTrue();
    fixture.detectChanges();
    await fixture.whenStable();
    htmlClick(element, 'input');
    expect(element.querySelector('input')!.checked).toBeFalse();
  });
  it(`input-indeterminate/indeterminateContent`, async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({ indeterminate: true, indeterminateContent: '-' }),
    );
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementContent(element, `.${prefix} .${prefix}-indeterminate`, '-');
    expect(element.querySelector('input')!.indeterminate).toBeTrue();
  });
  testClassInputBoolean('rotate', `rotate`, prefix, BaseDefine);
  testClassInputBoolean('flip', `flip`, prefix, BaseDefine);
});
