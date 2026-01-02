import { signal } from '@angular/core';
import { createSchemaComponent } from './util/create-component';
import * as v from 'valibot';
import { NFCSchema, actions, setComponent } from '@piying/view-angular-core';
import {
  assertElementContent,
  assertElementExist,
  assertElementSelector,
  checkElementVisibile,
} from './util/element';
import { htmlFocus, htmlInput2 } from './util/action';
describe('fab', () => {
  const BaseDefine = v.pipe(NFCSchema, setComponent('fab'));

  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementSelector(element, '.pc-fab');
    assertElementSelector(element, '.pc-fab .pc-btn-primary');
    assertElementSelector(element, '.pc-fab.pc-fab-flower', true);
    assertElementContent(element, '.pc-fab .pc-btn', 'D');
  });
  it('input-flower', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ flower: true }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementSelector(element, '.pc-fab.pc-fab-flower');
  });
  it('input-common', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ commonClass: 'common' }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementSelector(element, '.pc-fab .common');
  });
  it('input-defaultIcon', async () => {
    const schema = v.pipe(BaseDefine, actions.inputs.patch({ defaultIcon: { label: 'input1' } }));
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    assertElementContent(element, '.pc-fab .pc-btn', 'input1');
  });
  it('input-closeIcon', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        closeIcon: { label: 'G' },
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementContent(element, '.pc-fab .pc-fab-close span', 'G');
  });
  it('input-mainIcon', async () => {
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        mainIcon: { label: 'J' },
      }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementContent(element, '.pc-fab .pc-fab-main-action button', 'J');
  });
  it('input-options', async () => {
    let value = 0;
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        options: [
          {
            label: 'run1',
            class: 'test1',
            clicked: (event: any) => {
              value = 1;
            },
          },
        ],
      }),
    );
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    assertElementSelector(element, '.pc-fab .test1');
    const btn = element.querySelector('.pc-fab .test1')! as HTMLElement;
    checkElementVisibile(btn, true);
    const defEl = element.querySelector('.pc-fab [tabindex="0"]');
    htmlFocus(defEl);
    expect(document.activeElement).toBe(defEl);
    // todo focus状态貌似必须处于浏览器激活才会附加
    htmlInput2(btn);
    expect(document.activeElement).toBe(document.body);
    expect(value).toBe(1);
  });
  it('input-autoClose', async () => {
    let value = 0;
    const schema = v.pipe(
      BaseDefine,
      actions.inputs.patch({
        autoClose: false,
        options: [
          {
            label: 'run1',
            class: 'test1',
            clicked: (event: any) => {
              value = 1;
            },
          },
        ],
      }),
    );
    const { element, fixture } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    assertElementSelector(element, '.pc-fab .test1');
    const btn = element.querySelector('.pc-fab .test1')! as HTMLElement;
    checkElementVisibile(btn, true);
    const defEl = element.querySelector('.pc-fab [tabindex="0"]');
    htmlFocus(defEl);
    expect(document.activeElement).toBe(defEl);
    // todo focus状态貌似必须处于浏览器激活才会附加
    htmlFocus(btn);
    expect(document.activeElement).not.toBe(document.body);
    expect(value).toBe(1);
  });
});
