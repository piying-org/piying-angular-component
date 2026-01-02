import { computed, ResourceLoaderParams, signal } from '@angular/core';
import * as v from 'valibot';
import { NFCSchema, setComponent, actions } from '@piying/view-angular-core';

import { createSchemaComponent } from '../util/create-component';
import { assertElementExist } from '../util/element';
import { StrOrTemplateComponent } from '@piying/angular-daisyui/helper';
import { TableQueryParams } from '../../extension/table/type';
describe('table', () => {
  it('str-head', async () => {
    const data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
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
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table th');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('head1');
  });
  it('define-head', async () => {
    const data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patch({ content: 'head1' }),
                actions.wrappers.set(['th']),
              ),
            },
          ],
        },
        data: async (input: any) => {
          data.set(input);
          return [];
        },
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table th');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('head1');
  });
  it('sort', async () => {
    const data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.wrappers.set(['sort-table']),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent('button'),
                actions.props.patch({ key: 'k1' }),
                actions.wrappers.set(['th', 'sort-header']),
              ),
            },
            {
              head: v.pipe(
                NFCSchema,
                setComponent('button'),
                actions.props.patch({ key: 'k2', direction: 1 }),
                actions.wrappers.set(['th', 'sort-header']),
              ),
            },
          ],
        },
        data: [],
      }),
    );
    const schema = TableDefine;
    const { element, field$$ } = await createSchemaComponent(
      signal(schema),
      signal(undefined),
      undefined,
      {
        teardown: { destroyAfterEach: false },
      },
    );
    assertElementExist(element);
    expect(field$$()?.props()['sortQueryParams'][0]['value']).toBe(1);
  });

  it('str-body', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patch({ content: 'head1' }),
                actions.wrappers.set(['th']),
              ),
              body: 'data1',
            },
          ],
        },
        data: [{ data: 1 }],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
  it('function-body', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patch({ content: 'head1' }),
                actions.wrappers.set(['th']),
              ),
              body: (item: any) => {
                return item.data;
              },
            },
          ],
        },
        data: [{ data: 'data1' }],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
  it('define-body', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patch({ content: 'head1' }),
                actions.wrappers.set(['th']),
              ),
              body: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patchAsync({
                  content: ({ context }) =>
                    computed(() => {
                      return context['item$']()['data'];
                    }),
                }),
                actions.wrappers.set(['td']),
              ),
            },
          ],
        },
        data: [{ data: 'data1' }],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table tbody td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('data1');
  });
  it('str-foot', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: 'head1',
              foot: 'foot1',
            },
          ],
        },
        data: [],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('foot1');
  });
  it('define-head', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: '',
            },
            {
              head: v.pipe(
                NFCSchema,
                setComponent(StrOrTemplateComponent),
                actions.inputs.patch({ content: 'foot1' }),
                actions.wrappers.set(['td']),
              ),
            },
          ],
        },
        data: [],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    const thList = element.querySelectorAll('table td');
    expect(thList.length).toBeTruthy();
    expect(thList[0].textContent.trim()).toEqual('foot1');
  });
  it('input-class-none', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        define: {
          columns: [
            {
              head: '1',
            },
          ],
        },
        data: [],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    expect(element.querySelector(`table.pc-table-zebra`)).toBeFalsy();
    expect(element.querySelector(`table.pc-table-pin-rows`)).toBeFalsy();
    expect(element.querySelector(`table.pc-table-pin-cols`)).toBeFalsy();
    expect(element.querySelector(`table.pc-table-xs`)).toBeFalsy();
  });
  it('input-class', async () => {
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      actions.inputs.patch({
        zebra: true,
        pin: { rows: true, cols: true },
        size: 'xs',
        define: {
          columns: [
            {
              head: '1',
            },
          ],
        },
        data: [],
      }),
    );
    const schema = TableDefine;
    const { element } = await createSchemaComponent(signal(schema), signal(undefined), undefined, {
      teardown: { destroyAfterEach: false },
    });
    assertElementExist(element);
    expect(element.querySelector('table')).toBeTruthy();
    expect(element.querySelector(`table.pc-table-zebra`)).toBeTruthy();
    expect(element.querySelector(`table.pc-table-pin-rows`)).toBeTruthy();
    expect(element.querySelector(`table.pc-table-pin-cols`)).toBeTruthy();
    expect(element.querySelector(`table.pc-table-xs`)).toBeTruthy();
  });
});
