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
fdescribe('table', () => {
  it('sort', async () => {
    let data = signal<ResourceLoaderParams<TableQueryParams> | undefined>(undefined);
    const TableDefine = v.pipe(
      NFCSchema,
      setComponent('table'),
      patchInputs({
        defineList: [
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

    expect(data()!.params.direction['k2']).toBe(1)
  });
});
