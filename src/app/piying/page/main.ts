import * as v from 'valibot';
import {
  NFCSchema,
  patchAttributes,
  patchInputs,
  setComponent,
  setWrappers,
  topClass,
} from '@piying/view-angular-core';
import { patchDirectives } from '@piying/view-angular';
import { RouterOutlet } from '@angular/router';
export const MainPage = v.pipe(
  v.object({
    content: v.object({
      navbar: v.pipe(
        v.object({
          start: v.object({
            menu: v.pipe(
              NFCSchema,
              setComponent('button'),
              patchInputs({
                content: { icon: { fontIcon: 'menu' } },
                shape: 'square',
                style: 'ghost',
              }),
              patchAttributes({
                for: 'drawer-0',
              }),
            ),
          }),
        }),
        setComponent('navbar'),
      ),
      router: v.pipe(NFCSchema, setComponent('div'), patchDirectives([{ type: RouterOutlet }])),
    }),
    side: v.pipe(
      v.object({
        list: v.pipe(
          NFCSchema,
          setComponent('menu-tree'),
          patchInputs({
            list: [
              { title: 'table', router: { routerLink: './table' } },
              { title: 'login', router: { routerLink: './login' } },
            ],
          }),
        ),
      }),
      setWrappers([{ type: 'div' }]),
      topClass('bg-base-100 h-full'),
    ),
  }),
  setComponent('drawer'),

  topClass('h-[100vh] lg:drawer-open'),
);
