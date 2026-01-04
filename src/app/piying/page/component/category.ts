import * as v from 'valibot';
import { hideWhen, NFCSchema, setComponent } from '@piying/view-angular-core';
import { actions } from '@piying/view-angular';
import { map, Observable, startWith, Subject } from 'rxjs';
import { ExpandRowDirective } from '@piying-lib/angular-daisyui/extension';
import { range } from 'es-toolkit';
import { SelectionModel } from '@angular/cdk/collections';

export const CategoryDefine = v.object({
  table: v.pipe(
    NFCSchema,
    setComponent('table'),
    actions.wrappers.set(['table-status', 'table-resource']),
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
                      let sm = field.context.status['selectionModel$$'] as Observable<
                        SelectionModel<unknown>
                      >;
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
    actions.props.patchAsync({
      data: () => {
        return range(1, 100).map((index) => {
          return [`k${index}`, range(4).map((i) => `k${index}v${i}`)];
        });
      },
    }),
    actions.class.component('h-100'),
  ),
});
