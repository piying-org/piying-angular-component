import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideZonelessChangeDetection, signal } from '@angular/core';

import * as v from 'valibot';
import { NFCSchema, patchInputs, setComponent } from '@piying/view-angular-core';
import { testClassInput, testClassInputBoolean, testHello } from '../util/helper';
import { createSchemaComponent } from '../util/create-component';
import { assertElementContent, assertElementExist } from '../util/element';
import { htmlInput, htmlInput2 } from '../util/action';
import { range } from 'es-toolkit';

describe('calendar', () => {
  const BaseDefine = v.pipe(v.date(), setComponent('calendar'));
  it('hello', async () => {
    let schema = v.pipe(BaseDefine);
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-date.pc-cally')).toBeTruthy();
  });
  it('multi', async () => {
    let schema = v.pipe(v.date(), setComponent('calendar'), patchInputs({ type: 'multi' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-multi.pc-cally')).toBeTruthy();
  });
  it('multi-inputvalue', async () => {
    let schema = v.pipe(v.date(), setComponent('calendar'), patchInputs({ type: 'multi' }));
    let list = range(-15, 15).map((i) => {
      let a = new Date();
      a.setDate(a.getDate() + i);
      return a;
    });
    let { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-multi.pc-cally')).toBeTruthy();
    let monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
  });
  it('range', async () => {
    let schema = v.pipe(v.date(), setComponent('calendar'), patchInputs({ type: 'range' }));
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
  });
  it('range-inputValue', async () => {
    let schema = v.pipe(v.date(), setComponent('calendar'), patchInputs({ type: 'range' }));
    let list = range(2).map((i) => {
      let a = new Date();
      a.setDate(a.getDate() + (i ? 15 : -15));
      return a;
    });

    let { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
    let monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
    expect(monthEl?.shadowRoot?.querySelector('[part~=range-start]')).toBeTruthy();
  });
  it('range-month2', async () => {
    let schema = v.pipe(
      v.date(),
      setComponent('calendar'),
      patchInputs({ type: 'range', monthProps: 2 }),
    );
    let list = range(2).map((i) => {
      let a = new Date();
      a.setDate(a.getDate() + (i ? 30 : -30));
      return a;
    });

    let { element } = await createSchemaComponent(signal(schema), signal(list), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('calendar-range.pc-cally')).toBeTruthy();
    let monthEl = element.querySelector('calendar-month');
    expect(monthEl?.shadowRoot?.querySelectorAll('[part~=selected]').length).toBeGreaterThan(1);
    expect(monthEl?.shadowRoot?.querySelector('[part~=range-start]')).toBeTruthy();
    expect(element?.querySelectorAll('calendar-month').length).toBe(2)
  });
});
