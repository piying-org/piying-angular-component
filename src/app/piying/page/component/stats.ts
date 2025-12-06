import * as v from 'valibot';
import {
  componentClass,
  NFCSchema,
  patchAsyncClass,
  patchAsyncInputs,
  patchAsyncProps,
  patchAttributes,
  patchInputs,
  patchProps,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { computed, signal } from '@angular/core';
import { faker } from '@faker-js/faker';
import { CardBodyDemoNFCC } from '../../component/card-body/component';
import { filter } from 'rxjs';
export const StatsDefine = v.object({
  stats1: v.pipe(
    v.object({
      item1: v.pipe(
        v.object({
          title: v.pipe(
            NFCSchema,
            setWrappers(['div']),
            setComponent('common-data'),
            patchInputs({ content: 'Angular' }),
            topClass('stat-title'),
          ),
          value: v.pipe(
            NFCSchema,
            setWrappers(['div']),
            setComponent('common-data'),
            patchInputs({ content: '20' }),
            topClass('stat-value'),
          ),
          desc: v.pipe(
            NFCSchema,
            setWrappers(['div']),
            setComponent('common-data'),
            patchInputs({ content: 'Version' }),
            topClass('stat-desc'),
          ),
        }),
        setWrappers(['div']),
        topClass('stat'),
      ),
    }),
    setWrappers(['div']),
    topClass('stats shadow'),
  ),
  stats2: v.pipe(
    NFCSchema,
    setComponent('list-template'),
    setWrappers(['div']),
    topClass('stats shadow'),
    patchInputs({
      template: v.pipe(
        NFCSchema,
        setComponent('stat'),
        patchAsyncInputs({
          valueClass: (field) => {
            let item = field.context['getItem']().valueClass;
            return item
          },
        }),
        patchInputs({
          title: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            patchAsyncInputs({
              content: (field) => {
                return field.context['getItem']().title;
              },
            }),
            topClass('stat-title'),
          ),

          value: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            patchAsyncInputs({
              content: (field) => {
                return field.context['getItem']().value;
              },
            }),

            topClass('stat-value'),
          ),
          desc: v.pipe(
            NFCSchema,
            setComponent('common-data'),
            patchAsyncInputs({
              content: (field) => {
                return field.context['getItem']().desc;
              },
            }),
            topClass('stat-desc'),
          ),
        }),
      ),
    }),
    patchAsyncInputs({
      list: (field) => {
        return field.context['getStatList']();
      },
    }),
  ),
});
