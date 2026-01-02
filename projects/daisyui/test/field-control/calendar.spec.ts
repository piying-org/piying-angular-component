import { signal } from '@angular/core';

import * as v from 'valibot';
import { actions, setComponent } from '@piying/view-angular-core';
import { createSchemaComponent } from '../util/create-component';
import { assertElementExist } from '../util/element';
import { range } from 'es-toolkit';

describe('calendar', () => {
  const BaseDefine = v.pipe(v.date(), setComponent('calendar'));
  it('hello', async () => {
    const schema = v.pipe(BaseDefine);
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-date.pc-cally')).toBeTruthy();
  });
  it('multi', async () => {
    const schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      actions.inputs.patch({ type: 'multi' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-multi.pc-cally')).toBeTruthy();
  });
  it('multi-inputvalue', async () => {
    const schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      actions.inputs.patch({ type: 'multi' }),
    );
    const list = range(-15, 15).map((i) => {
      const a = new Date();
      a.setDate(a.getDate() + i);
      return a;
    });
    const { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-multi.pc-cally')).toBeTruthy();
    const monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
  });
  it('range', async () => {
    const schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      actions.inputs.patch({ type: 'range' }),
    );
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
  });
  it('range-inputValue', async () => {
    const schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      actions.inputs.patch({ type: 'range' }),
    );
    const list = range(2).map((i) => {
      const a = new Date();
      a.setDate(a.getDate() + (i ? 15 : -15));
      return a;
    });

    const { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
    const monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
    expect(monthEl?.shadowRoot?.querySelector('[part~=range-start]')).toBeTruthy();
  });
  it('range-month2', async () => {
    const schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      actions.inputs.patch({ type: 'range', monthProps: 2 }),
    );
    const list = range(2).map((i) => {
      const a = new Date();
      a.setDate(a.getDate() + (i ? 30 : -30));
      return a;
    });

    const { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
    const monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
    expect(monthEl?.shadowRoot?.querySelector('[part~=range-start]')).toBeTruthy();
    expect(element?.querySelectorAll('calendar-month').length).toBe(2);
  });
});
