import * as v from 'valibot';
import { actions } from '@piying/view-angular-core';
import { signal } from '@angular/core';
import { assertElementContent, assertElementExist, assertElementSelector } from './element';
import { createSchemaComponent, Schema2 } from './create-component';

export function testHello(prefix: string, Schema: Schema2) {
  it('hello', async () => {
    const schema = v.pipe(Schema);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}`);
  });
}
export function testClassInput(key: string, value: string, prefix: string, Schema: Schema2) {
  it(`input-${key}`, async () => {
    const schema = v.pipe(Schema, actions.inputs.patch({ [key]: value }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-${value}`);
  });
}
export function testClassInputBoolean(key: string, value: string, prefix: string, Schema: Schema2) {
  it(`input-${key}`, async () => {
    const schema = v.pipe(Schema, actions.inputs.patch({ [key]: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, `.${prefix}.${prefix}-${value}`);
  });
}
export function testContentInput(value: string, prefix: string, Schema: Schema2) {
  it('input-content', async () => {
    const schema = v.pipe(Schema, actions.inputs.patch({ content: value }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, `.${prefix}`, value);
  });
}
