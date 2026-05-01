import * as v from 'valibot';
import { hideWhen, NFCSchema } from '@piying/view-angular-core';
import { safeDefine } from '@@piying-define';
import { actions as DActions } from '@piying/view-angular';
import {
  ExpandRowDirective,
  TableExpandService,
  TableResourceService,
} from '@piying-lib/angular-daisyui/extension';
import { map, startWith } from 'rxjs';
import { range } from 'es-toolkit';
export default v.object({
  table: v.pipe(
    NFCSchema,
    safeDefine.setComponent('table', (actions) => {
      return [
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
                      safeDefine.setComponent('tr', (actions) => {
                        return [
                          DActions.directives.set([
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
                        ];
                      }),
                    ),
                  },
                ],
              },
              columns: {
                '0': {
                  head: (data: any) => {
                    return data;
                  },
                  body: (node: any, index: number) => {
                    return node;
                  },
                },
                extra: {
                  head: (data: any) => {
                    return data;
                  },
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
              const list = range(1, 100).map((index) => {
                return [`k${index}`, range(4).map((i) => `k${index}v${i}`)];
              });
              return [list.length, list];
            });
          },
        }),
      ];
    }),
  ),
});
