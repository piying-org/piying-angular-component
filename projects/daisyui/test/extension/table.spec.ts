import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  computed,
  provideZonelessChangeDetection,
  ResourceLoaderParams,
  signal,
} from '@angular/core';
import * as v from 'valibot';
import {
  NFCSchema,
  patchAsyncInputs,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
} from '@piying/view-angular-core';

import { createSchemaComponent } from '../util/create-component';
import { assertElementExist, assertElementSelector } from '../util/element';
import { TableQueryParams } from '@piying/angular-daisyui/extension';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
fdescribe('table', () => {
  it('str-head', async () => {
    let data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: 'head1',
            },
          ],
        },
        data: async (input: any) => {
          data.set(input);
          return [];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    let thList = element.querySelectorAll('table th');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('head1');
  });
  it('define-head', async () => {
    let data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                patchInputs({ content: 'head1' }),
                setWrappers(['th']),
              ),
            },
          ],
        },
        data: async (input: any) => {
          data.set(input);
          return [];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    let thList = element.querySelectorAll('table th');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('head1');
  });
  it('sort', async () => {
    let data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent('button'),
                patchProps({ key: 'k1' }),
                setWrappers(['th', 'sort-header']),
              ),
            },
            {
              head: v.pipe(
                NFCSchema,
                setComponent('button'),
                patchProps({ key: 'k2', direction: 1 }),
                setWrappers(['th', 'sort-header']),
              ),
            },
          ],
        },
        data: async (input: any) => {
          data.set(input);
          return [];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();

    expect(data()!.params.direction['k2']).toBe(1);
  });

  it('str-body', async () => {
    let data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                patchInputs({ content: 'head1' }),
                setWrappers(['th']),
              ),
              body: 'data1',
            },
          ],
        },
        data: async (input: any) => {
          return [{ data: 1 }];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    let thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
  it('function-body', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                patchInputs({ content: 'head1' }),
                setWrappers(['th']),
              ),
              body: (item: any) => {
                return item.data;
              },
            },
          ],
        },
        data: async (input: any) => {
          return [{ data: 'data1' }];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    let thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
  it('define-body', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                patchInputs({ content: 'head1' }),
                setWrappers(['th']),
              ),
              body: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                patchAsyncInputs({
                  content: ({ context }) =>
                    computed(() => {
                      return context['item$']()['data'];
                    }),
                }),
                setWrappers(['td']),
              ),
            },
          ],
        },
        data: async (input: any) => {
          return [{ data: 'data1' }];
        },
        page: {
          size: 1,
          index: 0,
        },
      }),
    );
    let schema = TableDefine;
    let { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    let thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
});
