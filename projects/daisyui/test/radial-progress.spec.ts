import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import { assertElementContent, assertElementExist } from './util/element';
import { testHello } from './util/helper';
describe('radial-progress', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('radial-progress'));
  const prefix = 'pc-radial-progress';

  testHello(prefix, BaseDefine);
  // testClassInput('color', 'neutral', prefix, BaseDefine);
  it(`input-value`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ value: 0.1 }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, '10%');
    const el = element.querySelector(`.${prefix}`)! as HTMLElement;
    expect(getComputedStyle(el).getPropertyValue('--pc-value')).toEqual('10');
  });
  it(`input-strokeWidth`, async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ strokeWidth: '6px' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    const el = element.querySelector(`.${prefix}`)! as HTMLElement;
    expect(getComputedStyle(el).getPropertyValue('--pc-thickness')).toEqual('6px');
  });
  it(`input-valueMap`, async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        valueMap: () => {
          return '123';
        },
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, '123');
  });
});
