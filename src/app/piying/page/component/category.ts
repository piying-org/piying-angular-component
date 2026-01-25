import * as v from 'valibot';
import { hideWhen, NFCSchema, setComponent } from '@piying/view-angular-core';
import { actions } from '@piying/view-angular';
import { map, Observable, startWith } from 'rxjs';
import {
  ExpandRowDirective,
  TableExpandService,
  TableResourceService,
} from '@piying-lib/angular-daisyui/extension';
import { range } from 'es-toolkit';

export const CategoryDefine = v.object({
  table: v.pipe(
    NFCSchema,
    setComponent('table'),
    actions.inputs.patch({ type: 'category', pin: { rows: true } }),
    actions.inputs.patchAsync({
      define: (field) => {
        return {
          row: {
            head: [{ columns: ['0'] }],
            body: [
              {
                columns: ['0'],
              },
              {
                columns: ['extra'],
                define: v.pipe(
                  v.tuple([]),
                  setComponent('tr'),
                  actions.directives.set([
                    {
                      type: ExpandRowDirective,
                    },
                  ]),
                  hideWhen({
                    listen(fn, field) {
                      const sm = field.injector.get(TableExpandService).selectionModel$$;
                      return sm.pipe(
                        map((value) => value.isSelected(field.context.item$())),
                        startWith(true),
                      );
                    },
                  }),
                ),
              },
            ],
          },
          columns: {
            '0': {
              head: (data: any) => data,
              body: (node: any, index: number) => {
                return node;
              },
            },
            extra: {
              head: (data: any) => data,
              body: (node: any, index: number) => {
                return `extra-${node}`;
              },
            },
          },
        };
      },
    }),
    actions.inputs.patchAsync({
      data: (field) => {
        return field.injector.get(TableResourceService).list$$;
      },
    }),
    actions.class.component('h-100'),
    actions.providers.patch([TableExpandService, TableResourceService]),
    actions.hooks.merge({
      allFieldsResolved: (field) => {
        field.injector.get(TableExpandService).init();
        field.injector.get(TableResourceService).setRequest(() => {
          let list = range(1, 100).map((index) => {
            return [`k${index}`, range(4).map((i) => `k${index}v${i}`)];
          });
          return [list.length, list];
        });
      },
    }),
  ),
});
